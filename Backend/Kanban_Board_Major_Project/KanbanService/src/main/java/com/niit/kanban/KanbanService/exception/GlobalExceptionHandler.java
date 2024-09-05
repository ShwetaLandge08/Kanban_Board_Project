package com.niit.kanban.KanbanService.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponse> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException exception, final HttpServletRequest request){

        exception.printStackTrace();

        ExceptionResponse exceptionResponse = new ExceptionResponse();
        exceptionResponse.setStatus(HttpStatus.BAD_REQUEST.value());
        exceptionResponse.setError(HttpStatus.BAD_REQUEST.name());
        exceptionResponse.setDefaultMessage(exception.getMessage());
        exceptionResponse.setFriendlyMessage("Please Remove invalid charecters from input");
        exceptionResponse.setExceptionType(exception.getClass().getCanonicalName());
        exceptionResponse.setPath(request.getRequestURI());
        exceptionResponse.setTimeStamp(LocalDateTime.now());

        logger.error("Global Exception :: " + exceptionResponse.toString());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionResponse);
    }
}
