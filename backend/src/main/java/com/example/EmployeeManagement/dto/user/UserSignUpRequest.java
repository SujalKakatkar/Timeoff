package com.example.EmployeeManagement.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpRequest {

    @Size(min = 3, max = 100, message = "name must be 3 to 100 characters")
    private String name;

    @NotBlank(message = "email is required")
    @Email(message = "Invalid email format")
    @Size(max = 254)
    private String email;

    @NotBlank(message = "password is required")
    @Size(min = 8, max = 72, message = "password must be 8 to 72 characters")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$",
            message = "password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"

    )
    private String password;
}
