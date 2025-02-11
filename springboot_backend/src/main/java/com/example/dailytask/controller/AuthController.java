package com.example.dailytask.controller;

import com.example.dailytask.dto.LoginRequest;
import com.example.dailytask.dto.LoginResponse;
import com.example.dailytask.model.User;
import com.example.dailytask.repository.UserRepository;
import com.example.dailytask.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.print("login request"+ loginRequest);
        return userRepository.findByUsername(loginRequest.getUsername())
                .filter(user -> loginRequest.getPassword().equals(user.getPassword()))

                .map(user -> {
                    String token = jwtUtil.generateToken(user.getUsername());
                 
                    return ResponseEntity.ok(new LoginResponse(token, "Login successful"));
                 
                })
                .orElse(ResponseEntity.badRequest().body(new LoginResponse(null, "Invalid credentials")));
    }
}