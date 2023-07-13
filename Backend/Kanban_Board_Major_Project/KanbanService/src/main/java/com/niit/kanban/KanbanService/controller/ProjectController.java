package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.*;
import com.niit.kanban.KanbanService.exception.*;
import com.niit.kanban.KanbanService.service.ProjectService;
import com.niit.kanban.KanbanService.service.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kanban/project")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;

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

    @PutMapping("/update")
    public ResponseEntity<?> updateProject(@RequestBody Project project) {
        try {
            return new ResponseEntity<>(projectService.updateProject(project), HttpStatus.OK);
        } catch (ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable int projectId) {
        try {
            return new ResponseEntity<>(projectService.removeProject(projectId), HttpStatus.OK);
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
//            System.out.println(user);
            return new ResponseEntity<>(projectService.getProjectsOfAdmin(user), HttpStatus.OK);
        } catch (UserNotFoundException | ProjectNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getActiveUser/{projectId}")
    public ResponseEntity<?> getActiveUser(@PathVariable int projectId) throws ProjectNotFoundException {
        return new ResponseEntity<>(projectService.getActiveUserOfProject(projectId), HttpStatus.OK);
    }
}
