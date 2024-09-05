package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.*;
import com.niit.kanban.KanbanService.exception.*;

import java.util.List;

public interface ProjectService {
    Project addProject(Project project) throws AlreadyExistException;

    boolean removeProject(int projectId) throws NotFoundException;

    Project updateProject(Project project) throws NotFoundException;

    List<Project> getAllProjects() throws NotFoundException;

    Project getProject(int id) throws NotFoundException;

    List<Project> getProjectsOfAdmin(User admin) throws NotFoundException;

    List<User> getActiveUserOfProject(int projectId) throws NotFoundException;
}
