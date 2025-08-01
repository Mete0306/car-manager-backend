package com.example.carmanager.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
@ExceptionHandler (CarNotFoundException.class)
    public ResponseEntity<String> handleCarnotFound (CarNotFoundException e){
    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}

}
