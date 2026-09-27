package com.example.EmployeeManagement.dto.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponse {


    private Integer userId;
    private String username;
    private String name;
    private String phone;
    private String dept;
    private String address;
    private String email;
}
