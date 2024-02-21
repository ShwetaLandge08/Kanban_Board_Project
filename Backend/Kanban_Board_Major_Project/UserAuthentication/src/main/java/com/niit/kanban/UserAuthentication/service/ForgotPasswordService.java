package com.niit.kanban.UserAuthentication.service;

import com.niit.kanban.UserAuthentication.domain.User;
import com.niit.kanban.UserAuthentication.exception.UserNotFoundException;
import com.niit.kanban.UserAuthentication.request.ForgotPasswordRequest;

public interface ForgotPasswordService {
    Long generateOtp(String email) throws UserNotFoundException;

    void saveOtp(String email, Long otp) throws UserNotFoundException;

    User forgotPassword(ForgotPasswordRequest request) throws UserNotFoundException;

    User getUserByOtp(Long otp) throws UserNotFoundException;

    String validateOtp(Long otp) throws UserNotFoundException;
}
