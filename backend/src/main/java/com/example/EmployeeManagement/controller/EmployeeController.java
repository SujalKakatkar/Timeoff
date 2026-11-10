package com.example.EmployeeManagement.controller;


import com.example.EmployeeManagement.dto.user.UserDetailsResponse;
import com.example.EmployeeManagement.service.EmployeeService;
import com.example.EmployeeManagement.utils.Utilities;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
@Validated
public class EmployeeController {

    public final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    //overview for both hr and manager
    @GetMapping("/overview")
    public ResponseEntity<?> getOverview(@AuthenticationPrincipal Integer userId, Authentication authentication) {
        boolean isHr = Utilities.isHr(authentication);
        if (isHr) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(employeeService.getOverview());

        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(employeeService.getTeamOverview(userId));
        }
    }

    //all employees including managers
    @GetMapping("/all")
    public ResponseEntity<List<?>> getAll(@AuthenticationPrincipal Integer userId, Authentication authentication) {

        boolean isHr = Utilities.isHr(authentication);
        if (isHr) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(employeeService.getAllEmployees());

        } else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(employeeService.getTeamOfTheManager(userId));
        }
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(@AuthenticationPrincipal Integer userId, Authentication authentication) {
        boolean isHr = Utilities.isHr(authentication);
        if (isHr) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    employeeService.getHrStats()
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.getManagerStats(userId));
    }

   //needs to add stats for each individual employee

    @GetMapping
    public ResponseEntity<UserDetailsResponse> getUser(@RequestParam Integer employeeId) {
        return ResponseEntity.status(HttpStatus.OK).body(employeeService.getUser(employeeId));
    }

}
