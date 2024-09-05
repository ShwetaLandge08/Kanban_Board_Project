package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.Comment;
import com.niit.kanban.KanbanService.exception.NotFoundException;
import com.niit.kanban.KanbanService.service.CommentService;
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
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/addComment/{projectId}/{stageName}/{taskTitle}")
    public ResponseEntity<?> addCommentOnTask(@RequestBody Comment comment, @PathVariable String taskTitle, @PathVariable int projectId, @PathVariable String stageName) {
        try {
            return new ResponseEntity<>(commentService.addCommentOnTask(comment, taskTitle, projectId, stageName), HttpStatus.CREATED);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}