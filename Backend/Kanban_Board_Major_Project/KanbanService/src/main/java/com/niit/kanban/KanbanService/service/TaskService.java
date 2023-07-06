package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.exception.*;

import java.util.List;

public interface TaskService {
    Project addTaskToStage(int projectId, String stageName, Task task) throws ProjectNotFoundException, StageNotFoundException, TaskAlreadyExistsException;

    List<Task> getAllTaskForProject(int projectId) throws ProjectNotFoundException, TaskNotFoundException;

    List<Task> getAllUserTaskFromAllProjects(String email) throws UserNotFoundException, TaskNotFoundException;

    List<Project> getProjectsOfUsersWhichContainTaskForThatUser(String email) throws UserNotFoundException;

    Project deleteTaskFromProjectTaskList(Task task, int projectId) throws ProjectNotFoundException, TaskNotFoundException;

    Project updateStatusOfTask(int taskId, int projectId, String stageName, String status) throws ProjectNotFoundException;
}
