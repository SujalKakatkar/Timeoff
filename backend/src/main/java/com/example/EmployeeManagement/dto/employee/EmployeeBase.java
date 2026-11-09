package com.example.EmployeeManagement.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeBase {
    private Integer userId;
    private String name;
    private boolean isActive;
}
