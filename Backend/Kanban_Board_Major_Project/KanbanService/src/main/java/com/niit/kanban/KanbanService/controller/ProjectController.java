package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.*;
import com.niit.kanban.KanbanService.service.ProjectService;
import com.niit.kanban.KanbanService.service.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/kanban/project")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    ResponseEntity<?> responseEntity;

    @Autowired
    public ProjectController(ProjectService projectService, UserService userService) {
        this.projectService = projectService;
        this.userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createProject(@RequestBody Project project, HttpServletRequest servletRequest) {
        System.out.println("project before= " + project);
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        try {
            User user = userService.getUser(email);
            project.setAdmin(user);
            project.setStartDate(new Date());
            System.out.println("project after= " + project);
            return new ResponseEntity<>(projectService.addProject(project), HttpStatus.CREATED);
        } catch (ProjectAlreadyExistsException | UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findProject(@PathVariable int id) {
        try {
            return new ResponseEntity<>(projectService.getProject(id), HttpStatus.OK);
        } catch (ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProject(@RequestBody Project project) {
        try {
            return new ResponseEntity<>(projectService.removeProject(project), HttpStatus.OK);
        } catch (ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/projects")
    public ResponseEntity<?> getAllProjects() throws ProjectNotFoundException {
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getProjectsOfAdmin(HttpServletRequest servletRequest) {
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        try {
            User user = userService.getUser(email);
            return new ResponseEntity<>(projectService.getProjectsOfAdmin(user), HttpStatus.OK);
        } catch (UserNotFoundException | ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/userTask")
    public ResponseEntity<?> getAllUserTaskFromAllProject(HttpServletRequest servletRequest) {
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        try {
            User user = userService.getUser(email);
            return new ResponseEntity<>(projectService.getAllUserTaskFromAllProjects(user.getEmail()), HttpStatus.OK);
        } catch (UserNotFoundException | ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/user")
    public ResponseEntity<?> getProjectsOfUser(HttpServletRequest servletRequest) {
        Claims claims = (Claims) servletRequest.getAttribute("claims");
        String email = claims.getSubject();
        try {
            User user = userService.getUser(email);
            return new ResponseEntity<>(projectService.getProjectsOfUsersWhichContainTaskForThatUser(user.getEmail()), HttpStatus.OK);
        } catch (RuntimeException | UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/getAllTask/{projectId}")
    public ResponseEntity<?> getAllProjectTasks(@PathVariable int projectId) throws ProjectNotFoundException {
        return new ResponseEntity<>(projectService.getAllTaskForProject(projectId), HttpStatus.OK);
    }

    @GetMapping("/getMember/{projectId}")
    public ResponseEntity<?> getAllProjectMembers(@PathVariable int projectId) throws ProjectNotFoundException {
        return new ResponseEntity<>(projectService.getMembersOfProjects(projectId), HttpStatus.OK);
    }

//    @GetMapping("/task/{projectId}")
//    public ResponseEntity<?> getTask(@RequestBody int taskId, @PathVariable int projectId) throws ProjectNotFoundException {
//        return new ResponseEntity<>(projectService.getTaskFromProject(taskId, projectId), HttpStatus.OK);
//    }
//
//    @GetMapping("/getAllStages/{projectId}")
//    public ResponseEntity<?> getAllProjectStages(@PathVariable int projectId) throws ProjectNotFoundException {
//        return new ResponseEntity<>(projectService.getAllStages(projectId), HttpStatus.OK);
//    }

    @PostMapping("/addTask/{projectId}")
    public ResponseEntity<?> addTaskInProject(@RequestBody Task task, @PathVariable int projectId) throws ProjectNotFoundException, TaskAlreadyExistsException {
        try {
            System.out.println(task);
            //taskService.addTask(task);
//            stageService.addTaskToStage(task, task.getStatus());
            return new ResponseEntity<>(projectService.addTaskInProject(task, projectId), HttpStatus.CREATED);
        } catch (ProjectNotFoundException | TaskAlreadyExistsException e) {
            throw new RuntimeException(e);

        }
    }

    @PostMapping("/addStage/{projectId}")
    public ResponseEntity<?> addStageForGivenProject(@RequestBody Stage stage, @PathVariable int projectId) {
        try {
            System.out.println(stage);
//            Stage existingStage = stageService.getStageByName(stage.getName());
//            if (existingStage == null) {
//                //System.out.println(stage1);
//                stageService.addStage(stage);
//            }
            responseEntity = new ResponseEntity<>(projectService.addStageForGivenProject(stage, projectId), HttpStatus.CREATED);
        } catch (ProjectNotFoundException ex) {
            throw new RuntimeException(ex);
        }
        return responseEntity;
    }

    @DeleteMapping("/deleteTask/{projectId}")
    public ResponseEntity<?> deleteTaskFromProjectAndStage(@RequestBody Task task, @PathVariable int projectId) {
        try {
            System.out.println(task);
            //taskService.removeTask(task.getTaskId());
//            stageService.deleteTaskFromStage(task.getTaskId(), task.getStatus());
            return new ResponseEntity<>(projectService.deleteTaskFromProjectTaskList(task.getId(), projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/deleteStage/{projectId}")
    public ResponseEntity<?> deleteStageForGivenProject(@RequestBody Stage stage, @PathVariable int projectId) {
        try {
            System.out.println(stage);
            //stageService.removeStage(stage.getName());
            return new ResponseEntity<>(projectService.deleteStageFromProject(stage.getName(), projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException e) {
            throw new RuntimeException(e);

        }
    }
}
