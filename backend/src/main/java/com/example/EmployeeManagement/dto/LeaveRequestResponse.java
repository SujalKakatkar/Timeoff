package com.example.EmployeeManagement.dto;

import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.ReviewerRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveRequestResponse {
    private Integer requestId;


    private LocalDate startDate;

    private LocalDate endDate;

    private Double numberOfDays;

    private String reason;

    @Enumerated(EnumType.STRING)
    private LeaveStatus status;

    private LocalDateTime appliedAt;

    private String reviewerName;
    private ReviewerRole reviewerRole;
    private String reviewComment;
    private LocalDateTime reviewedAt;

}
