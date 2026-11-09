package com.example.EmployeeManagement.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Setter
@Getter
public class EmployeeOverviewResponse extends EmployeeBase {
    private String dept;

    public EmployeeOverviewResponse(Integer userId, String name, boolean isActive, String dept) {
        super(userId, name, isActive);
        this.dept = dept;
    }
}
