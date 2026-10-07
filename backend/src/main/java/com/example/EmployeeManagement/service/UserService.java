package com.example.EmployeeManagement.service;

import com.example.EmployeeManagement.dto.user.*;
import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.exceptions.InvalidRefreshTokenException;
import com.example.EmployeeManagement.exceptions.ResourceAlreadyExistsException;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.mapper.MapToEntity;

import com.example.EmployeeManagement.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService {

    private final UserRepository userRepository;

    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    public UserService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserSignupResponse createEmployee(UserSignUpRequest user) {
        //if user exists with same username
        if (userRepository.existsByUsername(user.getUsername()) || userRepository.existsByEmail(user.getEmail())) {
            throw new ResourceAlreadyExistsException("username or email already used");
        }

        //finally mapping the userdata to entity
        User newUser = MapToEntity.mapToUser(user);
        //hashing the password
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));


        User temp = userRepository.save(newUser);

        return MapToDto.mapToUserResponse(temp);
    }

    public UserDetailsResponse getDetails(String email) {
        User temp = userRepository.findByEmailAndEnabledTrue(email).orElseThrow(
                () -> new ResourceNotFoundException("User not found")
        );

        return MapToDto.mapToUserDetailResponse(temp);
    }

    @Transactional
    public void completeProfile(UserProfileRequest userProfileRequest, String email) {
        User temp = userRepository.findByEmailAndEnabledTrue(email).orElseThrow(
                () -> new ResourceNotFoundException("User not found")
        );
        System.out.println(temp.getUsername());
        temp.setDept(userProfileRequest.getDept());
        temp.setAddress(userProfileRequest.getAddress());
        temp.setPhone(userProfileRequest.getPhone());

    }

    @Transactional
    public AuthTokens loginUser(UserLoginRequest login) {
        User temp = userRepository.findByUsernameAndEnabledTrue(login.getUsername()).orElseThrow(
                () -> new ResourceNotFoundException("user not found")
        );


        boolean isMatch = passwordEncoder.matches(login.getPassword(), temp.getPassword());
        if (!isMatch) throw new ResourceNotFoundException("Invalid username or password");
        String accessToken = jwtService.generateAccessToken(temp);
        String refreshToken = jwtService.generateRefreshToken(temp);
        temp.setRefreshToken(refreshToken);
        return new AuthTokens(accessToken, refreshToken, temp.getUserId(), temp.getEmail(), temp.getRole(), temp.getUsername());
    }


    @Transactional
    public void revokeRefreshToken(String token) {

        if (token == null) return;
        try {
            String email = jwtService.extractEmail(token);
            userRepository.findByEmailAndEnabledTrue(email).ifPresent(
                    user -> {
                        if (token.equals(user.getRefreshToken())) {
                            user.setRefreshToken(null);
                        }
                    }
            );

        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidRefreshTokenException();
        }

    }

    public String refreshAccessToken(String refreshToken) {

        String email = jwtService.extractEmail(refreshToken);

        User temp = userRepository.findByEmailAndEnabledTrue(email).orElseThrow(
                InvalidRefreshTokenException::new
        );

        if (!refreshToken.equals(temp.getRefreshToken())) {
            throw new InvalidRefreshTokenException();
        }

        return jwtService.generateAccessToken(temp);

    }
}
