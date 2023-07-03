package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.*;
import com.niit.kanban.KanbanService.exception.*;

import java.util.List;

public interface ProjectService {
    Project addProject(Project project) throws ProjectAlreadyExistsException;

    boolean removeProject(Project project) throws ProjectNotFoundException;
    Project updateProject(Project project) throws ProjectNotFoundException;

    List<Project> getAllProjects() throws ProjectNotFoundException;

    Project getProject(int id) throws ProjectNotFoundException;

    List<User> getMembersOfProjects(int projectId) throws ProjectNotFoundException;

    Project addTaskInProject(Task task, int projectId) throws TaskAlreadyExistsException, ProjectNotFoundException;

    List<Task> getAllTaskForProject(int projectId) throws ProjectNotFoundException;

    Project deleteTaskFromProjectTaskList(int taskId, int projectId) throws ProjectNotFoundException;

    Project addStageForGivenProject(Stage stage, int projectId) throws ProjectNotFoundException;

    //List<Stage> getAllStages(int projectId) throws ProjectNotFoundException;
    Project deleteStageFromProject(String stageName, int projectId) throws ProjectNotFoundException;

    List<Project> getProjectsOfAdmin(User admin) throws ProjectNotFoundException;

    List<Project> getProjectsOfUsersWhichContainTaskForThatUser(String email);

    //Task getTaskFromProject(int taskId,int projectId) throws ProjectNotFoundException;
    List<Task> getAllUserTaskFromAllProjects(String email) throws ProjectNotFoundException;

    Project addCommentOnTask(Comment comment, int taskId, int projectId) throws ProjectNotFoundException;

    List<Comment> getAllCommentOnTask(int taskId, int projectId) throws ProjectNotFoundException;
}
