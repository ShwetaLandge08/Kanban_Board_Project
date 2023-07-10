package com.niit.kanban.UserAuthentication.service;

import com.niit.kanban.UserAuthentication.domain.User;
import com.niit.kanban.UserAuthentication.exception.UserAlreadyExistException;
import com.niit.kanban.UserAuthentication.exception.UserNotFoundException;

public interface UserService {
    User saveUser(User user) throws UserAlreadyExistException;

    User findUser(String email, String password) throws UserNotFoundException;

    //boolean deleteUser(String email) throws UserNotFoundException;

    User updateUserInfo(User user) throws UserNotFoundException;

    User updateUserPassword(String email, String currentPassword, String newPassword) throws UserNotFoundException;
}
