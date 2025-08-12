package com.example.carmanager.service;
import com.example.carmanager.exception.CarNotFoundException;
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

    public Car getCarById (long id){
        return carRepository.findById(id).orElseThrow(()-> new CarNotFoundException(id));


    }

    public Car createCar(Car c){
       return  carRepository.save(c);

    }

    public void deleteCar(Long id ) {
        Optional<Car> auto = carRepository.findById(id);
        if (auto.isPresent()) {
            carRepository.deleteById(id);
        } else {
            throw new CarNotFoundException(id);
        }
    }

    public Car updateCar ( Long id, Car uCar){
     return carRepository.findById(id).map(a ->
        {
            a.setBrand(uCar.getBrand());
            a.setModel(uCar.getModel());
            a.setYear(uCar.getYear());
            a.setFarbe(uCar.getFarbe());
return carRepository.save(a);

        } ).orElseThrow(()-> new CarNotFoundException(id));



    }

    public List<Car> findByStatus(String status) {
        Car.Status st = Car.Status.valueOf(status.toUpperCase());
        return carRepository.findByStatus(st);
    }

    public List<Car> findByBrand(String brand) {
        return carRepository.findByBrandContainingIgnoreCase(brand);
    }

    public List<Car> findByYearRange(int from, int to) {
        return carRepository.findByYearBetween(from, to);
    }

    public List<Car> findByFarbe(String farbe) {
        return carRepository.findByFarbeContainingIgnoreCase(farbe);
    }





}
