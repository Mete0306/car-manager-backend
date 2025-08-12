package com.example.carmanager.repository;

import com.example.carmanager.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.carmanager.model.Car.Status;
import java.sql.Statement;
import java.util.List;
public interface CarRepository  extends JpaRepository<Car,Long> {
    List<Car> findByStatus(Status status);
    List<Car> findByBrandContainingIgnoreCase(String brand);
    List<Car> findByYearBetween(int from, int to);
    List<Car> findByFarbeContainingIgnoreCase(String farbe);

}
