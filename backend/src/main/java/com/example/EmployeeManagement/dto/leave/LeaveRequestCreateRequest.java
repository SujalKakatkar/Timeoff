package com.example.EmployeeManagement.dto.leave;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LeaveRequestCreateRequest {

    @NotNull
    private Integer leaveTypeId;

    @NotNull
    @FutureOrPresent(message = "Start date can't be in the past")
    private LocalDate startDate;

    @NotNull
    @FutureOrPresent(message = "End date can't be in the past")
    private LocalDate endDate;

    @NotBlank
    private String reason;

}
