package com.niit.kanban.UserAuthentication.request;

import lombok.Data;
@Data
public class PasswordUpdateRequest {
        private String email;
        private String currentPassword;
        private String newPassword;
    }

