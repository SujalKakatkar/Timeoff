package com.example.EmployeeManagement.mapper;

import com.example.EmployeeManagement.dto.HolidayCreateRequest;
import com.example.EmployeeManagement.dto.LeaveReviewResponse;
import com.example.EmployeeManagement.dto.LeaveRequestCreateRequest;
import com.example.EmployeeManagement.dto.LeaveTypeCreateRequest;
import com.example.EmployeeManagement.dto.user.UserCreateRequest;
import com.example.EmployeeManagement.entity.*;
import com.example.EmployeeManagement.enums.ApproverRole;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.Role;

public class MapToEntity {

    public static User mapToUser(UserCreateRequest user){
        User newUser = new User();
        newUser.setName(user.getName());
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setEnabled(true);
        //this map only need when it's time to add a new user, so I kept the manger and employee has default
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
        leaveRequest.setLeaveType(leaveType);
        leaveRequest.setStatus(LeaveStatus.PENDING);
        return leaveRequest;
    }


    public static LeaveReview mapToLeaveReview(
            LeaveReviewResponse dto,
            LeaveRequest leaveRequest,
            User approver,
            ApproverRole role
    ){
        LeaveReview leaveReview = new LeaveReview();
        leaveReview.setStatus(dto.getStatus());
        leaveReview.setReviewer(approver);
        leaveReview.setLeaveRequest(leaveRequest);
        leaveReview.setReviewerRole(role);
        leaveReview.setComments(dto.getComment());
        return leaveReview;

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
