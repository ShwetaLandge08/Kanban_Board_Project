package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.UserAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.UserNotFoundException;
import com.niit.kanban.KanbanService.service.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kanban/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
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

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(HttpServletRequest servletRequest) {
        System.out.println("servletRequest = " + servletRequest);
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        System.out.println("email = " + email);
        try {
            return new ResponseEntity<>(userService.deleteUser(email),HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

}
