package com.example.EmployeeManagement.repository;

import com.example.EmployeeManagement.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface HolidayRepository extends JpaRepository<Holiday, Integer> {
    List<Holiday> findByDateBetween(LocalDate start, LocalDate end);

    @Query("select h.date from Holiday h where h.date between :from and :to")
    Set<LocalDate> findDatesBetween(@Param("from") LocalDate from,
                                    @Param("to") LocalDate to);
}
