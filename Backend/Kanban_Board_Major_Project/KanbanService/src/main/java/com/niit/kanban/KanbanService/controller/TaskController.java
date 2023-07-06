package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.*;
import com.niit.kanban.KanbanService.service.TaskService;
import com.niit.kanban.KanbanService.service.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/kanban/task")
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;

    @Autowired
    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @PutMapping("/{projectId}/{stageName}/add")
    public ResponseEntity<?> createTask(@PathVariable int projectId, @PathVariable String stageName, @RequestBody Task task) {
        try {
            return new ResponseEntity<>(taskService.addTaskToStage(projectId, stageName, task), HttpStatus.CREATED);
        } catch (ProjectNotFoundException | StageNotFoundException | TaskAlreadyExistsException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getAllTask/{projectId}")
    public ResponseEntity<?> getAllProjectTasks(@PathVariable int projectId) throws ProjectNotFoundException, TaskNotFoundException {
        return new ResponseEntity<>(taskService.getAllTaskForProject(projectId), HttpStatus.OK);
    }

    @GetMapping("/userTask")
    public ResponseEntity<?> getAllUserTaskFromAllProject(HttpServletRequest servletRequest) {
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        try {
            User user = userService.getUser(email);
            return new ResponseEntity<>(taskService.getAllUserTaskFromAllProjects(user.getEmail()), HttpStatus.OK);
        } catch (UserNotFoundException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getProjectsOfUser(HttpServletRequest servletRequest) {
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        try {
            User user = userService.getUser(email);
            return new ResponseEntity<>(taskService.getProjectsOfUsersWhichContainTaskForThatUser(user.getEmail()), HttpStatus.OK);

        } catch (RuntimeException | UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/deleteTask/{projectId}/{stageName}/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable int taskId, @PathVariable int projectId,
                                        @PathVariable String stageName) {
        try {
            System.out.println(taskId);

            return new ResponseEntity<>(taskService.deleteTask(taskId, stageName, projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}



