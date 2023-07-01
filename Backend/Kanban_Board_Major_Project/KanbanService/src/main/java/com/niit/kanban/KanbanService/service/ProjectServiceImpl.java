package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.*;
import com.niit.kanban.KanbanService.exception.*;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project addProject(Project project) throws ProjectAlreadyExistsException {
        if (project.getProjectId() != 0 && projectRepository.existsById(project.getProjectId()))
            throw new ProjectAlreadyExistsException();
        List<Project> projects = projectRepository.findAll();
        int lastId = 0;
        if (!projects.isEmpty())
            lastId = ((Project) projects.toArray()[projects.size() - 1]).getProjectId();
        project.setProjectId(lastId + 1);
        return projectRepository.save(project);

    }

    @Override
    public boolean removeProject(Project project) throws ProjectNotFoundException {
        if (!projectRepository.existsById(project.getProjectId()))
            throw new ProjectNotFoundException();
        projectRepository.delete(project);
        return true;

    }

    @Override
    public List<Project> getAllProjects() throws ProjectNotFoundException {
        List<Project> projects = projectRepository.findAll();
        if (projects.isEmpty())
            throw new ProjectNotFoundException();
        return projects;
    }

    @Override
    public Project getProject(int id) throws ProjectNotFoundException {
        return projectRepository.findById(id).orElseThrow(ProjectNotFoundException::new);
    }

    @Override
    public List<User> getMembersOfProjects(int projectId) throws ProjectNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        return project.getMembers();
    }

    @Override
    public Project addTaskInProject(Task task, int projectId) throws ProjectNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Task> getAllTask = project.getTasks();
        int lastId = 0;
        if (project.getTasks() == null) {
            task.setId(lastId + 1);
            project.setTasks(Arrays.asList(task));
        } else {
            List<Task> tasks = project.getTasks();
            lastId = ((Task) getAllTask.toArray()[getAllTask.size() - 1]).getId();
            task.setId(lastId + 1);
            tasks.add(task);
            project.setTasks(tasks);
        }
        return projectRepository.save(project);
    }

    @Override
    public List<Task> getAllTaskForProject(int projectId) throws ProjectNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        return project.getTasks();
    }

    @Override
    public Project deleteTaskFromProjectTaskList(int taskId, int projectId) throws ProjectNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Task> taskList = project.getTasks();
        taskList.removeIf(task -> task.getId() == taskId);
        project.setTasks(taskList);
        return projectRepository.save(project);
    }

    @Override
    public Project addStageForGivenProject(Stage stage, int projectId) throws ProjectNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        if (project.getStages() == null) {
            project.setStages(Arrays.asList(stage));
        } else {
            List<Stage> stages = project.getStages();
            stages.add(stage);
            project.setStages(stages);
        }
        return projectRepository.save(project);
    }

//    @Override
//    public List<Stage> getAllStages(int projectId) throws ProjectNotFoundException {
//        if (projectRepository.findById(projectId).isEmpty()) {
//            throw new ProjectNotFoundException();
//        }
//        Project project = projectRepository.findByProjectId(projectId);
//        return project.getStages();
//    }

    @Override
    public Project deleteStageFromProject(String stageName, int projectId) throws ProjectNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Stage> stageList = project.getStages();
        stageList.removeIf(stage -> Objects.equals(stage.getName(), stageName));
        project.setStages(stageList);
        return projectRepository.save(project);
    }

    @Override
    public List<Project> getProjectsOfAdmin(User admin) throws ProjectNotFoundException {
        return projectRepository.findAllByAdmin(admin).orElseThrow(ProjectNotFoundException::new);
    }

    @Override
    public List<Project> getProjectsOfUsersWhichContainTaskForThatUser(String email) {
        List<Project> allProjectList = projectRepository.findAll();
        List<Project> userProject = new ArrayList<>();
        for (Project project : allProjectList) {

            List<Task> getTaskList = project.getTasks();
            int count = 0;
            if (getTaskList == null)
                throw new RuntimeException("No task Available for you");
            else {
                for (Task task : getTaskList) {
                    if ((task.getAssignee().getEmail()).equals(email)) {
                        System.out.println(project);
                        count++;
                    }
                }
                if (count > 0) {
                    userProject.add(project);
                }
            }
        }
        return userProject;
    }

    @Override
    public List<Task> getAllUserTaskFromAllProjects(String email) throws ProjectNotFoundException {
        List<Project> getAllProject = getAllProjects();
        List<Task> myTask = new ArrayList<>();
        for (Project project : getAllProject) {
            List<Task> tasks = project.getTasks();
            for (Task task : tasks) {
                if (task.getAssignee().getEmail().equals(email)) {
                    myTask.add(task);
                }
            }
        }
        return myTask;
    }

    @Override
    public Project addCommentOnTask(Comment comment, int taskId, int projectId) throws ProjectNotFoundException {
        if (projectRepository.findById(projectId).isEmpty()) {
            throw new ProjectNotFoundException();
        }
        Project project = projectRepository.findByProjectId(projectId);
        List<Task> getAllTask = project.getTasks();
        for (Task task1 : getAllTask) {
            int lastId = 0;
            if (task1.getId() == taskId) {
                if (task1.getComments() == null) {
                    comment.setId(lastId + 1);
                    task1.setComments(Arrays.asList(comment));
                } else {
                    List<Comment> comments = task1.getComments();
                    lastId = ((Comment) comments.toArray()[comments.size() - 1]).getId();
                    comment.setId(lastId + 1);
                    comments.add(comment);
                    task1.setComments(comments);
                }
            }
        }
        return projectRepository.save(project);
    }

    @Override
    public List<Comment> getAllCommentOnTask(int taskId, int projectId) throws ProjectNotFoundException {
        List<Project> getAllProject = getAllProjects();
        List<Comment> myComments = new ArrayList<>();
        for (Project project : getAllProject) {
            List<Task> tasks = project.getTasks();
            for (Task task : tasks) {
                if (task.getId() == taskId) {
                    myComments = task.getComments();
                }
            }
        }
        return myComments;
    }

//    @Override
//    public Task getTaskFromProject(int taskId, int projectId) throws ProjectNotFoundException {
//        Task myTask = null;
//        if (projectRepository.findById(projectId).isEmpty()) {
//            throw new ProjectNotFoundException();
//        }
//        Project project = projectRepository.findByProjectId(projectId);
//        List<Task> taskList = project.getTasks();
//        for (Task task : taskList) {
//            if (task.getId() == (taskId)) {
//                myTask = task;
//            }
//        }
//        return myTask;
//    }
}
