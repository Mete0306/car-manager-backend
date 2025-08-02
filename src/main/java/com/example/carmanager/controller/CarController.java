package com.example.carmanager.controller;

import com.example.carmanager.model.Car;
import com.example.carmanager.service.CarService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
public class CarController {

   private  CarService carService;
   public CarController( CarService carService){
       this.carService= carService;


   }

   @GetMapping
    public List<Car> getAllCars(){
       return carService.getAllCars();
   }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id){
        return ResponseEntity.ok(carService.getCarById(id));
    }
@PostMapping
public ResponseEntity<Car> createCar(@Valid @RequestBody Car car){
    Car savedCar = carService.createCar(car);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedCar);
}




@PutMapping("/{id}")
public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car){
    Car updatedCar = carService.updateCar(id,car);
    return ResponseEntity.ok(updatedCar);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id){
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }


}
