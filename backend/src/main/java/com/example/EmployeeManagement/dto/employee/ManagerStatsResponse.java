package com.example.EmployeeManagement.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ManagerStatsResponse {
    private Long totalEmployees;
    private Long onLeaveToday;
    private Long pendingLeaveRequests;
    private Long present;
}
