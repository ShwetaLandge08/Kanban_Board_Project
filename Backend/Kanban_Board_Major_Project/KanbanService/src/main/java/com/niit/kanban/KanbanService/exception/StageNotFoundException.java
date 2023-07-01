package com.niit.kanban.KanbanService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Stage not found")
public class StageNotFoundException extends Exception{
}
