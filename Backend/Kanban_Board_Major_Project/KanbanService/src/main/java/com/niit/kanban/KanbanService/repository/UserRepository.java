package com.niit.kanban.KanbanService.repository;

import com.niit.kanban.KanbanService.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
