package com.niit.kanban.UserAuthentication.controller;

import com.niit.kanban.UserAuthentication.domain.EmailDetails;
import com.niit.kanban.UserAuthentication.domain.User;
import com.niit.kanban.UserAuthentication.exception.UserAlreadyExistException;
import com.niit.kanban.UserAuthentication.exception.UserNotFoundException;
import com.niit.kanban.UserAuthentication.security.JwtSecurityTokenGenerator;
import com.niit.kanban.UserAuthentication.service.EmailSenderService;
import com.niit.kanban.UserAuthentication.service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class UserController {
    private ResponseEntity<?> responseEntity;
    private final UserService userService;
    private final EmailSenderService senderService;
    private final JwtSecurityTokenGenerator jwtSecurityTokenGenerator;

    @Autowired
    public UserController(UserService userService, EmailSenderService senderService,
                          JwtSecurityTokenGenerator jwtSecurityTokenGenerator) {
        this.userService = userService;
        this.senderService = senderService;
        this.jwtSecurityTokenGenerator = jwtSecurityTokenGenerator;
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        try {
            responseEntity = new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
        } catch (UserAlreadyExistException e) {
            throw new RuntimeException(e);
        }
        return responseEntity;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) throws UserNotFoundException {
        Map<String, String> map;
        try {
            User loggedInUser = userService.findUser(user.getEmail(), user.getPassword());
            map = jwtSecurityTokenGenerator.generateToken(loggedInUser);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

//    @DeleteMapping("/delete")
//    public ResponseEntity<?> deleteUser(@RequestBody String email) {
//        try {
//            return new ResponseEntity<>(userService.deleteUser(email), HttpStatus.OK);
//        } catch (UserNotFoundException e) {
//            throw new RuntimeException(e);
//        }
//    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserInfo(@RequestBody User user) {
        try {
            return new ResponseEntity<>(userService.updateUserInfo(user), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<?> updateUserPassword(@RequestBody PasswordUpdateRequest request) {
        try {
            String body = "Dear User, \n\nYour password is updated Successfully." +
                    "\nRegards" +
                    "\nKanban Team";
            String subject = "Password Update";
            EmailDetails details = new EmailDetails();
            details.setRecipient(request.getEmail());
            details.setMsgBody(body);
            details.setSubject(subject);
            senderService.sendEmail(details);
            System.out.println("Mail Sent");
            return new ResponseEntity<>(userService.updateUserPassword(request.getEmail(),
                    request.getCurrentPassword(), request.getNewPassword()), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

@Getter
class PasswordUpdateRequest {
    private String email;
    private String currentPassword;
    private String newPassword;
}
