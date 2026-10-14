package com.example.EmployeeManagement.dto.user;

import com.example.EmployeeManagement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserLoginResponse extends UserDetailsResponse {
    private String accessToken;

    public UserLoginResponse(UserDetailsResponse u, String accessToken) {
        super(u.getUserId(), u.getName(), u.getPhone(), u.getDept(),
                u.getAddress(), u.getEmail(), u.getRole());
        this.accessToken = accessToken;
    }
}
