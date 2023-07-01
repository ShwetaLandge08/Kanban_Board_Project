package com.niit.kanban.NotificationService.service;

import com.niit.kanban.NotificationService.dto.KanbanDTO;
import com.niit.kanban.NotificationService.model.Notification;
import com.niit.kanban.NotificationService.repository.NotificationRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Notification getNotification(String email) {
        return notificationRepository.findById(email).get();
    }

    @RabbitListener(queues = "user-kanban-queue")
    @Override
    public void saveNotification(KanbanDTO kanbanDto) {
        //object of notification
        Notification notification = new Notification();

        //fetch email from DTO object
        String email = kanbanDto.getJsonObject().get("email").toString();
        if (notificationRepository.findById(email).isEmpty()) {
            notification.setEmail(email);
        }
        notification.setNotificationMessage("List of notifications");
        notification.setJsonObject(kanbanDto.getJsonObject());
        notificationRepository.save(notification);
    }
}

