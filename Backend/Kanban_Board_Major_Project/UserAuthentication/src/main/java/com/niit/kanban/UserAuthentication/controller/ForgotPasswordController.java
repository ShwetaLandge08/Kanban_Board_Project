package com.niit.kanban.UserAuthentication.controller;

import com.niit.kanban.UserAuthentication.domain.EmailDetails;
import com.niit.kanban.UserAuthentication.domain.User;
import com.niit.kanban.UserAuthentication.exception.UserNotFoundException;
import com.niit.kanban.UserAuthentication.request.ForgotPasswordRequest;
import com.niit.kanban.UserAuthentication.response.MessageResponse;
import com.niit.kanban.UserAuthentication.service.EmailSenderService;
import com.niit.kanban.UserAuthentication.service.ForgotPasswordService;
import com.niit.kanban.UserAuthentication.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("api/auth/password")
public class ForgotPasswordController {
    private final ForgotPasswordService forgotPasswordService;
    private final EmailSenderService senderService;
    private final UserService userService;

    public ForgotPasswordController(ForgotPasswordService forgotPasswordService, EmailSenderService senderService, UserService userService) {
        this.forgotPasswordService = forgotPasswordService;
        this.senderService = senderService;
        this.userService = userService;
    }

    @PutMapping("/sentOTP/{email}")
    public ResponseEntity<?> sentOTPForForgotUserPassword(@PathVariable String email) {
        try {
            //generate OTP
            Long otp = forgotPasswordService.generateOtp(email);
            System.out.println("Otp generated");

            // Save the OTP to the database
            forgotPasswordService.saveOtp(email, otp);
            System.out.println("Otp saved to database");

            // Email the user with the OTP
            User user = userService.getUser(email);
            EmailDetails details = getEmailDetails(email, user, otp);
            senderService.sendEmail(details);

            MessageResponse response = new MessageResponse();
            response.setStatus("Success");
            String message = "Mail sent successfully";
            response.setMessage(message);
            response.setTimeStamp(LocalDateTime.now());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }

    }

    private static EmailDetails getEmailDetails(String email, User user, Long otp) {
        String content = "Dear " + user.getName() + ", \n\n"
                + "For security reason, you're required to use the following "
                + "One Time Password to login: "
                + otp
                + "\nNote: this OTP is set to expire in 5 minutes."
                + "\n\nRegards"
                + "\nKanban Team";

        String subject = "Here's your One Time Password (OTP) - Expire in 5 minutes !";

        EmailDetails details = new EmailDetails();
        details.setRecipient(email);
        details.setMsgBody(content);
        details.setSubject(subject);
        return details;
    }

    @GetMapping()
    public ResponseEntity<?> getUserByOTP(@RequestBody Long otp) throws UserNotFoundException {
        return new ResponseEntity<>(forgotPasswordService.getUserByOtp(otp), HttpStatus.OK);
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<?> forgotUserPassword(@RequestBody ForgotPasswordRequest request) throws UserNotFoundException {
        return new ResponseEntity<>(forgotPasswordService.forgotPassword(request), HttpStatus.OK);
    }

    @GetMapping("/validate-otp/{otp}")
    public ResponseEntity<?> validateOTP(@PathVariable Long otp) throws UserNotFoundException {
        MessageResponse response = new MessageResponse();
        response.setStatus("Success");
        String message = forgotPasswordService.validateOtp(otp);
        response.setMessage(message);
        response.setTimeStamp(LocalDateTime.now());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}