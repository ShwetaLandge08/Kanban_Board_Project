package com.niit.kanban.NotificationService.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageConfig {
    @Bean
    public DirectExchange getDirectExchange() {
        return new DirectExchange("user-kanban-exchange");
    }

    @Bean
    public Queue getQueue() {
        return new Queue("user-kanban-queue");
    }

    @Bean
    public Jackson2JsonMessageConverter getJackson2JsonMessageConvertor() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Binding getBinding() {
        return BindingBuilder.bind(getQueue()).to(getDirectExchange()).with("kanban_routing");
    }
}