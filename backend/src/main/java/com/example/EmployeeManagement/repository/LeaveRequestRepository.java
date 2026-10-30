package com.example.EmployeeManagement.repository;

import com.example.EmployeeManagement.entity.LeaveRequest;
import com.example.EmployeeManagement.enums.LeaveStatus;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Integer> {

//    @EntityGraph(attributePaths = {"leaveType", })
    List<LeaveRequest> findAllByEmployee_UserId(Integer id);

    Long countByEmployee_UserIdAndStatus(Integer userId, LeaveStatus leaveStatus);

    Long countByStatusAndEmployee_EnabledTrue(LeaveStatus status);
    Long countByStatusAndEmployee_EnabledTrueAndEmployee_Manager_userId(LeaveStatus status,Integer managerId);

    @Query("""
        SELECT COUNT(DISTINCT l.employee.userId)
        FROM LeaveRequest l
        WHERE l.status = com.example.EmployeeManagement.enums.LeaveStatus.APPROVED
          AND l.employee.enabled = true
          AND :date BETWEEN l.startDate AND l.endDate
        """)
    long countUsersOnLeave(@Param("date") LocalDate date);

    // Manager: team on leave on a given date
    @Query("""
        SELECT COUNT(DISTINCT l.employee.userId)
        FROM LeaveRequest l
        WHERE l.status = com.example.EmployeeManagement.enums.LeaveStatus.APPROVED
          AND l.employee.enabled = true
          AND l.employee.manager.userId = :managerId
          AND :date BETWEEN l.startDate AND l.endDate
        """)
    long countTeamOnLeave(@Param("managerId") Integer managerId,
                          @Param("date") LocalDate date);

}
