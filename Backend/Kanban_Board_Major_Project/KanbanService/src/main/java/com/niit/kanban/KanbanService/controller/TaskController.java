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

    @DeleteMapping("/deleteTask/{projectId}")
    public ResponseEntity<?> deleteTaskFromProjectAndStage(@RequestBody Task task, @PathVariable int projectId) {
        try {
            System.out.println(task);

            return new ResponseEntity<>(taskService.deleteTaskFromProjectTaskList(task, projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException | TaskNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @PutMapping("/update/{projectId}/{stageName}/{taskId}")
    public ResponseEntity<?> updateStatusOfTask(@PathVariable int projectId, @PathVariable int taskId,
                                          @PathVariable String stageName, @RequestBody String status) {
        try {
            System.out.println("projectid => " + projectId +"taskId=> " +taskId + "stagename=>" +stageName
            + "status=> "+status);
            return new ResponseEntity<>(taskService.updateStatusOfTask(taskId,projectId,stageName,status), HttpStatus.OK);
        } catch (ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}



