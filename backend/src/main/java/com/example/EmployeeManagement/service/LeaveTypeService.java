package com.example.EmployeeManagement.service;

import com.example.EmployeeManagement.dto.leave.LeaveTypeCreateRequest;
import com.example.EmployeeManagement.dto.leave.LeaveTypeResponse;
import com.example.EmployeeManagement.entity.LeaveType;
import com.example.EmployeeManagement.exceptions.ResourceNotFoundException;
import com.example.EmployeeManagement.mapper.MapToDto;
import com.example.EmployeeManagement.mapper.MapToEntity;
import com.example.EmployeeManagement.repository.LeaveTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveTypeService {

    private final LeaveTypeRepository leaveTypeRepository;


    public LeaveTypeService(LeaveTypeRepository leaveTypeRepository) {
        this.leaveTypeRepository = leaveTypeRepository;
    }

    //add type this is only by HR
    public LeaveTypeResponse createLeave(LeaveTypeCreateRequest leaveTypeCreateRequest){


        LeaveType leaveType = leaveTypeRepository.save(MapToEntity.mapToLeaveType(leaveTypeCreateRequest));

        return MapToDto.mapToLeaveTypeResponse(leaveType);
    }

    //delete the leave type
    public void deleteLeave(Integer leaveId){
        LeaveType leaveType = leaveTypeRepository.findById(leaveId).orElseThrow(
                ()-> new ResourceNotFoundException("the leave type not found")
        );

        leaveTypeRepository.delete(leaveType);
    }

    public List<LeaveTypeResponse> getAllTypes() {

        List<LeaveType> leaveTypeList = leaveTypeRepository.findAll();

        return leaveTypeList.stream().map(MapToDto::mapToLeaveTypeResponse).toList();
    }
}
