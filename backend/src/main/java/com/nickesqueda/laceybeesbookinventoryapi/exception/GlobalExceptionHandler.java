package com.nickesqueda.laceybeesbookinventoryapi.exception;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ResponseStatus(HttpStatus.NOT_FOUND)
  @ExceptionHandler(ResourceNotFoundException.class)
  public ErrorResponse handleResourceNotFoundException(ResourceNotFoundException e) {
    return new ErrorResponse(e.getMessage(), null);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(UniqueConstraintViolationException.class)
  public ErrorResponse handleUniqueConstraintViolationException(
      UniqueConstraintViolationException e) {
    return new ErrorResponse(e.getMessage(), null);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    List<String> errorMessages =
        e.getBindingResult().getFieldErrors().stream()
            .map(fieldError -> fieldError.getField() + ": " + fieldError.getDefaultMessage())
            .toList();
    return new ErrorResponse("Request validation failed", errorMessages);
  }

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
    String readStatuses =
        String.join(
            ", ", Arrays.stream(ReadStatus.values()).map(Enum::name).toArray(String[]::new));

    String errorMessage;
    String errorDetail;
    String exceptionMessage = e.getMessage().toLowerCase();
    if (exceptionMessage.contains("unexpected character")) {
      errorMessage = "Bad JSON Formatting: Please ensure request body is valid json";
      errorDetail = e.getMessage();
    } else {
      errorMessage = "Request validation failed";
      errorDetail = "readStatus: possible readStatus values: " + readStatuses;
    }

    List<String> errorDetails = List.of(errorDetail);
    return new ErrorResponse(errorMessage, errorDetails);
  }

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(RuntimeException.class)
  public ErrorResponse unhandledException(RuntimeException e) {
    return new ErrorResponse("Unhandled exception: " + e.toString(), null);
  }
}
