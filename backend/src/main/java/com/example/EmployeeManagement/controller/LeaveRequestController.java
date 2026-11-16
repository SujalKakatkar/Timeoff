package com.example.EmployeeManagement.controller;


import com.example.EmployeeManagement.dto.LeaveRequestCreateRequest;
import com.example.EmployeeManagement.dto.LeaveRequestResponse;
import com.example.EmployeeManagement.dto.leave.LeaveReviewRequest;
import com.example.EmployeeManagement.service.EmployeeService;
import com.example.EmployeeManagement.service.LeaveRequestService;
import com.example.EmployeeManagement.utils.Utilities;
import jakarta.validation.Valid;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/leave-request")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;
    private final EmployeeService employeeService;


    @PostMapping
    public ResponseEntity<LeaveRequestResponse> createLeaveRequest(@Valid @RequestBody LeaveRequestCreateRequest requestDto, @AuthenticationPrincipal Integer userId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(leaveRequestService.requestLeave(requestDto, userId));
    }


    @GetMapping("/employee")
    public ResponseEntity<List<LeaveRequestResponse>> get(@AuthenticationPrincipal Integer userId, @RequestParam(required = false) Integer employeeId, Authentication authentication) {

        boolean isHr = Utilities.isHr(authentication);
        boolean isManager = Utilities.isManager(authentication);

        if (isHr && employeeId != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    leaveRequestService.getLeaveRequests(employeeId)
            );
        }

        if (isManager && employeeId != null) {
            boolean isManagerEmployee = employeeService.isManagerOfEmployee(employeeId, userId);

            if (!isManagerEmployee) {

                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    leaveRequestService.getLeaveRequests(employeeId)
            );
        }

        return ResponseEntity.status(HttpStatus.OK).body(
                leaveRequestService.getLeaveRequests(userId)
        );
    }

    @PatchMapping("/review")
    public ResponseEntity<Void> reviewLeaveRequest(@Valid @RequestBody LeaveReviewRequest leaveReviewRequest, @AuthenticationPrincipal Integer userId) {
        leaveRequestService.leaveRequestReview(leaveReviewRequest, userId);

        return ResponseEntity.status(HttpStatus.OK).build();

    }

}
