package com.example.carmanager.repository;

import com.example.carmanager.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository  extends JpaRepository<Car,Long> {


}
