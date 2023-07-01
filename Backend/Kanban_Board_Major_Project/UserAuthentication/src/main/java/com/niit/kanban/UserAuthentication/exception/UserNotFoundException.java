package com.niit.kanban.UserAuthentication.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Invalid credentials! Please try again")
public class UserNotFoundException extends Exception{
}
