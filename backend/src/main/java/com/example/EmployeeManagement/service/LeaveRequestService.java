package com.example.EmployeeManagement.service;

import com.example.EmployeeManagement.dto.leave.LeaveRequestCreateRequest;
import com.example.EmployeeManagement.dto.leave.LeaveRequestResponse;
import com.example.EmployeeManagement.dto.leave.LeaveStatsResponse;
import com.example.EmployeeManagement.dto.leave.LeaveReviewRequest;
import com.example.EmployeeManagement.entity.*;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.enums.ReviewerRole;
import com.example.EmployeeManagement.enums.Role;
import com.example.EmployeeManagement.exceptions.InvalidLeaveOperationException;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.exceptions.RoleMismatchException;
import com.example.EmployeeManagement.exceptions.StatusMismatchException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.mapper.MapToEntity;
import com.example.EmployeeManagement.repository.*;
import com.example.EmployeeManagement.utils.Utilities;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LeaveRequestService {

    private LeaveRequestRepository leaveRequestRepository;

    private UserRepository userRepository;
    private LeaveTypeRepository leaveTypeRepository;
    private LeaveBalanceRepository leaveBalanceRepository;
    private HolidayRepository holidayRepository;
    private LeaveBalanceService leaveBalanceService;

    //todo: think about the system where hr only approves the managers request and further mangers approve the employees
    //todo: make you hr can't edit the employees requests


    //request for leave
    @Transactional
    public LeaveRequestResponse requestLeave(LeaveRequestCreateRequest leaveRequestCreateRequest, Integer userId) {

        LocalDate startDate = leaveRequestCreateRequest.getStartDate();
        LocalDate endDate = leaveRequestCreateRequest.getEndDate();

        if (startDate.isAfter(endDate)) {
            throw new InvalidLeaveOperationException("Start date cannot be after end date");
        }

        User user = userRepository.findByUserIdAndEnabledTrue(userId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("user not found")
                );
        LeaveType leaveType = leaveTypeRepository.findById(leaveRequestCreateRequest.getLeaveTypeId()).orElseThrow(
                () -> new ResourceNotFoundException("Leave type not found")
        );


        if (!leaveBalanceRepository.existsByUser_UserIdAndUser_EnabledTrue(user.getUserId())) {
            throw new InvalidLeaveOperationException("user don't have any balance for repo");
        }

        LeaveBalance leaveBalance =
                leaveBalanceRepository.findByUser_UserIdAndLeaveType_LeaveTypeIdAndYear(user.getUserId(), leaveType.getLeaveTypeId(), leaveRequestCreateRequest.getStartDate().getYear()).orElseThrow(
                        () -> new ResourceNotFoundException("leave type balance not found")
                );

        if (Objects.equals(leaveBalance.getUsedDays(), leaveBalance.getAllocatedDays())) {
            throw new InvalidLeaveOperationException("the user has used all of their leaves");
        }


        LeaveRequest leaveRequest = MapToEntity.mapToLeaveRequest(leaveRequestCreateRequest, leaveType, user);


        //validate the span of dates has holidays
        //todo: go through the stream once again
        Set<LocalDate> holidayDates = holidayRepository.findByDateBetween(startDate, endDate)
                .stream()
                .map(Holiday::getDate)
                .collect(Collectors.toSet());

        long actualDays = startDate.datesUntil(endDate.plusDays(1))
                .filter(date -> date.getDayOfWeek() != DayOfWeek.SUNDAY)
                .filter(date -> !holidayDates.contains(date))
                .count();


        if (leaveBalance.getUsedDays() + actualDays > leaveBalance.getAllocatedDays()) {
            throw new InvalidLeaveOperationException("you don't have that much leaves left");
        }

        leaveRequest.setNumberOfDays((double) actualDays);
        leaveRequest.setStatus(LeaveStatus.PENDING);
        //add the request to the table
        leaveRequestRepository.save(leaveRequest);

        return MapToDto.mapToLeaveRequestResponse(leaveRequest);
    }


    public List<LeaveRequestResponse> getLeaveRequests(Integer userId) {
        //find the user with email
        User user = userRepository.findByUserIdAndEnabledTrue(userId).orElseThrow(
                () -> new ResourceNotFoundException("user not found")
        );

        //get the user id and find the leave request
        List<LeaveRequest> leaveRequestList = leaveRequestRepository.findAllByEmployee_UserId(user.getUserId());


        //return
        return leaveRequestList.stream().map(MapToDto::mapToLeaveRequestResponse).toList();
    }


    @Transactional
    public void leaveRequestReview(LeaveReviewRequest leaveReviewRequest, Integer reviewerId) {


        //find the request from the request table
        LeaveRequest leaveRequest = leaveRequestRepository.findById(leaveReviewRequest.getLeaveRequestId()).orElseThrow(
                () -> new ResourceNotFoundException("Request not found")
        );

        if (leaveRequest.getStatus() == LeaveStatus.CANCELLED) {
            throw new StatusMismatchException("the request is already cancelled");
        }


        if (leaveRequest.getStatus() != LeaveStatus.PENDING) {
            throw new StatusMismatchException("the request is not pending");
        }

        User employee = leaveRequest.getEmployee();

        User reviewer = userRepository.findByUserIdAndEnabledTrue(reviewerId).orElseThrow(
                () -> new ResourceNotFoundException("reviewer not found")
        );

        //prevent self leave approve
        if (Objects.equals(employee.getUserId(), reviewer.getUserId())) {
            throw new RoleMismatchException("you can't manipuate your leave request");
        }

        if (reviewer.getRole() == Role.HR) {
            leaveRequest.setReviewerRole(ReviewerRole.HR);
        } else if (reviewer.getRole() == Role.MANAGER) {
            leaveRequest.setReviewerRole(ReviewerRole.MANAGER);
        } else {
            throw new RoleMismatchException("you not allow to do this");
        }
        leaveRequest.setStatus(Utilities.convertStatus(leaveReviewRequest.getStatus()));
        leaveRequest.setReviewer(reviewer);
        leaveRequest.setReviewComment(leaveReviewRequest.getComment());
        leaveRequest.setReviewedAt(LocalDateTime.now());

        //update balance

        if (leaveRequest.getStatus() == LeaveStatus.APPROVED) {
            leaveBalanceService.updateLeaveBalance(
                    employee.getUserId(),
                    leaveRequest.getLeaveType().getLeaveTypeId(),
                    leaveRequest.getNumberOfDays(),
                    leaveRequest.getStartDate().getYear()
            );
        }
        leaveRequestRepository.save(leaveRequest);

    }

    public LeaveStatsResponse getLeaveStats(Integer employeeId) {
        LeaveStatsResponse balanceStats = leaveBalanceRepository.getBalanceStats(employeeId);
        LeaveStatsResponse requestStats = leaveRequestRepository.getRequestStats(employeeId);
        return new LeaveStatsResponse(
                balanceStats.getTotalLeaves(),
                balanceStats.getUsedLeaves(),
                requestStats.getLeaveRequests(),
                requestStats.getPending(),
                requestStats.getApproved(),
                requestStats.getRejected(),
                requestStats.getCancelled()
        );
    }

    public LeaveStatsResponse getTeamMemberStats(Integer employeeId, Integer managerId) {
        boolean isManager = userRepository.existsByUserIdAndManager_userIdAndEnabledTrue(employeeId, managerId);
        if (!isManager) {
            throw new ResourceNotFoundException("your are not a manager of this employee");
        }
        return getLeaveStats(employeeId);
    }

}
