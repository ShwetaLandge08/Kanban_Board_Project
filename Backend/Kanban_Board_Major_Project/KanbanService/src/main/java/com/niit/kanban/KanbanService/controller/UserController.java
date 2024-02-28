package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.UserAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.UserNotFoundException;
import com.niit.kanban.KanbanService.service.UserService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/kanban/user")
public class UserController {
    private final UserService userService;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @CircuitBreaker(name = "service_User", fallbackMethod = "fallbackMethodForUserService")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUser() {
        return new ResponseEntity<>(userService.getAllUser(), HttpStatus.OK);
    }

    @CircuitBreaker(name = "service_User", fallbackMethod = "fallbackMethodForUserService")
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(HttpServletRequest servletRequest, @RequestBody User user) {
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        try {
            return new ResponseEntity<>(userService.updateUser(email, user), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @CircuitBreaker(name = "service_User", fallbackMethod = "fallbackMethodForUserService")
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        try {
            return new ResponseEntity<>(userService.deleteUser(email), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<?> fallbackMethodForUserService(Exception e) {
        System.out.println("User Service is Down");
        String message = "Circuit Breaker is Enabled. The User Service is Down. We will be back. " + new Date();
        return new ResponseEntity<>(message, HttpStatus.SERVICE_UNAVAILABLE);
    }
}
