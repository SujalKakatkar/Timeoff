package com.example.EmployeeManagement.utils;


import com.example.EmployeeManagement.enums.Role;
import org.springframework.security.core.Authentication;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.function.Predicate;

public class Utilities {

    public static boolean isHr(Authentication authentication){
        return authentication.getAuthorities()
                .stream()
                .anyMatch(a -> ("ROLE_" + Role.HR.name()).equals(a.getAuthority()));
    }

    public static Predicate<LocalDate> workingDayFilter(Set<LocalDate> dates) {
        Set<LocalDate> holidays = new HashSet<>(dates);
        return d -> d.getDayOfWeek() != DayOfWeek.SATURDAY &&
                d.getDayOfWeek() != DayOfWeek.SUNDAY && !holidays.contains(d);
    }
}
