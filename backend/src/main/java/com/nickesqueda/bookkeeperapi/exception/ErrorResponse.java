package com.nickesqueda.bookkeeperapi.exception;

import java.util.Collection;

public record ErrorResponse(String errorMessage, Collection<?> errorDetails) {}
