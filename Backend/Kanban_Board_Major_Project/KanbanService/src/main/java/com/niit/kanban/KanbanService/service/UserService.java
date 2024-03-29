package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.UserAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.UserNotFoundException;

import java.util.List;

public interface UserService {
    User saveUser(User user) throws UserAlreadyExistsException;

    List<User> getAllUser();

    User getUser(String email) throws UserNotFoundException;

    User updateUser(String email, User user) throws UserNotFoundException;
    boolean deleteUser(String email) throws UserNotFoundException;

}
