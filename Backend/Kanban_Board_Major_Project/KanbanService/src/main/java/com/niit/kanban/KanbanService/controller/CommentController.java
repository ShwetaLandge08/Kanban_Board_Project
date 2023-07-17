package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.Comment;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.exception.CommentAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.TaskNotFoundException;
import com.niit.kanban.KanbanService.service.CommentService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kanban/comment")
public class CommentController {
    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/comments/{projectId}/{stageName}")
    public ResponseEntity<?> getAllCommentsOnTask(@RequestBody Task task, @PathVariable int projectId,
                                                  @PathVariable String stageName) {
        try {
            return new ResponseEntity<>(commentService.getAllCommentOnTask(task, projectId, stageName), HttpStatus.OK);
        } catch (ProjectNotFoundException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/addComment")
    public ResponseEntity<?> addCommentOnTask(@RequestBody CommentRequest request) {
        try {
            return new ResponseEntity<>(commentService.addCommentOnTask(request.getComment(), request.getTask(), request.getProjectId(),request.getStageName()), HttpStatus.CREATED);
        } catch (ProjectNotFoundException | CommentAlreadyExistsException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

@Getter
class CommentRequest {
    private Comment comment;
    private Task task;
    private String stageName;
    private int projectId;
}
