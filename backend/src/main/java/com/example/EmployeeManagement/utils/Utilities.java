package com.example.EmployeeManagement.utils;


import com.example.EmployeeManagement.enums.Role;
import org.springframework.security.core.Authentication;

public class Utilities {

    public static boolean isHr(Authentication authentication){
        return authentication.getAuthorities()
                .stream()
                .anyMatch(a -> ("ROLE_" + Role.HR.name()).equals(a.getAuthority()));
    }
}
