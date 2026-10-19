package com.example.EmployeeManagement.dto;


import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class DepartmentRequest {
    @Size(min = 3, max = 100, message = "name must be 3 to 100 characters")
    private String name;
}
