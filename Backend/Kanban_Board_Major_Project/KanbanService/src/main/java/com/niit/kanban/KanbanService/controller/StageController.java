package com.niit.kanban.KanbanService.controller;

import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.exception.AlreadyExistException;
import com.niit.kanban.KanbanService.exception.NotFoundException;
import com.niit.kanban.KanbanService.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            responseEntity = new ResponseEntity<>(stageService.addStage(projectId, stage), HttpStatus.CREATED);
        } catch (NotFoundException | AlreadyExistException ex) {
            throw new RuntimeException(ex);
        }
        return responseEntity;
    }

    @PutMapping("/deleteStage/{projectId}/{stageName}")
    public ResponseEntity<?> deleteStageForGivenProject(@PathVariable String stageName, @PathVariable int projectId) {
        try {
            System.out.println(stageName);
            return new ResponseEntity<>(stageService.deleteStage(stageName, projectId), HttpStatus.OK);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStages(@PathVariable int id, @RequestBody List<Stage> stages) {
        try {
            System.out.println(stages);
            return new ResponseEntity<>(stageService.updateStages(id, stages), HttpStatus.OK);
        } catch (NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
