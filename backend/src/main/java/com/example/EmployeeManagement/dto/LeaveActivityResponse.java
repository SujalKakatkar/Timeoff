package com.example.EmployeeManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveActivityResponse {
    private LocalDate from;
    private LocalDate to;
    private List<LeaveActivityPoint> activity;
}
