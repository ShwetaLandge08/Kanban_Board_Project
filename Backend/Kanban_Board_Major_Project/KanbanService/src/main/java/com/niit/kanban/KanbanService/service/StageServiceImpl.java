package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.StageAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.StageNotFoundException;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class StageServiceImpl implements StageService {

    private final ProjectRepository projectRepository;

    @Autowired
    public StageServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project addStage(int projectId, Stage stage) throws ProjectNotFoundException, StageAlreadyExistsException {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        List<Stage> stages = project.getStages();
        if (stages.stream().anyMatch(s -> s.getName().equalsIgnoreCase(stage.getName())))
            throw new StageAlreadyExistsException();
//        int lastId = 0;
//        if (!stages.isEmpty())
//            lastId = ((Stage) stages.toArray()[stages.size() - 1]).getId();
//        stage.setId(lastId + 1);
        stages.add(stage);
        project.setStages(stages);
        return projectRepository.save(project);

    }

    @Override
    public Project deleteStage(Stage stage, int projectId) throws ProjectNotFoundException, StageNotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        List<Stage> stages = project.getStages();
        if (stages.stream().noneMatch(s -> s.getName().equalsIgnoreCase(stage.getName())))
            throw new StageNotFoundException();
        stages.remove(stage);
        project.setStages(stages);
        return projectRepository.save(project);
    }
}
