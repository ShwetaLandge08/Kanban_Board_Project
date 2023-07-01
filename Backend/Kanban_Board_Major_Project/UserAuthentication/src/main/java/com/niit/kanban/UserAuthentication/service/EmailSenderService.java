package com.niit.kanban.UserAuthentication.service;

import com.niit.kanban.UserAuthentication.domain.EmailDetails;

public interface EmailSenderService {
    void sendEmail(EmailDetails details);
}
