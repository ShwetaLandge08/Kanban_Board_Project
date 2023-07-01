package com.niit.kanban.KanbanService.repository;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends MongoRepository<Project, Integer> {
    Optional<List<Project>> findAllByAdmin(User admin);
    Project findByProjectId(int id);
}

