package com.niit.kanban.UserAuthentication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "User already exists in database")
public class UserAlreadyExistException extends Exception{
}
