package com.example.EmployeeManagement.dto.hr;

import com.example.EmployeeManagement.enums.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class EmployeeDetailedResponse extends EmployeeOverviewResponse {
    private String phone;
    private String address;
    private String email;
    private Role role;
    private String manager;

    public EmployeeDetailedResponse(Integer userId, String name, String dept, boolean isActive,String phone, String address, String email, Role role, String manager) {
        super(userId,name,dept,isActive);
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.role = role;
        this.manager = manager;
    }
}
