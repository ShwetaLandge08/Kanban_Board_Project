package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.StageAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.StageNotFoundException;

import java.util.List;

public interface StageService {
    Project addStage(int projectId, Stage stage) throws ProjectNotFoundException, StageAlreadyExistsException;
    Project deleteStage(Stage stage, int projectId) throws ProjectNotFoundException, StageNotFoundException;
    //List<Stage> getAllStages(int projectId) throws ProjectNotFoundException;
}
