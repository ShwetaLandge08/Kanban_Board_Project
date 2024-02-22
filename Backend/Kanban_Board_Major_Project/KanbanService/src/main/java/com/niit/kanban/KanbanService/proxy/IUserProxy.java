package com.niit.kanban.KanbanService.proxy;

import com.niit.kanban.KanbanService.domain.User;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "UserAuthenticationService", url = "localhost:8085")
public interface IUserProxy {
    @CircuitBreaker(name="registerAPI")
    @PostMapping("/api/auth/register")
    ResponseEntity<?> saveUser(@RequestBody User user);

    @PutMapping("/api/auth/update")
    ResponseEntity<?> updateUser(@RequestBody User user);

    @DeleteMapping("/api/auth/delete/{email}")
    ResponseEntity<?> deleteUser(@PathVariable String email);
}
