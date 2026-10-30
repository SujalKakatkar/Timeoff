package com.example.EmployeeManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class HrStatsResponse {
    private Long totalEmployees;
    private Long managers;
    private Long onLeaveToday;
    private Long pendingLeaveRequests;
    private Long present;
}
