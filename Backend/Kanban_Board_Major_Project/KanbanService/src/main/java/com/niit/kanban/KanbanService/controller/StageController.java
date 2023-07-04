package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.StageAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.StageNotFoundException;
import com.niit.kanban.KanbanService.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/kanban/stage")
public class StageController {
    private final StageService stageService;
    ResponseEntity<?> responseEntity;

    @Autowired
    public StageController(StageService stageService) {
        this.stageService = stageService;
    }

    @PutMapping("/addStage/{projectId}")
    public ResponseEntity<?> addStageForGivenProject(@RequestBody Stage stage, @PathVariable int projectId) {
        try {
            System.out.println(stage);

            responseEntity = new ResponseEntity<>(stageService.addStage(projectId,stage), HttpStatus.CREATED);
        } catch (ProjectNotFoundException | StageAlreadyExistsException ex) {
            throw new RuntimeException(ex);
        }
        return responseEntity;
    }

    @PutMapping("/deleteStage/{projectId}")
    public ResponseEntity<?> deleteStageForGivenProject(@RequestBody Stage stage, @PathVariable int projectId) {
        try {
            System.out.println(stage);
            return new ResponseEntity<>(stageService.deleteStage(stage, projectId), HttpStatus.OK);
        } catch (ProjectNotFoundException | StageNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
