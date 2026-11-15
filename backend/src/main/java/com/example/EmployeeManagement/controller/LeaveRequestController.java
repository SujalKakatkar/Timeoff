package com.example.EmployeeManagement.controller;


import com.example.EmployeeManagement.dto.LeaveRequestCreateRequest;
import com.example.EmployeeManagement.dto.LeaveRequestResponse;
import com.example.EmployeeManagement.service.LeaveRequestService;
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
@RequestMapping("/api/leaverequest")
public class LeaveRequestController {

    private final LeaveRequestService leaveRequestService;



    @PostMapping
    public ResponseEntity<LeaveRequestResponse> createLeaveRequest(@Valid @RequestBody LeaveRequestCreateRequest requestDto, @AuthenticationPrincipal Integer userId){
        return ResponseEntity.status(HttpStatus.CREATED).body(leaveRequestService.requestLeave(requestDto,userId));
    }



    @GetMapping("/me")
    public ResponseEntity<List<LeaveRequestResponse>> get(Authentication authentication){

        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.OK).body(
                leaveRequestService.getLeaveRequests(email)
        );
    }

//    @PatchMapping("/review")
//    public ResponseEntity<String> reviewLeaveRequest(@Valid @RequestBody LeaveReviewResponse leaveReviewResponse, Authentication authentication){
//        String email = authentication.getName();
//          leaveApprovalService.reviewTheRequest(leaveReviewResponse, email);
//
//        return ResponseEntity.status(HttpStatus.OK).body(
//                "done with request"
//        );
//
//    }

}
