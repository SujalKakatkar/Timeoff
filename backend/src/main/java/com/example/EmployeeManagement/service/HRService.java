package com.example.EmployeeManagement.service;


import com.example.EmployeeManagement.dto.DetailedReportResponse;
import com.example.EmployeeManagement.dto.LeaveTypeDetails;
import com.example.EmployeeManagement.dto.user.UserDetailsResponse;
import com.example.EmployeeManagement.entity.LeaveBalance;
import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.Role;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.exceptions.RoleMismatchException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.repository.LeaveBalanceRepository;
import com.example.EmployeeManagement.repository.LeaveRequestRepository;
import com.example.EmployeeManagement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HRService {

    private final UserRepository userRepository;
    private final LeaveBalanceRepository leaveBalanceRepository;
    private final LeaveRequestRepository leaveRequestRepository;

    public HRService(UserRepository userRepository, LeaveBalanceRepository leaveBalanceRepository, LeaveRequestRepository leaveRequestRepository) {

        this.userRepository = userRepository;
        this.leaveBalanceRepository = leaveBalanceRepository;
        this.leaveRequestRepository = leaveRequestRepository;
    }


    //Create a manger with existing employee
    public void promoteManger(Integer empId, String email) {
        //get the employee
        //if it is null return
        User user = userRepository.findById(empId).orElseThrow(
                () -> new ResourceNotFoundException("can't find employee")
        );

        if (user.getRole() == Role.MANAGER) {
            throw new RoleMismatchException("user is already manger");
        }

        User Hr = userRepository.findByEmailAndEnabledTrue(email).orElseThrow(
                () -> new ResourceNotFoundException("can't find hr")
        );

        //set role to manger
        user.setRole(Role.MANAGER);
        user.setManager(Hr);
        userRepository.save(user);

    }


    // assign the manger
    public void assignManger(Integer empId, Integer mangerId) {
        //get the employee
        User user = userRepository.findById(empId).orElseThrow(
                () -> new ResourceNotFoundException("can't find employee")
        );

        if (user.getRole() == Role.MANAGER) {
            throw new RoleMismatchException("one manager can't assign to other manager");
        }

        //passing them a manger which is existed with manger id
        User manager = userRepository.findById(mangerId).orElseThrow(
                () -> new ResourceNotFoundException("can't find employee")
        );
        if (manager.getRole() == Role.EMPLOYEE || manager.getRole() == Role.HR) {
            throw new RoleMismatchException("the manger id is invalid");
        }
        user.setManager(manager);
        userRepository.save(user);


    }

    //disable employee
    public void disableEmployee(Integer userId) {
        //check if exists
        User user = userRepository.findByUserIdAndEnabledTrue(userId).orElseThrow(
                () -> new ResourceNotFoundException("user not found")
        );
        //check is it a manager
        if (user.getRole() == Role.MANAGER) {
            //add null the manger id refenced by this manager
            List<User> userList = userRepository.findAllByManager_UserId(user.getUserId());

            userList.forEach(u -> u.setManager(null));


            userRepository.saveAll(userList);
        }
        //isEnable false
        user.setEnabled(false);
        userRepository.save(user);

    }

    public UserDetailsResponse getUser(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("user not found")
        );

        return MapToDto.mapToUserDetailResponse(user);
    }


    //get all employees
    public List<UserDetailsResponse> getAllEmployees() {
        List<User> userList = userRepository.findAllByRoleInAndEnabledTrue(List.of(Role.EMPLOYEE, Role.MANAGER));

        return userList.stream().map(MapToDto::mapToUserDetailResponse).toList();

    }

    // get all request
    public List<UserDetailsResponse> getAllManagers() {
        List<User> userList = userRepository.findAllByRoleInAndEnabledTrue(List.of(Role.MANAGER));
        return userList.stream().map(MapToDto::mapToUserDetailResponse).collect(Collectors.toList());
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
}
