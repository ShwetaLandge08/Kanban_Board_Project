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

    @GetMapping("/comments/{projectId}/{stageName}/{taskTitle}")
    public ResponseEntity<?> getAllCommentsOnTask(@PathVariable int projectId,
                                                  @PathVariable String stageName, @PathVariable String taskTitle) {
        try {
            return new ResponseEntity<>(commentService.getAllCommentOnTask(taskTitle, projectId, stageName), HttpStatus.OK);
        } catch (ProjectNotFoundException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/addComment/{projectId}/{stageName}/{taskTitle}")
    public ResponseEntity<?> addCommentOnTask(@RequestBody Comment comment, @PathVariable String taskTitle, @PathVariable int projectId, @PathVariable String stageName) {
        try {
            return new ResponseEntity<>(commentService.addCommentOnTask(comment, taskTitle, projectId, stageName), HttpStatus.CREATED);
        } catch (ProjectNotFoundException | CommentAlreadyExistsException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}