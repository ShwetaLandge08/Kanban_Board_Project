package com.niit.kanban.NotificationService.service;

import com.niit.kanban.NotificationService.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Value("${spring.mail.username}")
    private String sender;
    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public SimpleMailMessage sendRegistrationMail(User user) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(user.getEmail());
        mailMessage.setText("Dear " + user.getName() + ",\n\nWelcome to the Kanban Board. Enjoy your time here and manage your task with ease." +
                "\n\nRegards\nKanban Board Team");
        mailMessage.setSubject("Welcome to the Kanban Board");

        javaMailSender.send(mailMessage);
        return mailMessage;
    }

    @Override
    public SimpleMailMessage sendUpdateMail(User user) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(user.getEmail());
        mailMessage.setText("Dear " + user.getName() + ",\n\nAs per your request we have made the required changes on your profile." +
                "\n\nRegards\nKanban Board Team");
        mailMessage.setSubject("Account Updated Successfully");
        javaMailSender.send(mailMessage);
        return mailMessage;
    }

    @Override
    public SimpleMailMessage sendTaskAssignMail(User user) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(user.getEmail());
        mailMessage.setText("Dear " + user.getName() + ",\n\nOne task is Assigned to you.\n" +
                "Please Login to your Kanban dashboard and check." +
                "\n\nRegards\nKanban Board Team");
        mailMessage.setSubject("Task is Assign to You!");
        javaMailSender.send(mailMessage);
        return mailMessage;
    }

    @Override
    public SimpleMailMessage sendDeletionMail(User user) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(sender);
        mailMessage.setTo(user.getEmail());
        mailMessage.setText("Dear " + user.getName() + ", \n\nAs per your request we have deleted your account from our service." +
                "\nIf you want to enjoy our services again, you have to start fresh." +
                "\n\nRegards\nKanban Board Team");
        mailMessage.setSubject("Account Deleted Successfully");
        javaMailSender.send(mailMessage);
        return mailMessage;
    }
}
