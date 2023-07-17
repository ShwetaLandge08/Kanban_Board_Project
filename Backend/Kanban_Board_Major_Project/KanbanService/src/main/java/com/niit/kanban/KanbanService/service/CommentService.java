package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Comment;
import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.exception.CommentAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.TaskNotFoundException;

import java.util.List;

public interface CommentService {
    Project addCommentOnTask(Comment comment, Task task, int projectId, String stageName) throws ProjectNotFoundException, CommentAlreadyExistsException, TaskNotFoundException;

    List<Comment> getAllCommentOnTask(Task task, int projectId, String stageName) throws ProjectNotFoundException, TaskNotFoundException;
}
