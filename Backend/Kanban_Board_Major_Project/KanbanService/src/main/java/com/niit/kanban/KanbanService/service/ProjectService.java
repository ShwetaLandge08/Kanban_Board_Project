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

    List<Project> getProjectsOfAdmin(User admin) throws ProjectNotFoundException;
}
