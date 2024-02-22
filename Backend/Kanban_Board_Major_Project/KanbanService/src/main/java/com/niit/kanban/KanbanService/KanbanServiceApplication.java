package com.niit.kanban.KanbanService;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
//@EnableAutoConfiguration
@EnableFeignClients
public class KanbanServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(KanbanServiceApplication.class, args);
	}

}
