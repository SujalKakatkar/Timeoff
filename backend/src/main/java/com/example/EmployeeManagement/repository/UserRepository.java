package com.example.EmployeeManagement.repository;

import com.example.EmployeeManagement.entity.User;
import com.example.EmployeeManagement.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);
    Optional<User> findByEmailAndEnabledTrue(String email);
    Optional<User> findByUserIdAndEnabledTrue(Integer userId);
    List<User> findAllByRoleInAndEnabledTrue(List<Role> roles);

    List<User> findAllByManager_UserId(Integer ManagerId);
}
