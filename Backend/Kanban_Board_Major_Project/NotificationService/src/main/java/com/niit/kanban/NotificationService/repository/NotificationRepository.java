package com.niit.kanban.NotificationService.repository;

import com.niit.kanban.NotificationService.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
}

