package com.nickesqueda.laceybeesbookinventoryapi.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {
  @Pointcut(
      "execution(* com.nickesqueda.laceybeesbookinventoryapi..*(..))")
  public void allPackagesAllMethods() {}

  @Pointcut("execution(* com.nickesqueda.laceybeesbookinventoryapi.controller.*.*(..))")
  public void allControllerMethods() {}

  @Pointcut("execution(* com.nickesqueda.laceybeesbookinventoryapi.service.*.*(..))")
  public void allServiceMethods() {}

  @Before("allControllerMethods()")
  public void logMethodCallsInfoMode(JoinPoint joinPoint) {
    String methodName = joinPoint.getSignature().toShortString();
    Object[] methodArgs = joinPoint.getArgs();
    log.info("START REQUEST: {} with arguments: {}", methodName, methodArgs);
  }

  @Before("allPackagesAllMethods()")
  public void logMethodCallsTraceMode(JoinPoint joinPoint) {
    String methodName = joinPoint.getSignature().toShortString();
    Object[] methodArgs = joinPoint.getArgs();
    log.trace("Calling {} with arguments: {}", methodName, methodArgs);
  }

  @AfterReturning(
      pointcut = "allControllerMethods()",
      returning = "returnValue")
  public void logMethodReturnInfoMode(JoinPoint joinPoint, Object returnValue) {
    String methodName = joinPoint.getSignature().toShortString();
    String logMessage = "END REQUEST: {} with return value: {}";
    log.info(logMessage, methodName, returnValue);
  }

  @AfterReturning(pointcut = "allPackagesAllMethods()", returning = "returnValue")
  public void logMethodReturnDebugMode(JoinPoint joinPoint, Object returnValue) {
    String methodName = joinPoint.getSignature().toShortString();
    log.debug("Returning from {} with value: {}", methodName, returnValue);
  }

  @AfterThrowing(pointcut = "allPackagesAllMethods()", throwing = "e")
  public void logMethodException(JoinPoint joinPoint, Exception e) {
    String methodName = joinPoint.getSignature().toShortString();
    Object[] methodArgs = joinPoint.getArgs();
    if (log.isDebugEnabled()) {
      log.debug("Exception in {} :: Method args: {} :: ", methodName, methodArgs, e);
    } else {
      log.error("Exception in {} :: {}", methodName, e.toString());
    }
  }
}
