package com.niit.kanban.KanbanService.config;

import com.niit.kanban.KanbanService.filter.JWTFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public FilterRegistrationBean<JWTFilter> jwtFilterBean() {
        FilterRegistrationBean<JWTFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JWTFilter());
        filterRegistrationBean.addUrlPatterns("/api/kanban/comment/*");
        filterRegistrationBean.addUrlPatterns("/api/kanban/stage/*");
        filterRegistrationBean.addUrlPatterns("/api/kanban/task/*");
        filterRegistrationBean.addUrlPatterns("/api/kanban/project/*");
        //filterRegistrationBean.addUrlPatterns("/api/kanban/team/*");
        filterRegistrationBean.addUrlPatterns("/api/kanban/user/all");
        filterRegistrationBean.addUrlPatterns("/api/kanban/user/email");
        filterRegistrationBean.addUrlPatterns("/api/kanban/user/delete");
        return filterRegistrationBean;
    }
}

