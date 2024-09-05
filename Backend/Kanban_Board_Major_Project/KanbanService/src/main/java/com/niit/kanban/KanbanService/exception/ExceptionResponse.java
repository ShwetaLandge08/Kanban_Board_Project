package com.niit.kanban.KanbanService.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@ToString
public class ExceptionResponse {
    private LocalDateTime timeStamp;

    private int status;

    private String error;

    @JsonProperty("friendly_message")
    private String friendlyMessage;

    @JsonProperty("default_message")
    private String defaultMessage;

    private String exceptionType;

    private String path;
}
