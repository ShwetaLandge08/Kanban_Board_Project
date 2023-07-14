package com.niit.kanban.KanbanService.proxy;

import com.niit.kanban.KanbanService.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service", url = "localhost:8088")
public interface EmailProxy {
    @PostMapping("/api/email/register")
    ResponseEntity<?> sendRegistrationMail(@RequestBody User user);
    @PostMapping("/api/email/update")
    ResponseEntity<?> sendUpdateMail(@RequestBody User user);
    @PostMapping("/api/email/delete")
    ResponseEntity<?> sendDeletionMail(@RequestBody User user);
    @PostMapping("/api/email/task")
    ResponseEntity<?> sendTaskAssignedMail(@RequestBody User user);
}

