package com.example.EmployeeManagement.dto.leave;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveStatsResponse {
    private Long totalLeaves;
    private Long usedLeaves;
    private Long leaveRequests;
    private Long pending;
    private Long approved;
    private Long rejected;
    private Long cancelled;

}
