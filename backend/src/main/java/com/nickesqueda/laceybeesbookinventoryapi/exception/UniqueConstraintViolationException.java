package com.nickesqueda.laceybeesbookinventoryapi.exception;

public class UniqueConstraintViolationException extends ApplicationException {

  public UniqueConstraintViolationException(
      Class<?> entityClass, String fieldName, Object fieldValue) {

    super(
        entityClass.getSimpleName()
            + " with "
            + fieldName
            + " '"
            + fieldValue
            + "' already exists. Value must be unique.");
  }
}
