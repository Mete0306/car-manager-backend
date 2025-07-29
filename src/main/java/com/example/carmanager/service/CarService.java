package com.example.carmanager.service;
import com.example.carmanager.model.Car;
import com.example.carmanager.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import static org.apache.coyote.http11.Constants.a;

@Service

public class CarService {

    @Autowired
    private CarRepository carRepository;



    public List <Car> getAllCars(){


        return  carRepository.findAll();
    }

    public Optional<Car> getCarById (long id){
      return  carRepository.findById(id);

    }

    public Car createCar(Car c){
       return  carRepository.save(c);

    }

    public void deleteCar(Long id ){

        carRepository.deleteById(id);

    }

    public Car updateCar ( Long id, Car uCar){
     return carRepository.findById(id).map(a ->
        {
            a.setBrand(uCar.getBrand());
            a.setModel(uCar.getModel());
            a.setYear(uCar.getYear());
            a.setFarbe(uCar.getFarbe());
return carRepository.save(a);

        } ).orElseThrow(()-> new RuntimeException("Auto nicht gefunden"));



    }




}
