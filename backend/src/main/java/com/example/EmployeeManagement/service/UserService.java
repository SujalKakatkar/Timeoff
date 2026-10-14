package com.example.EmployeeManagement.service;

import com.example.EmployeeManagement.dto.user.*;
import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.exceptions.InvalidCredentialsException;
import com.example.EmployeeManagement.exceptions.InvalidRefreshTokenException;
import com.example.EmployeeManagement.exceptions.ResourceAlreadyExistsException;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.mapper.MapToEntity;

import com.example.EmployeeManagement.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import org.springframework.dao.DataIntegrityViolationException;
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

    @Transactional
    public void createEmployee(UserSignUpRequest req) {
        String email = req.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new ResourceAlreadyExistsException("email already used");
        }

        User newUser = MapToEntity.mapToUser(req);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(req.getPassword()));

        try {
            userRepository.save(newUser);
        } catch (DataIntegrityViolationException e) {
            throw new ResourceAlreadyExistsException("email already used");
        }
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
        temp.setDept(userProfileRequest.getDept());
        temp.setAddress(userProfileRequest.getAddress());
        temp.setPhone(userProfileRequest.getPhone());

    }

    @Transactional
    public AuthTokens loginUser(UserLoginRequest login) {
        User temp = userRepository.findByEmailAndEnabledTrue(login.getEmail()).orElseThrow(
                InvalidCredentialsException::new
        );

        boolean isMatch = passwordEncoder.matches(login.getPassword(), temp.getPassword());
        if (!isMatch) throw new InvalidCredentialsException();
        String accessToken = jwtService.generateAccessToken(temp);
        String refreshToken = jwtService.generateRefreshToken(temp);
        temp.setRefreshToken(refreshToken);
        UserDetailsResponse userDTO = MapToDto.mapToUserDetailResponse(temp);
        return new AuthTokens(
                accessToken,
                refreshToken,
                userDTO
        );
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
        } catch (JwtException | IllegalArgumentException ignored) {
        }

    }

    public AccessTokenResponse refreshAccessToken(String refreshToken) {
        String email;
        try {
            email = jwtService.extractEmail(refreshToken);
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidRefreshTokenException();
        }

        User temp = userRepository.findByEmailAndEnabledTrue(email).orElseThrow(
                InvalidRefreshTokenException::new
        );

        if (!refreshToken.equals(temp.getRefreshToken())) {
            throw new InvalidRefreshTokenException();
        }
        return new AccessTokenResponse(jwtService.generateAccessToken(temp));
    }
}
