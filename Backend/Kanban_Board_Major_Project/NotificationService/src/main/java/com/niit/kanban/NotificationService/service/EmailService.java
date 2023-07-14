package com.niit.kanban.NotificationService.service;

import com.niit.kanban.NotificationService.model.User;
import org.springframework.mail.SimpleMailMessage;

public interface EmailService {
    SimpleMailMessage sendRegistrationMail(User user);
    SimpleMailMessage sendUpdateMail(User user);
    SimpleMailMessage sendTaskAssignMail(User user);
    SimpleMailMessage sendDeletionMail(User user);
}
