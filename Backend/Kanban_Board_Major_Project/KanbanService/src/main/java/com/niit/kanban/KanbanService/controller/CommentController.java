package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.Comment;
import com.niit.kanban.KanbanService.exception.CommentAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.TaskNotFoundException;
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

    @GetMapping("/comments/{taskId}/{projectId}")
    public ResponseEntity<?> getAllCommentsOnTask(@PathVariable int taskId, @PathVariable int projectId) {
        try {
            return new ResponseEntity<>(commentService.getAllCommentOnTask(taskId, projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/addComment/{taskId}/{projectId}")
    public ResponseEntity<?> createTask(@RequestBody Comment comment, @PathVariable int taskId,
                                        @PathVariable int projectId) {
        try {
//            System.out.println(comment);
//            System.out.println(taskId);
//            System.out.println(projectId);
            return new ResponseEntity<>(commentService.addCommentOnTask(comment, taskId, projectId), HttpStatus.CREATED);
        } catch (ProjectNotFoundException | CommentAlreadyExistsException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}