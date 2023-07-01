package com.niit.kanban.KanbanService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Duplicate comment")
public class CommentAlreadyExistsException extends Exception{
}

