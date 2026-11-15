package com.example.EmployeeManagement.entity;


import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.ReviewerRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer requestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private User employee;

    private Integer employeesManagerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leave_type_id", nullable = false)
    private LeaveType leaveType;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double numberOfDays;

    private String reason;

    @Enumerated(EnumType.STRING)
    private LeaveStatus status;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id")
    private User reviewer;


    private String reviewComment;

    private LocalDateTime reviewedAt;

    @Enumerated(EnumType.STRING)
    private ReviewerRole reviewerRole;

    @Version
    private Long version;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

}
