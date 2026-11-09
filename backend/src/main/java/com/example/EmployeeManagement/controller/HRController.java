package com.example.EmployeeManagement.controller;


import com.example.EmployeeManagement.dto.DetailedReportResponse;
import com.example.EmployeeManagement.dto.HrStatsResponse;
import com.example.EmployeeManagement.dto.LeaveActivityResponse;
import com.example.EmployeeManagement.service.HRService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/hr")
@Validated
public class HRController {

    private final HRService hrService;


    public HRController(HRService hrService) {
        this.hrService = hrService;
    }

    @GetMapping("/{empId}/report")
    public ResponseEntity<DetailedReportResponse> employeeReport(@PathVariable @Positive(message = "empId must be positive") Integer empId) {
        return ResponseEntity.status(HttpStatus.OK).body(hrService.getEmployeeReport(empId));
    }

    @GetMapping("/{year}/reports")
    public ResponseEntity<List<DetailedReportResponse>> allReports(@PathVariable Integer year) {
        return ResponseEntity.ok(hrService.getAllReports(year));
    }

    @GetMapping("/stats")
    public ResponseEntity<HrStatsResponse> getStats() {
        return ResponseEntity.status(HttpStatus.OK).body(
                hrService.getStats()
        );
    }

    @GetMapping("/leave-activity")
    public ResponseEntity<LeaveActivityResponse> getLeaveActivity(@RequestParam(defaultValue = "30") @Min(1) @Max(365) Long days) {
        return ResponseEntity.status(HttpStatus.OK).body(hrService.getLeaveActivity(days));
    }
}
