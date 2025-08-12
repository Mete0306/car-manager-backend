package com.example.carmanager.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Brand must not be blank")
    private String brand;

    @NotBlank(message = "Model must not be blank")
    private String model;

    private String farbe;

    @Column(name = "`year`")
    @Min(value = 1886, message = "Year must be 1886 or later")
    private int year;


    @Column(unique = true, length = 50)
    private String vin;


    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Status status = Status.AVAILABLE;


    @PositiveOrZero
    private Integer mileage = 0;

    @PositiveOrZero
    @Digits(integer = 10, fraction = 2)
    private BigDecimal price;


    @PastOrPresent
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate lastServiceDate;

    public enum Status {AVAILABLE, IN_USE, MAINTENANCE}

    public Car() {
    }

    public String getBrand() {
        return brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getFarbe() {
        return farbe;
    }

    public Integer getMileage() {
        return mileage;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public LocalDate getLastServiceDate() {
        return lastServiceDate;
    }

    public void setLastServiceDate(LocalDate lastServiceDate) {
        this.lastServiceDate = lastServiceDate;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setMileage(Integer mileage) {
        this.mileage = mileage;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public int getYear() {
        return year;
    }

    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setFarbe(String farbe) {
        this.farbe = farbe;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}

