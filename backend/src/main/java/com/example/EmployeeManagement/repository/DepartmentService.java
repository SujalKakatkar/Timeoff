package com.example.EmployeeManagement.repository;

import com.example.EmployeeManagement.dto.DepartmentRequest;
import com.example.EmployeeManagement.dto.DepartmentResponse;
import com.example.EmployeeManagement.entity.Department;
import com.example.EmployeeManagement.exceptions.ResourceAlreadyExistsException;
import com.example.EmployeeManagement.mapper.MapToDto;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {
    public final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }


    @Transactional
    public void createDepartment(DepartmentRequest departmentRequest) {
        Department temp = new Department();
        temp.setName(departmentRequest.getName());
        try{
            departmentRepository.save(temp);
        }catch (DataIntegrityViolationException e){
            throw new ResourceAlreadyExistsException("something went wrong");
        }
    }

    public List<DepartmentResponse> getDepartments() {
        List<Department> departmentList = departmentRepository.findAll();
        return departmentList.stream().map(MapToDto::mapToDepartmentResponse).collect(Collectors.toList());
    }
}
