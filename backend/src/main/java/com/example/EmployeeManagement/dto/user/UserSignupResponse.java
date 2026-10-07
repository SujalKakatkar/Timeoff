package com.example.EmployeeManagement.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserSignupResponse {

    private Integer userId;
    private String name;

    private String email;

    private LocalDateTime createdAt;


}
