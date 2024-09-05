package com.niit.kanban.KanbanService.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    private Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<ExceptionResponse> handleNotFoundException(
            NotFoundException not, final HttpServletRequest request) {

        ExceptionResponse errorResponse = new ExceptionResponse();
        String statusMessage = HttpStatus.NOT_FOUND.toString();
        errorResponse.setStatus(HttpStatus.NOT_FOUND.value());
        errorResponse.setExceptionType(not.getClass().getName());
        errorResponse.setFriendlyMessage(statusMessage.substring(statusMessage.indexOf(" ") + 1));
        errorResponse.setDefaultMessage(not.getMessage());
        errorResponse.setPath(request.getRequestURI());
        errorResponse.setTimeStamp(LocalDateTime.now());
        logger.error(statusMessage.substring(statusMessage.indexOf(" ") + 1), not);
        //  logger.debug(statusMessage.substring(statusMessage.indexOf(" ") + 1), not);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(AlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<ExceptionResponse> handleAlreadyExistException(
            AlreadyExistException alreadyExistException, final HttpServletRequest request) {

        ExceptionResponse errorResponse = new ExceptionResponse();
        String statusMessage = HttpStatus.CONFLICT.toString();
        errorResponse.setStatus(HttpStatus.CONFLICT.value());
        errorResponse.setExceptionType(alreadyExistException.getClass().getName());
        errorResponse.setFriendlyMessage(statusMessage.substring(statusMessage.indexOf(" ") + 1));
        errorResponse.setDefaultMessage(alreadyExistException.getMessage());
        errorResponse.setPath(request.getRequestURI());
        errorResponse.setTimeStamp(LocalDateTime.now());
        logger.error(statusMessage.substring(statusMessage.indexOf(" ") + 1), alreadyExistException);
        //  logger.debug(statusMessage.substring(statusMessage.indexOf(" ") + 1), userNotFoundException);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
}
