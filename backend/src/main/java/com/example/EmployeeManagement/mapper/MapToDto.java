package com.example.EmployeeManagement.mapper;


import com.example.EmployeeManagement.dto.*;
import com.example.EmployeeManagement.dto.user.UserDetailsResponse;
import com.example.EmployeeManagement.dto.user.UserLoginResponse;
import com.example.EmployeeManagement.dto.user.UserResponse;
import com.example.EmployeeManagement.entity.*;

public class MapToDto {

    public static UserLoginResponse mapToLoginResponse(User user, String token) {
        UserLoginResponse newUser = new UserLoginResponse();
        newUser.setEmail(user.getEmail());
        newUser.setRole(user.getRole());
        newUser.setToken(token);
        return newUser;
    }

    public static UserResponse mapToUserResponse(User user) {
        UserResponse newUser = new UserResponse();
        newUser.setUserId(user.getUserId());
        newUser.setName(user.getName());
        newUser.setEmail(user.getEmail());
        return newUser;
    }

    public static UserDetailsResponse mapToUserDetailResponse(User user) {

        UserDetailsResponse userDetailsResponse = new UserDetailsResponse();
        userDetailsResponse.setUserId(user.getUserId());
        userDetailsResponse.setUsername(user.getUsername());
        userDetailsResponse.setAddress(user.getAddress());
        userDetailsResponse.setEmail(user.getEmail());
        userDetailsResponse.setName(user.getName());
        userDetailsResponse.setDept(user.getDept());
        userDetailsResponse.setPhone(user.getPhone());
        return userDetailsResponse;

    }


    public static LeaveBalanceResponse mapToLeaveBalanceResponse(LeaveBalance leaveBalance) {
        LeaveBalanceResponse newResponse = new LeaveBalanceResponse();
        newResponse.setBalanceId(leaveBalance.getBalanceId());
        newResponse.setYear(leaveBalance.getYear());
        newResponse.setUsername(leaveBalance.getUser().getUsername());
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
