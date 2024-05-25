package com.nickesqueda.laceybeesbookinventoryapi.exception;

public class ResourceNotFoundException extends ApplicationException {
  public ResourceNotFoundException(Class<?> entityClass, int entityId) {
    super("Resource not found: " + entityClass.getSimpleName() + " #" + entityId);
  }
}
