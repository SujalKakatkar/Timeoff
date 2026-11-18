package com.example.EmployeeManagement.dto.employee;


import com.example.EmployeeManagement.dto.leave.LeaveTypeDetails;
import com.example.EmployeeManagement.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DetailedReportResponse  {

    private Integer empId;
    private String name;
    private String email;
    private Role role;
    private Integer managerId;

    private List<LeaveTypeDetails> leaveTypeBreakDown = new ArrayList<>();

    private Long leaveApproved;
    private Long leavePending;
    private Long leaveRejected;

    private Double TotalAllocatedDays;
    private Double TotalUsedDays;
    private Double  TotalRemainingBalance;


}
