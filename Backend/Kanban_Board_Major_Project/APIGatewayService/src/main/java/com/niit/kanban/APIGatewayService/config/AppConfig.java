package com.niit.kanban.APIGatewayService.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/api/auth/**")// for user auth service
                        .uri("http://localhost:8085/"))
                        //.uri("lb://UserAuthenticationService"))
                .route(p -> p
                        .path("/api/kanban/**") //for Kanban Service user
                        .uri("http://localhost:8081/"))
                        //.uri("lb://kanban-board-service"))
                .build();
    }
}
