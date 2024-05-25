package com.nickesqueda.laceybeesbookinventoryapi.exception;

import java.util.Collection;

public record ErrorResponse(String errorMessage, Collection<?> errorDetails) {}
