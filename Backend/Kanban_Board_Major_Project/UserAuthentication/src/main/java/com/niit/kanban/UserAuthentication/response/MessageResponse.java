package com.niit.kanban.UserAuthentication.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageResponse {
    private String status;
    private String message;
    private LocalDateTime timeStamp;
}
