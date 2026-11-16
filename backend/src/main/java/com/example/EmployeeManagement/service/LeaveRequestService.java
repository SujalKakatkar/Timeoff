package com.example.EmployeeManagement.service;

import com.example.EmployeeManagement.dto.LeaveRequestCreateRequest;
import com.example.EmployeeManagement.dto.LeaveRequestResponse;
import com.example.EmployeeManagement.entity.*;
import com.example.EmployeeManagement.enums.LeaveStatus;
import com.example.EmployeeManagement.exceptions.InvalidLeaveOperationException;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.mapper.MapToEntity;
import com.example.EmployeeManagement.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
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


}
