package com.example.EmployeeManagement.dto.leave;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveTypeDetails {
    private String name;
    private Double allocatedDays;
    private Double usedDays;
    private Double remainingDays;
}
