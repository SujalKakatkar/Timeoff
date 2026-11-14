package com.example.EmployeeManagement.service;


import com.example.EmployeeManagement.dto.LeaveActivityPoint;
import com.example.EmployeeManagement.dto.LeaveActivityResponse;
import com.example.EmployeeManagement.dto.LeaveSpan;
import com.example.EmployeeManagement.dto.employee.*;
import com.example.EmployeeManagement.dto.user.UserDetailsResponse;
import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.Role;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.repository.HolidayRepository;
import com.example.EmployeeManagement.repository.LeaveBalanceRepository;
import com.example.EmployeeManagement.repository.LeaveRequestRepository;
import com.example.EmployeeManagement.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeService {

    public final UserRepository userRepository;
    public final LeaveRequestRepository leaveRequestRepository;
    public final LeaveBalanceRepository leaveBalanceRepository;
    public final HolidayRepository holidayRepository;
    private final Clock clock;


    public UserDetailsResponse getUser(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("user not found")
        );

        return MapToDto.mapToUserDetailResponse(user);
    }


    //get all employees
    @Transactional(readOnly = true)
    public List<EmployeeDetailedResponse> getAllEmployees() {

        List<User> userList = userRepository.findAllByRoleInAndEnabledTrue(List.of(Role.EMPLOYEE, Role.MANAGER));

        Set<Integer> onLeaveIds = leaveRequestRepository.findEmployeeIdsOnLeave(LocalDate.now(clock), LeaveStatus.APPROVED);
        return userList.stream().map(user -> MapToDto.mapToEmployeeDetailedResponse(user, !onLeaveIds.contains(user.getUserId()))).toList();

    }

    @Transactional(readOnly = true)
    public List<ManagerTeamDetailedResponse> getTeamOfTheManager(Integer managerId) {

        List<User> userList = userRepository.findAllByManager_UserId(managerId);

        Set<Integer> onLeaveIds = leaveRequestRepository.findEmployeeIdsOnLeave(LocalDate.now(clock), LeaveStatus.APPROVED);
        return userList.stream().map(user -> MapToDto.mapToManagerTeamDetailedResponse(user, !onLeaveIds.contains(user.getUserId()))).toList();

    }

    //hr overview
    @Transactional(readOnly = true)
    public List<EmployeeOverviewResponse> getOverview() {
        //get a list of employees using query and
        Set<Integer> onLeaveIds = leaveRequestRepository.findEmployeeIdsOnLeave(LocalDate.now(clock), LeaveStatus.APPROVED);

        return userRepository.findAllByRoleInAndEnabledTrue(List.of(Role.EMPLOYEE, Role.MANAGER)).stream().map(
                user -> MapToDto.mapToEmployeeOverviewResponse(
                        user,
                        !onLeaveIds.contains(user.getUserId())
                )
        ).toList();
    }

    @Transactional(readOnly = true)
    public List<ManagerOverviewResponse> getTeamOverview(Integer userId) {
        //get a list of employees using query and
        Set<Integer> onLeaveIds = leaveRequestRepository.findEmployeeIdsOnLeave(LocalDate.now(clock), LeaveStatus.APPROVED);

        return userRepository.findAllByManager_UserId(userId).stream().map(
                user -> MapToDto.mapToManagerOverviewResponse(
                        user,
                        !onLeaveIds.contains(user.getUserId())
                )
        ).toList();
    }

    public HrStatsResponse getHrStats() {
        Long total = userRepository.countByEnabledTrue();
        Long managers = userRepository.countByRoleAndEnabledTrue(Role.MANAGER);
        LocalDate today = LocalDate.now(clock);
        Long onLeave = leaveRequestRepository.countUsersOnLeave(today);
        Long pendingLeaveRequests = leaveRequestRepository.countByStatusAndEmployee_EnabledTrue(LeaveStatus.PENDING);
        return new HrStatsResponse(total, managers, onLeave, pendingLeaveRequests, total - onLeave);
    }

    public ManagerStatsResponse getManagerStats(Integer managerId) {
        Long total = userRepository.countByManager_userId(managerId);
        LocalDate today = LocalDate.now(clock);
        Long onLeave = leaveRequestRepository.countTeamOnLeave(managerId, today);
        Long pendingLeaveRequests = leaveRequestRepository.countByStatusAndEmployee_EnabledTrueAndEmployee_Manager_userId(LeaveStatus.PENDING, managerId);
        return new ManagerStatsResponse(total, onLeave, pendingLeaveRequests, total - onLeave);
    }


    @Transactional(readOnly = true)
    public LeaveActivityResponse getLeaveActivity(Long days) {
        if (days < 1 || days > 365) {
            throw new IllegalArgumentException("days must be between 1 and 365");
        }

        LocalDate to = LocalDate.now(clock);
        LocalDate from = to.minusDays(days - 1);

        // 1. Build a working-day lookup set (weekends + holidays excluded)
        Set<LocalDate> holidays = holidayRepository.findDatesBetween(from, to);
        Set<LocalDate> workingDays = from.datesUntil(to.plusDays(1))
                .filter(d -> d.getDayOfWeek() != DayOfWeek.SATURDAY
                        && d.getDayOfWeek() != DayOfWeek.SUNDAY
                        && !holidays.contains(d))
                .collect(Collectors.toCollection(HashSet::new));

        // 2. Fetch spans for this manager's team
        List<LeaveSpan> spans = leaveRequestRepository.findSpans(
                LeaveStatus.APPROVED, from, to
        );

        // 3. Expand each span into dates, keep only working days, count per date
        Map<LocalDate, Long> leaveCountByDate = spans.stream()
                .filter(span -> span.getStartDate() != null
                        && span.getEndDate() != null
                        && !span.getEndDate().isBefore(span.getStartDate()))
                .flatMap(span -> {
                    LocalDate start = span.getStartDate().isBefore(from) ? from : span.getStartDate();
                    LocalDate end = span.getEndDate().isAfter(to) ? to : span.getEndDate();
                    return start.datesUntil(end.plusDays(1));
                })
                .filter(workingDays::contains)
                .collect(Collectors.groupingBy(
                        date -> date,
                        Collectors.counting()
                ));

        // 4. Build points only for working days (change if you want calendar days too)
        List<LeaveActivityPoint> points = from.datesUntil(to.plusDays(1))
                .filter(workingDays::contains)
                .map(date -> new LeaveActivityPoint(
                        date,
                        leaveCountByDate.getOrDefault(date, 0L)
                ))
                .toList();

        return new LeaveActivityResponse(from, to, points);
    }




    @Transactional(readOnly = true)
    public LeaveActivityResponse getTeamLeaveActivity(Long days, Integer managerId) {
        if (days < 1 || days > 365) {
            throw new IllegalArgumentException("days must be between 1 and 365");
        }

        LocalDate to = LocalDate.now(clock);
        LocalDate from = to.minusDays(days - 1);

        // 1. Build a working-day lookup set (weekends + holidays excluded)
        Set<LocalDate> holidays = holidayRepository.findDatesBetween(from, to);
        Set<LocalDate> workingDays = from.datesUntil(to.plusDays(1))
                .filter(d -> d.getDayOfWeek() != DayOfWeek.SATURDAY
                        && d.getDayOfWeek() != DayOfWeek.SUNDAY
                        && !holidays.contains(d))
                .collect(Collectors.toCollection(HashSet::new));

        // 2. Fetch spans for this manager's team
        List<LeaveSpan> spans = leaveRequestRepository.findTeamSpans(
                LeaveStatus.APPROVED, managerId, from, to
        );

        // 3. Expand each span into dates, keep only working days, count per date
        Map<LocalDate, Long> leaveCountByDate = spans.stream()
                .filter(span -> span.getStartDate() != null
                        && span.getEndDate() != null
                        && !span.getEndDate().isBefore(span.getStartDate()))
                .flatMap(span -> {
                    LocalDate start = span.getStartDate().isBefore(from) ? from : span.getStartDate();
                    LocalDate end = span.getEndDate().isAfter(to) ? to : span.getEndDate();
                    return start.datesUntil(end.plusDays(1));
                })
                .filter(workingDays::contains)
                .collect(Collectors.groupingBy(
                        date -> date,
                        Collectors.counting()
                ));

        // 4. Build points only for working days (change if you want calendar days too)
        List<LeaveActivityPoint> points = from.datesUntil(to.plusDays(1))
                .filter(workingDays::contains)
                .map(date -> new LeaveActivityPoint(
                        date,
                        leaveCountByDate.getOrDefault(date, 0L)
                ))
                .toList();

        return new LeaveActivityResponse(from, to, points);
    }



}
