package com.example.EmployeeManagement.dto.hr;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class EmployeeOverviewResponse {
    private Integer userId;
    private String name;
    private String dept;
    private boolean isActive;
}
