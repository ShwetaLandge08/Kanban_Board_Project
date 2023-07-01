package com.niit.kanban.NotificationService.controller;

import com.niit.kanban.NotificationService.model.User;
import com.niit.kanban.NotificationService.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    private final EmailService emailService;

    @Autowired
    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> sendRegistrationMail(@RequestBody User user) {
        return new ResponseEntity<>(emailService.sendRegistrationMail(user), HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<?> sendUpdateMail(@RequestBody User user) {
        return new ResponseEntity<>(emailService.sendUpdateMail(user), HttpStatus.OK);
    }
    @PostMapping("/delete")
    public ResponseEntity<?> sendAccountDeletedMail(@RequestBody User user) {
        return new ResponseEntity<>(emailService.sendDeletionMail(user), HttpStatus.OK);
    }
}

