package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.AlreadyExistException;
import com.niit.kanban.KanbanService.exception.NotFoundException;

import java.util.List;

public interface UserService {
    User saveUser(User user) throws AlreadyExistException;

    List<User> getAllUser();

    User getUser(String email) throws NotFoundException;

    User updateUser(String email, User user) throws NotFoundException;
    boolean deleteUser(String email) throws NotFoundException;

}
