package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.exception.AlreadyExistException;
import com.niit.kanban.KanbanService.exception.NotFoundException;

import java.util.List;

public interface StageService {
    Project addStage(int projectId, Stage stage) throws NotFoundException, AlreadyExistException;
    Project deleteStage(String stageName, int projectId) throws NotFoundException;
    Project updateStages(int projectId, List<Stage> stages) throws NotFoundException;
}
