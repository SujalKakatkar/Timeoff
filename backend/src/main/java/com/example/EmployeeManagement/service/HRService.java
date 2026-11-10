package com.example.EmployeeManagement.service;


import com.example.EmployeeManagement.dto.*;
import com.example.EmployeeManagement.entity.LeaveBalance;
import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.repository.HolidayRepository;
import com.example.EmployeeManagement.repository.LeaveBalanceRepository;
import com.example.EmployeeManagement.repository.LeaveRequestRepository;
import com.example.EmployeeManagement.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class HRService {

    private final UserRepository userRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final Clock clock;
    private final HolidayRepository holidayRepository;

    public HRService(UserRepository userRepository, LeaveBalanceRepository leaveBalanceRepository, LeaveRequestRepository leaveRequestRepository, Clock clock, HolidayRepository holidayRepository) {
        this.userRepository = userRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.leaveRequestRepository = leaveRequestRepository;
        this.clock = clock;
        this.holidayRepository = holidayRepository;
    }


    public DetailedReportResponse getEmployeeReport(Integer empId) {

        User user = userRepository.findById(empId).orElseThrow(
                () -> new ResourceNotFoundException("user not found")
        );

        DetailedReportResponse reportResponse = new DetailedReportResponse();

        reportResponse.setEmpId(user.getUserId());
        reportResponse.setEmail(user.getEmail());
        reportResponse.setRole(user.getRole());
        reportResponse.setManagerId(user.getManager() != null ? user.getManager().getUserId() : null);
        reportResponse.setName(user.getName());

        //the total is all the types of leaves in the year
        List<LeaveBalance> leaveBalanceList = leaveBalanceRepository.findAllByUser_UserId(empId);

        if (leaveBalanceList.isEmpty()) {
            throw new ResourceNotFoundException("no leaves found");
        }

        List<LeaveTypeDetails> typeDetails = new ArrayList<>();
        double allocatedDays = 0;
        double usedDays = 0;

        for (LeaveBalance leaveBalance : leaveBalanceList) {
            LeaveTypeDetails dto = new LeaveTypeDetails();
            dto.setName(leaveBalance.getLeaveType().getName());
            dto.setAllocatedDays(leaveBalance.getAllocatedDays());
            dto.setUsedDays(leaveBalance.getUsedDays());
            dto.setRemainingDays(leaveBalance.getAllocatedDays() - leaveBalance.getUsedDays());
            typeDetails.add(dto);
            allocatedDays += leaveBalance.getAllocatedDays();
            usedDays += leaveBalance.getUsedDays();
        }

        reportResponse.setLeaveTypeBreakDown(typeDetails);
        reportResponse.setTotalAllocatedDays(allocatedDays);
        reportResponse.setTotalUsedDays(usedDays);
        reportResponse.setTotalRemainingBalance(allocatedDays - usedDays);

        reportResponse.setLeaveApproved(leaveRequestRepository.countByEmployee_UserIdAndStatus(user.getUserId(), LeaveStatus.APPROVED));
        reportResponse.setLeavePending(leaveRequestRepository.countByEmployee_UserIdAndStatus(user.getUserId(), LeaveStatus.PENDING));
        reportResponse.setLeaveRejected(leaveRequestRepository.countByEmployee_UserIdAndStatus(user.getUserId(), LeaveStatus.REJECTED));

        return reportResponse;
    }


    public List<DetailedReportResponse> getAllReports(Integer year) {
        List<LeaveBalance> leaveBalanceList = leaveBalanceRepository.findAllByYear(year);

        // group all balance rows by the user they belong to
        Map<User, List<LeaveBalance>> groupedByUser =
                leaveBalanceList
                        .stream()
                        .collect(Collectors.groupingBy(LeaveBalance::getUser));

        List<DetailedReportResponse> reportList = new ArrayList<>();

        for (Map.Entry<User, List<LeaveBalance>> entry : groupedByUser.entrySet()) {
            User user = entry.getKey();
            List<LeaveBalance> balancesForUser = entry.getValue();

            DetailedReportResponse dto = new DetailedReportResponse();

            // user details
            dto.setEmpId(user.getUserId());
            dto.setEmail(user.getEmail());
            dto.setRole(user.getRole());
            dto.setManagerId(user.getManager() != null ? user.getManager().getUserId() : null);
            dto.setName(user.getName());

            // build leave type breakdown + totals in one pass
            List<LeaveTypeDetails> breakdown = new ArrayList<>();
            double totalAllocated = 0;
            double totalUsed = 0;

            for (LeaveBalance balance : balancesForUser) {
                double allocated = balance.getAllocatedDays() != null ? balance.getAllocatedDays() : 0.0;
                double used = balance.getUsedDays() != null ? balance.getUsedDays() : 0.0;

                LeaveTypeDetails typeDto = new LeaveTypeDetails();
                typeDto.setName(balance.getLeaveType().getName());
                typeDto.setAllocatedDays(allocated);
                typeDto.setUsedDays(used);
                typeDto.setRemainingDays(allocated - used);
                breakdown.add(typeDto);

                totalAllocated += allocated;
                totalUsed += used;
            }

            dto.setLeaveTypeBreakDown(breakdown);
            dto.setTotalAllocatedDays(totalAllocated);
            dto.setTotalUsedDays(totalUsed);
            dto.setTotalRemainingBalance(totalAllocated - totalUsed);

            // per-user request counts
            dto.setLeaveApproved(leaveRequestRepository.countByEmployee_UserIdAndStatus(user.getUserId(), LeaveStatus.APPROVED));
            dto.setLeavePending(leaveRequestRepository.countByEmployee_UserIdAndStatus(user.getUserId(), LeaveStatus.PENDING));
            dto.setLeaveRejected(leaveRequestRepository.countByEmployee_UserIdAndStatus(user.getUserId(), LeaveStatus.REJECTED));

            reportList.add(dto);
        }

        return reportList;
    }



    private Predicate<LocalDate> workingDayFilter(LocalDate from, LocalDate to) {
        Set<LocalDate> holidays = new HashSet<>(holidayRepository.findDatesBetween(from, to));
        return d -> d.getDayOfWeek() != DayOfWeek.SATURDAY &&
                d.getDayOfWeek() != DayOfWeek.SUNDAY && !holidays.contains(d);
    }

    @Transactional(readOnly = true)
    public LeaveActivityResponse getLeaveActivity(Long days) {
        if (days < 1 || days > 365) {
            throw new IllegalArgumentException("days must be between 1 and 365");
        }
        LocalDate to = LocalDate.now(clock);
        LocalDate from = to.minusDays(days - 1);

        //it checks if a day is working day or not
        Predicate<LocalDate> isWorkingDay = workingDayFilter(from, to);
        List<LeaveSpan> spans = leaveRequestRepository.findSpans(LeaveStatus.APPROVED, from, to);
        Map<LocalDate, Set<Integer>> employeesPerDay = new HashMap<>();
        for (LeaveSpan span : spans) {

            //validating the dates are present or not
            if (span.getStartDate() == null || span.getEndDate() == null
                    || span.getEndDate().isBefore(span.getStartDate())) {
                continue;
            }
            //boundaries if start date of leave outside the window what we are looking for
            LocalDate start = span.getStartDate().isBefore(from) ? from : span.getStartDate();
            LocalDate end = span.getEndDate().isAfter(to) ? to : span.getEndDate();


            //create a hashmap for each date and store each employee's id who was absent that day
            start.datesUntil(end.plusDays(1))
                    .filter(isWorkingDay)
                    .forEach(d -> employeesPerDay
                            .computeIfAbsent(d, k -> new HashSet<>())
                            .add(span.getEmployeeId()));
        }

        //compute every working day leave count
        List<LeaveActivityPoint> points = from.datesUntil(to.plusDays(1)).map(
                (d -> new LeaveActivityPoint(d, (long) employeesPerDay.getOrDefault(d, Set.of()).size()))

        ).toList();
        return new LeaveActivityResponse(from, to, points);
    }
}
