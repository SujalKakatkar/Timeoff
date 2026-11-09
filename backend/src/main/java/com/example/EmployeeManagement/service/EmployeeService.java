package com.example.EmployeeManagement.service;


import com.example.EmployeeManagement.dto.employee.EmployeeDetailedResponse;
import com.example.EmployeeManagement.dto.employee.EmployeeOverviewResponse;
import com.example.EmployeeManagement.dto.employee.ManagerOverviewResponse;
import com.example.EmployeeManagement.dto.employee.ManagerTeamDetailedResponse;
import com.example.EmployeeManagement.dto.user.UserDetailsResponse;
import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.Role;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.repository.LeaveBalanceRepository;
import com.example.EmployeeManagement.repository.LeaveRequestRepository;
import com.example.EmployeeManagement.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class EmployeeService {

    public final UserRepository userRepository;
    public final LeaveRequestRepository leaveRequestRepository;
    public final LeaveBalanceRepository leaveBalanceRepository;
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

    //get all employees

    //get stats of employees

    //get all team members of the manager


    //get stats of the

}
