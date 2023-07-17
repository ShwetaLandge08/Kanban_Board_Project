package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.*;
import com.niit.kanban.KanbanService.exception.*;
import com.niit.kanban.KanbanService.proxy.EmailProxy;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import com.niit.kanban.KanbanService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final EmailProxy emailProxy;

    @Autowired
    public TaskServiceImpl(ProjectRepository projectRepository, UserRepository userRepository, EmailProxy emailProxy) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.emailProxy = emailProxy;
    }

    @Override
    public Project addTaskToStage(int projectId, String stageName, Task task) throws ProjectNotFoundException, StageNotFoundException, TaskAlreadyExistsException {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        Stage stage = project.getStages().stream().filter(s -> s.getName().equals(stageName)).findFirst().orElseThrow(StageNotFoundException::new);
        List<Task> tasks = stage.getTasks();
        if (tasks == null) tasks = new ArrayList<>();
//        int lastId = 0;
//        if (!tasks.isEmpty()) lastId = ((Task) tasks.toArray()[tasks.size() - 1]).getId();
//        task.setId(lastId + 1);
        tasks.add(task);
        stage.setTasks(tasks);
        emailProxy.sendTaskAssignedMail(task.getAssignee());
        System.out.println("project = " + project);
        return projectRepository.save(project);
    }

    @Override
    public List<Task> getAllTaskForProject(int projectId) throws ProjectNotFoundException, TaskNotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        List<Stage> stages = project.getStages();
        List<Task> tasks = new ArrayList<>();
        for (Stage stage : stages) {
            List<Task> tasks1 = stage.getTasks();
            if (tasks1 == null) tasks1 = new ArrayList<>();
            tasks.addAll(tasks1);
        }
        return tasks;
    }

    @Override
    public List<Task> getAllUserTaskFromAllProjects(String email) throws UserNotFoundException, TaskNotFoundException {
        userRepository.findById(email).orElseThrow(UserNotFoundException::new);
        List<Project> getAllProject = projectRepository.findAll();
        List<Task> myTask = new ArrayList<>();
        for (Project project : getAllProject) {
            List<Stage> stages = project.getStages();
            for (Stage stage : stages) {
                List<Task> tasks = stage.getTasks();
                if (tasks == null) break;
                for (Task task : tasks) {
                    if (task.getAssignee().getEmail().equals(email)) {
                        myTask.add(task);
                    }
                }
            }
        }
        return myTask;
    }

    @Override
    public List<Project> getProjectsOfUsersWhichContainTaskForThatUser(String email) throws UserNotFoundException {
        userRepository.findById(email).orElseThrow(UserNotFoundException::new);
        List<Project> allProjectList = projectRepository.findAll();
        List<Project> userProject = new ArrayList<>();
        for (Project project : allProjectList) {
            List<Stage> stages = project.getStages();
            int count = 0;
            for (Stage stage : stages) {
                List<Task> tasks = stage.getTasks();
                //System.out.println(count);
                if (tasks == null) break;
                else {
                    for (Task task : tasks) {
                        if ((task.getAssignee().getEmail()).equals(email)) {
                            //System.out.println(project);
                            count++;
                        }
                    }
                }
            }
            if (count > 0) {
                userProject.add(project);
            }
        }
        return userProject;
    }

    @Override
    public Project deleteTask(Task task, String stageName, int projectId) throws ProjectNotFoundException, TaskNotFoundException {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectNotFoundException::new);
        List<Stage> stages = project.getStages();
        for (Stage stage : stages) {
            if (stage.getName().equals(stageName)) {
                List<Task> tasks = stage.getTasks();
                if (tasks.stream().noneMatch(s -> s.equals(task))) throw new TaskNotFoundException();
                tasks.removeIf(s -> s.equals(task));
                stage.setTasks(tasks);
            }
        }
        project.setStages(stages);
        return projectRepository.save(project);
    }
}
