package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.AlreadyExistException;
import com.niit.kanban.KanbanService.exception.NotFoundException;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project addProject(Project project) throws AlreadyExistException {
        if (project.getProjectId() != 0 && projectRepository.existsById(project.getProjectId()))
            throw new AlreadyExistException("Project with this ID already present");
        List<Project> projects = projectRepository.findAll();
        int lastId = 0;
        if (!projects.isEmpty()) lastId = ((Project) projects.toArray()[projects.size() - 1]).getProjectId();
        project.setProjectId(lastId + 1);
        project.setStartDate(new Date());
        List<Stage> stages = project.getStages();
        stages.forEach(t -> t.setTasks(new ArrayList<>()));
        return projectRepository.save(project);

    }

    @Override
    public boolean removeProject(int projectId) throws NotFoundException {
        if (!projectRepository.existsById(projectId)) throw new NotFoundException("Project Not Found with this ID");
        projectRepository.deleteById(projectId);
        return true;

    }

    @Override
    public Project updateProject(Project project) throws NotFoundException {
        Optional<Project> optional = projectRepository.findById(project.getProjectId());
        if (optional.isEmpty()) {
            throw new NotFoundException("Project Not Found with this ID");
        }
        Project existingProject = optional.get();
        if (existingProject.getTitle() != null) {
            existingProject.setTitle(project.getTitle());
        }
        if (existingProject.getDescription() != null) {
            existingProject.setDescription(project.getDescription());
        }
        if (existingProject.getDueDate() != null) {
            existingProject.setDueDate(project.getDueDate());
        }
        if (existingProject.getPriority() != null) {
            existingProject.setPriority(project.getPriority());
        }
        return projectRepository.save(existingProject);
    }

    @Override
    public List<Project> getAllProjects() throws NotFoundException {
        List<Project> projects = projectRepository.findAll();
        if (projects.isEmpty()) throw new NotFoundException("Project Not Found with this ID");
        return projects;
    }

    @Override
    public Project getProject(int id) throws NotFoundException {
        return projectRepository.findById(id).orElseThrow(()->new NotFoundException("Project Not Found with this ID"));
    }

    @Override
    public List<Project> getProjectsOfAdmin(User admin) throws NotFoundException {
//        System.out.println(projectRepository.findAllByAdmin(admin));
        return projectRepository.findAllByAdmin(admin).orElseThrow(()->new NotFoundException("Project Not Found with this ID"));
    }

    @Override
    public List<User> getActiveUserOfProject(int projectId) throws NotFoundException {
        if (!projectRepository.existsById(projectId)) throw new NotFoundException("Project Not Found with this ID");
        List<User> users = new ArrayList<>();
        List<Project> getAllProject = projectRepository.findAll();
        for (Project project : getAllProject) {
            List<Stage> stages = project.getStages();
            for (Stage stage : stages) {
                List<Task> tasks = stage.getTasks();
                for (Task task : tasks) {
                    User assignee = task.getAssignee();
                    if (!task.getStatus().equals("Done"))
                        users.add(assignee);
                }
            }
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<User> getAllProjectUser = project.getMembers();
        List<User> activeUsers = new ArrayList<>();
        for (User user : getAllProjectUser) {
            long count = users.stream().filter(user::equals).count();
            System.out.println("user count : " + user.getEmail() + " " + count);
            if (count <= 4) {
                activeUsers.add(user);
            }
        }
        return activeUsers;
    }
}
