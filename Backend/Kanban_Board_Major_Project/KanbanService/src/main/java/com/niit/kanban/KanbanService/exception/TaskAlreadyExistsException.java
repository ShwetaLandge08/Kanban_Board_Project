package com.niit.kanban.KanbanService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Task Exists.")
public class TaskAlreadyExistsException extends Exception{
}
