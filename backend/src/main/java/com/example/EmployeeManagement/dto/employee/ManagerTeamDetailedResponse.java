package com.example.EmployeeManagement.dto.employee;

import com.example.EmployeeManagement.enums.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ManagerTeamDetailedResponse extends ManagerOverviewResponse {
    private String phone;
    private String address;
    private String email;
    private Role role;

    public ManagerTeamDetailedResponse(Integer userId, String name, boolean isActive,String phone, String address, String email, Role role) {
        super(userId, name, isActive);
        this.phone = phone;
        this.address = address;
        this.email = email;
        this.role = role;
    }
}
