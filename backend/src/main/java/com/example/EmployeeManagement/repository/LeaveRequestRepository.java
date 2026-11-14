package com.example.EmployeeManagement.repository;

import com.example.EmployeeManagement.dto.LeaveSpan;
import com.example.EmployeeManagement.entity.LeaveRequest;
import com.example.EmployeeManagement.enums.LeaveStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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

    @Query("""
    select new com.example.EmployeeManagement.dto.LeaveSpan(
        l.employee.userId, l.startDate, l.endDate)
    from LeaveRequest l
    where l.status = :status
      and l.startDate <= :to
      and l.endDate   >= :from
    """)
    List<LeaveSpan> findSpans(@Param("status") LeaveStatus status,
                              @Param("from") LocalDate from,
                              @Param("to") LocalDate to);

    @Query("""
    select new com.example.EmployeeManagement.dto.LeaveSpan(
        l.employee.userId, l.startDate, l.endDate)
    from LeaveRequest l
    where l.status = :status
      and l.employee.manager.userId = :managerId
      and l.startDate <= :to
      and l.endDate   >= :from
""")
    List<LeaveSpan> findTeamSpans(
            @Param("status") LeaveStatus status,
            @Param("managerId") Integer managerId,
            @Param("from") LocalDate from,
            @Param("to") LocalDate to
    );


    @Query("""
    select distinct l.employee.userId
    from LeaveRequest l
    where l.status = :status
      and :today between l.startDate and l.endDate
    """)
    Set<Integer> findEmployeeIdsOnLeave(@Param("today") LocalDate today,
                                        @Param("status") LeaveStatus status);
}
