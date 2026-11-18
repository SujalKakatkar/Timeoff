package com.example.EmployeeManagement.controller;

import com.example.EmployeeManagement.dto.leave.LeaveTypeCreateRequest;
import com.example.EmployeeManagement.dto.leave.LeaveTypeResponse;
import com.example.EmployeeManagement.service.LeaveTypeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leavetype")
@Validated
public class LeaveTypeController {

    private final LeaveTypeService leaveTypeService;

    public LeaveTypeController(LeaveTypeService leaveTypeService) {
        this.leaveTypeService = leaveTypeService;
    }


    @PostMapping
    public ResponseEntity<LeaveTypeResponse> createLeave(@Valid @RequestBody LeaveTypeCreateRequest leaveType) {
        return ResponseEntity.status(HttpStatus.OK).body(leaveTypeService.createLeave(leaveType));
    }

    @GetMapping
    public ResponseEntity<List<LeaveTypeResponse>> getAllTypes(){
        return ResponseEntity.status(HttpStatus.OK).body(
                leaveTypeService.getAllTypes()
        );
    }

    @DeleteMapping()
    public ResponseEntity<String> deleteLeaveType(@RequestParam @NotNull(message = "Leave ID can't be null to delete") Integer leaveId) {
        leaveTypeService.deleteLeave(leaveId);
        return ResponseEntity.status(HttpStatus.OK).body("the leave type is deleted");
    }
}
