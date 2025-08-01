package com.example.carmanager.controller;

import com.example.carmanager.model.Car;
import com.example.carmanager.service.CarService;
import jakarta.validation.Valid;
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
    public Car createCar(@Valid @RequestBody Car car){
       return carService.createCar(car);
}


@PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car){
       return carService.updateCar(id,car);

}

@DeleteMapping ("/{id}")
public void deleteCar(@PathVariable Long id){
       carService.deleteCar(id);

}

}
