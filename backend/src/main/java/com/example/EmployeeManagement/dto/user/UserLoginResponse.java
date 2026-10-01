package com.example.EmployeeManagement.dto.user;

import com.example.EmployeeManagement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserLoginResponse  {
    private Integer userId;
    private String token;
    private String email;
    private String username;
    private Role role;
}
