package com.example.EmployeeManagement.dto.leave;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveBalanceResponse {
    private  Integer balanceId;
    private String username;

    private String leaveTypeName;

    private Integer year;

    private Double allocatedDays;

    private Double usedDays;
}
