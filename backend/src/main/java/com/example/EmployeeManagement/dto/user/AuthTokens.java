package com.example.EmployeeManagement.dto.user;

import com.example.EmployeeManagement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthTokens {
    private String accessToken;
    private String refreshToken;
    private String email;
    private Role role;
}
