package com.nickesqueda.laceybeesbookinventoryapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(ResourceNotFoundException.class)
  public ErrorResponse handleResourceNotFoundException(ResourceNotFoundException e) {
    return new ErrorResponse(e.getMessage());
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(UniqueConstraintViolationException.class)
  public ErrorResponse handleUniqueConstraintViolationException(UniqueConstraintViolationException e) {
    return new ErrorResponse(e.getMessage());
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(RuntimeException.class)
  public ErrorResponse unhandledException(RuntimeException e) {
    return new ErrorResponse("Unhandled exception: " + e.toString());
  }
}
