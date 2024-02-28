package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/kanban")
public class HealthController {
    @Autowired
    private UserServiceImpl service;

    @GetMapping("/health")
    public String health() {
        System.out.println("Service is healthy");
        return "Service is healthy";
    }

    @GetMapping("/circuitbreaker")
    public String circuitBreakerState() {
        return "Circuit Breaker State: " + service.circuitBreakerState();
    }
}
