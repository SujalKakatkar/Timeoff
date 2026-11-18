package com.example.EmployeeManagement.repository;

import com.example.EmployeeManagement.dto.leave.LeaveStatsResponse;
import com.example.EmployeeManagement.entity.LeaveBalance;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LeaveBalanceRepository extends JpaRepository<LeaveBalance, Integer> {

    Optional<LeaveBalance> findByUser_UserIdAndLeaveType_LeaveTypeIdAndYear(Integer userId, Integer leaveTypeId, Integer year);

    @EntityGraph(attributePaths = {"leaveType", "user"})
    List<LeaveBalance> findAllByYear(Integer year);

    List<LeaveBalance> findAllByUser_UserId(Integer userId);

    boolean existsByUser_UserIdAndUser_EnabledTrue(Integer userId);

    boolean existsByUser_userIdAndUser_EnabledTrueAndYear(Integer userId, Integer Year);

    @Query("""
                    SELECT new com.example.EmployeeManagement.dto.leave.LeaveStatsResponse(
                      cast(coalesce(SUM(lb.allocatedDays),0L) as long),
                      cast(coalesce(SUM(lb.usedDays),0L)as long),
                      0L,0L,0L,0L,0L
                    )
                    FROM LeaveBalance lb
                    WHERE lb.user.userId = :userId
            """)
    LeaveStatsResponse getBalanceStats(@Param("userId") Integer userId);

}
