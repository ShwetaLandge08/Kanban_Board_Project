package com.niit.kanban.NotificationService.service;

import com.niit.kanban.NotificationService.dto.KanbanDTO;
import com.niit.kanban.NotificationService.model.Notification;

public interface NotificationService {
    Notification getNotification(String email);

    void saveNotification(KanbanDTO kanbanDto);

}
