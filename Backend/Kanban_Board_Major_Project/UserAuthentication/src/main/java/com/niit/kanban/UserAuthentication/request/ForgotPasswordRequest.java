package com.niit.kanban.UserAuthentication.request;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private Long otp;
    private String email;
    private String password;
}