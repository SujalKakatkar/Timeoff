package com.example.EmployeeManagement.service;

import com.example.EmployeeManagement.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    @Value("${secret-key}")
    private String secretKey;


    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    private SecretKey generateKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateAccessToken(User user) {
        return Jwts
                .builder()
                .subject(user.getEmail())
                .claim("role", user.getRole())
                .claim("type", "accessToken")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenExpiration))
                .signWith(generateKey())
                .compact();
    }

    public String generateRefreshToken(User user) {
        return Jwts
                .builder()
                .subject(user.getEmail())
                .claim("type", "refreshToken")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + refreshTokenExpiration))
                .signWith(generateKey())
                .compact();
    }

    private Claims getClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(generateKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractTokenType(String token) {
        return getClaims(token).get("type", String.class);
    }

    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
