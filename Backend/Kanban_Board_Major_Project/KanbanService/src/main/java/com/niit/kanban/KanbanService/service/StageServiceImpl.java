package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.exception.AlreadyExistException;
import com.niit.kanban.KanbanService.exception.NotFoundException;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StageServiceImpl implements StageService {

    private final ProjectRepository projectRepository;

    @Autowired
    public StageServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project addStage(int projectId, Stage stage) throws NotFoundException, AlreadyExistException {
        Project project = projectRepository.findById(projectId).orElseThrow(()->new NotFoundException("Project Not Found with this ID"));
        List<Stage> stages = project.getStages();
        if (stages.stream().anyMatch(s -> s.getName().equalsIgnoreCase(stage.getName())))
            throw new AlreadyExistException("This Stage is already present for this Project");
        stage.setTasks(new ArrayList<>());
        stages.add(stage);
        project.setStages(stages);
        return projectRepository.save(project);

    }

    @Override
    public Project deleteStage(String stageName, int projectId) throws NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(()->new NotFoundException("Project Not Found with this ID"));
        List<Stage> stages = project.getStages();
        if (stages.stream().noneMatch(s -> s.getName().equalsIgnoreCase(stageName)))
            throw new NotFoundException("Stage Not Found");
        stages.removeIf(s -> s.getName().equals(stageName));
        project.setStages(stages);
        return projectRepository.save(project);
    }

    @Override
    public Project updateStages(int projectId, List<Stage> stages) throws NotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(()->new NotFoundException("Project Not Found with this ID"));
        stages.forEach(stage -> stage.getTasks().forEach(task -> task.setStatus(stage.getName())));
        project.setStages(stages);
        System.out.println(stages);
        return projectRepository.save(project);
    }
}
