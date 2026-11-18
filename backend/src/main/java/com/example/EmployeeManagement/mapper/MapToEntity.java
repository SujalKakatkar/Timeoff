package com.example.EmployeeManagement.mapper;

import com.example.EmployeeManagement.dto.HolidayCreateRequest;
import com.example.EmployeeManagement.dto.leave.LeaveRequestCreateRequest;
import com.example.EmployeeManagement.dto.leave.LeaveTypeCreateRequest;
import com.example.EmployeeManagement.dto.user.UserSignUpRequest;
import com.example.EmployeeManagement.entity.*;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.Role;

public class MapToEntity {

    public static User mapToUser(UserSignUpRequest user){
        User newUser = new User();
        newUser.setName(user.getName().trim());
        newUser.setEmail(user.getEmail().trim().toLowerCase());
        newUser.setEnabled(true);
        newUser.setManager(null);
        newUser.setRole(Role.EMPLOYEE);
        return newUser;
    }

    public static LeaveRequest mapToLeaveRequest(
            LeaveRequestCreateRequest leaveRequestCreateRequest,
            LeaveType leaveType,
            User user
    ){
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setStartDate(leaveRequestCreateRequest.getStartDate());
        leaveRequest.setEndDate(leaveRequestCreateRequest.getEndDate());
        leaveRequest.setReason(leaveRequestCreateRequest.getReason());
        leaveRequest.setEmployee(user);
        leaveRequest.setEmployeesManagerId(
                user.getManager() != null ? user.getManager().getUserId() : null
        );
        leaveRequest.setLeaveType(leaveType);
        leaveRequest.setStatus(LeaveStatus.PENDING);
        return leaveRequest;
    }




    public static Holiday mapToHoliday(HolidayCreateRequest holidayCreateRequest){
        Holiday holiday = new Holiday();
        holiday.setName(holidayCreateRequest.getName());
        holiday.setDate(holidayCreateRequest.getDate());

        return holiday;
    }

    public static LeaveType mapToLeaveType(LeaveTypeCreateRequest leaveTypeCreateRequest){
        LeaveType leaveType = new LeaveType();

        leaveType.setName(leaveTypeCreateRequest.getName());
        leaveType.setIsPaid(leaveTypeCreateRequest.getIsPaid());
        leaveType.setDefaultDaysPerYear(leaveTypeCreateRequest.getDefaultDaysPerYear());
       return leaveType;
    }


}
