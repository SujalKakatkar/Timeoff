package com.example.EmployeeManagement.dto.leave;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveTypeCreateRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Positive(message = "days can't be negative or 0")
    private Integer defaultDaysPerYear;

    private Boolean isPaid;


}
