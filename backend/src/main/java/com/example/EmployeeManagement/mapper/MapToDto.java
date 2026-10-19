package com.example.EmployeeManagement.mapper;


import com.example.EmployeeManagement.dto.*;
import com.example.EmployeeManagement.dto.user.AuthTokens;
import com.example.EmployeeManagement.dto.user.UserDetailsResponse;
import com.example.EmployeeManagement.dto.user.UserLoginResponse;
import com.example.EmployeeManagement.entity.*;

public class MapToDto {

    public static UserLoginResponse mapToLoginResponse(AuthTokens t) {
        return new UserLoginResponse(t.getUser(), t.getAccessToken());
    }

    public static UserDetailsResponse mapToUserDetailResponse(User user) {
        UserDetailsResponse userDetailsResponse = new UserDetailsResponse();
        userDetailsResponse.setUserId(user.getUserId());
        userDetailsResponse.setAddress(user.getAddress());
        userDetailsResponse.setEmail(user.getEmail());
        userDetailsResponse.setName(user.getName());
        userDetailsResponse.setDept(
                user.getDepartment() != null ? user.getDepartment().getName() : null
        );
        userDetailsResponse.setPhone(user.getPhone());
        userDetailsResponse.setRole(user.getRole());
        return userDetailsResponse;
    }

    public static DepartmentResponse mapToDepartmentResponse(Department department) {
        return new DepartmentResponse(
                department.getDeptId(),
                department.getName()
        );
    }

    public static LeaveBalanceResponse mapToLeaveBalanceResponse(LeaveBalance leaveBalance) {
        LeaveBalanceResponse newResponse = new LeaveBalanceResponse();
        newResponse.setBalanceId(leaveBalance.getBalanceId());
        newResponse.setYear(leaveBalance.getYear());
        newResponse.setLeaveTypeName(leaveBalance.getLeaveType().getName());
        newResponse.setAllocatedDays(leaveBalance.getAllocatedDays());
        newResponse.setUsedDays(leaveBalance.getUsedDays());
        return newResponse;
    }

    public static LeaveRequestResponse mapToLeaveRequestResponse(LeaveRequest leaveRequest) {
        LeaveRequestResponse leaveRequestResponse = new LeaveRequestResponse();
        leaveRequestResponse.setRequestId(leaveRequest.getRequestId());
        leaveRequestResponse.setStartDate(leaveRequest.getStartDate());
        leaveRequestResponse.setEndDate(leaveRequest.getEndDate());
        leaveRequestResponse.setNumberOfDays(leaveRequest.getNumberOfDays());
        leaveRequestResponse.setReason(leaveRequest.getReason());
        leaveRequestResponse.setStatus(leaveRequest.getStatus());
        leaveRequestResponse.setAppliedAt(leaveRequest.getAppliedAt());
        return leaveRequestResponse;
    }

    public static HolidayResponse mapToHolidayResponse(Holiday holiday) {
        HolidayResponse holidayResponse = new HolidayResponse();
        holidayResponse.setHolidayId(holiday.getHolidayId());
        holidayResponse.setName(holiday.getName());
        holidayResponse.setDate(holiday.getDate());
        return holidayResponse;
    }

    public static LeaveTypeResponse mapToLeaveTypeResponse(LeaveType leaveType) {
        return new LeaveTypeResponse(
                leaveType.getLeaveTypeId(),
                leaveType.getName(),
                leaveType.getDefaultDaysPerYear(),
                leaveType.getIsPaid(),
                leaveType.getCreatedAt()
        );
    }
}
