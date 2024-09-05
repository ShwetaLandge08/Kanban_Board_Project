package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Comment;
import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.exception.AlreadyExistException;
import com.niit.kanban.KanbanService.exception.NotFoundException;

import java.util.List;

public interface CommentService {
    Project addCommentOnTask(Comment comment, String taskTitle, int projectId, String stageName) throws NotFoundException;

    List<Comment> getAllCommentOnTask(String taskTitle, int projectId, String stageName) throws NotFoundException;
}
