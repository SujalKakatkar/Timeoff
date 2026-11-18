package com.example.EmployeeManagement.dto.leave;

import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.ReviewerRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


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

    private LocalDate appliedAt;

    private String reviewerName;
    private ReviewerRole reviewerRole;
    private String reviewComment;
    private LocalDate reviewedAt;

}
