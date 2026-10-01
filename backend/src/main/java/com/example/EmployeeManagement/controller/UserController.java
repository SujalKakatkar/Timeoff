package com.example.EmployeeManagement.controller;


//authentication check only

import com.example.EmployeeManagement.dto.user.*;
import com.example.EmployeeManagement.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> create(@Valid @RequestBody UserCreateRequest userRequest) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userService.createEmployee(userRequest));
    }

    @PatchMapping("/profile")
    public ResponseEntity<String> completeProfile(@Valid @RequestBody UserProfileRequest userProfileRequest, Authentication authentication) {
        String email = authentication.getName();
        userService.completeProfile(userProfileRequest, email);

        return ResponseEntity.ok("completed the profile");
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest loginRequest,
                                                   HttpServletResponse response
    ) {

        AuthTokens tokens = userService.loginUser(loginRequest);

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", tokens.getRefreshToken())
                .httpOnly(true).secure(false).sameSite("strict").path("/refresh").maxAge(Duration.ofDays(7)).build();

        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        UserLoginResponse body = new UserLoginResponse(
                tokens.getUserId(),
                tokens.getAccessToken(),
                tokens.getEmail(),
                tokens.getUsername(),
                tokens.getRole()
        );

        return ResponseEntity.status(HttpStatus.OK).body(body);

    }


    @GetMapping("/me")
    public ResponseEntity<UserDetailsResponse> me(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.status(HttpStatus.OK).body(
                userService.getDetails(email)
        );
    }

}
