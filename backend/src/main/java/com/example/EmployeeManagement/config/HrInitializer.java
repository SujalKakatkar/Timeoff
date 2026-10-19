package com.example.EmployeeManagement.config;

import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.enums.Role;
import com.example.EmployeeManagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class HrInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public HrInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0){
            User admin = new User();

            admin.setName("System Admin");
            admin.setEmail("hr@gmail.com");
            admin.setPassword(
                    passwordEncoder.encode("Hr@0007")
            );
            admin.setPhone("12345678910");
            admin.setAddress("belgavi");
            admin.setRole(Role.HR);
            admin.setEnabled(true);


            userRepository.save(admin);
            System.out.println("Default Hr is created");

        }
    }
}
