package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.AlreadyExistException;
import com.niit.kanban.KanbanService.exception.NotFoundException;

import java.util.List;

public interface TaskService {
    Project addTaskToStage(int projectId, String stageName, Task task) throws NotFoundException;

    List<Task> getAllTaskForProject(int projectId) throws NotFoundException;

    List<Task> getAllUserTaskFromAllProjects(String email) throws NotFoundException;

    List<Project> getProjectsOfUsersWhichContainTaskForThatUser(String email) throws NotFoundException;

    Task updateAssigneeOfTask(String taskTitle, User assignee) throws NotFoundException;

    Project deleteTask(String taskTitle, String stageName, int projectId) throws NotFoundException;
}
