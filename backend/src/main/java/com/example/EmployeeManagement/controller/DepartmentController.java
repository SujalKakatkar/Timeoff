package com.example.EmployeeManagement.controller;

import com.example.EmployeeManagement.dto.DepartmentRequest;
import com.example.EmployeeManagement.dto.DepartmentResponse;
import com.example.EmployeeManagement.repository.DepartmentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/department" )
public class DepartmentController {

    public final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }


    @PostMapping
    public ResponseEntity<Void> createDepartment(@RequestBody DepartmentRequest departmentRequest){
        departmentService.createDepartment(departmentRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping
    public ResponseEntity<List<DepartmentResponse>> getDepartments(){

        return ResponseEntity.status(HttpStatus.OK).body(
                departmentService.getDepartments()
        );

    }
}
