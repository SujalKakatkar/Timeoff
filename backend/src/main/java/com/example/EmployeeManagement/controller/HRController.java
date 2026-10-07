package com.example.EmployeeManagement.controller;


import com.example.EmployeeManagement.dto.DetailedReportResponse;
import com.example.EmployeeManagement.dto.user.UserDetailsResponse;
import com.example.EmployeeManagement.service.HRService;
import jakarta.validation.constraints.NotNull;
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

    @PutMapping("/promote")
    public ResponseEntity<String> promoteToManger(
            @RequestParam @Positive(message = "empId must be positive")
            Integer empId,
            Authentication authentication) {
        String emailOfHR = authentication.getName();
        hrService.promoteManger(empId, emailOfHR);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("the employee is prompted to manger");
    }

    @PatchMapping("/assign")
    public ResponseEntity<String> promoteToManger(@RequestParam @Positive(message = "empId must be positive") Integer empId, @RequestParam @Positive(message = "managerId must be positive") Integer managerId) {

        hrService.assignManger(empId, managerId);
        return ResponseEntity.ok("the employee is prompted to manger");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDetailsResponse> getUser(@PathVariable Integer userId){
        return ResponseEntity.status(HttpStatus.OK).body(hrService.getUser( userId));
    }

    //all employees including managers
    @GetMapping("/all")
    public ResponseEntity<List<UserDetailsResponse>> getAll(Authentication authentication) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(hrService.getAllEmployees());

    }

    //all managers
    @GetMapping("/managers")
    public ResponseEntity<List<UserDetailsResponse>> getAllManagers(Authentication authentication) {

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(hrService.getAllManagers());

    }


    //disable user profile
    @PatchMapping("/disable")
    public ResponseEntity<String> disableEmployee(@RequestParam @NotNull(message = "Username is required") Integer userId) {
        hrService.disableEmployee(userId);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("employee is disabled");
    }

    @GetMapping("/{empId}/report")
    public ResponseEntity<DetailedReportResponse> employeeReport(@PathVariable @Positive(message = "empId must be positive") Integer empId) {
        return ResponseEntity.status(HttpStatus.OK).body(hrService.getEmployeeReport(empId));
    }

    @GetMapping("/{year}/reports")
    public ResponseEntity<List<DetailedReportResponse>> allReports(@PathVariable Integer year){
        return ResponseEntity.ok(hrService.getAllReports(year));
    }


}
