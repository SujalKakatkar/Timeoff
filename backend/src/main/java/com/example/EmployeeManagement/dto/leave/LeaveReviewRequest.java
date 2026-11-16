package com.example.EmployeeManagement.dto.leave;


import com.example.EmployeeManagement.enums.ReviewLeaveStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class LeaveReviewRequest {
    @NotNull(message = "leave request can't be null")
    private Integer leaveRequestId;

    @NotNull(message = "status is required")
    private ReviewLeaveStatus status;
    private String comment;

}
