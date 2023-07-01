package com.niit.kanban.KanbanService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
//@EnableAutoConfiguration
@EnableFeignClients
public class KanbanServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(KanbanServiceApplication.class, args);
	}

}
