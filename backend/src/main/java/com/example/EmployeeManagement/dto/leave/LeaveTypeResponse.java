package com.example.EmployeeManagement.dto.leave;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveTypeResponse {
    private Integer leaveTypeId;

    private String name;

    private Integer defaultDaysPerYear;

    private Boolean isPaid;

    private LocalDateTime createdAt;
}
