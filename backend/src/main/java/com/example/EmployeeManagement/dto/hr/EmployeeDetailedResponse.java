package com.example.EmployeeManagement.dto.hr;

import com.example.EmployeeManagement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployeeDetailedResponse extends EmployeeOverviewResponse {
    private String phone;
    private String address;
    private String email;
    private Role role;
    private String manager;
}
