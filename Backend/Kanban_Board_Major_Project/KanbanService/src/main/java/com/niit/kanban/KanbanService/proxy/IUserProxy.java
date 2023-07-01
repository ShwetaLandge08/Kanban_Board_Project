package com.niit.kanban.KanbanService.proxy;

import com.niit.kanban.KanbanService.domain.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "UserAuthenticationService", url = "localhost:8085")
public interface IUserProxy {
    @PostMapping("/api/auth/register")
    ResponseEntity<?> saveUser(@RequestBody User user);

    @DeleteMapping("/api/auth/delete")
    ResponseEntity<?> deleteUser(@RequestBody String email);
}
