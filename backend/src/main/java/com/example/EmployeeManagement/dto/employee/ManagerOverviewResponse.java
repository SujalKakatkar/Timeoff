package com.example.EmployeeManagement.dto.employee;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
public class ManagerOverviewResponse extends EmployeeBase {
    public ManagerOverviewResponse(Integer userId, String name, boolean isActive) {
        super(userId, name, isActive);
    }
}
