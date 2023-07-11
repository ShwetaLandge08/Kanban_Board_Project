package com.niit.kanban.UserAuthentication.service;

import com.niit.kanban.UserAuthentication.domain.User;
import com.niit.kanban.UserAuthentication.exception.UserAlreadyExistException;
import com.niit.kanban.UserAuthentication.exception.UserNotFoundException;
import com.niit.kanban.UserAuthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExistException {
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new UserAlreadyExistException();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User findUser(String email, String password) throws UserNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);
        if (!passwordEncoder.matches(password, user.getPassword()))
            throw new UserNotFoundException();
        return user;
    }

    @Override
    public User updateUserInfo(User user) throws UserNotFoundException {
        Optional<User> optional = userRepository.findByEmail(user.getEmail());
        if (optional.isEmpty()) {
            throw new UserNotFoundException();
        }
        User existingUser = optional.get();
        if (existingUser.getName() != null) {
            existingUser.setName(user.getName());
        }
        if (existingUser.getPhoneNo() != null) {
            existingUser.setPhoneNo(user.getPhoneNo());
        }
        return userRepository.save(existingUser);
    }

    @Override
    public User updateUserPassword(String email, String currentPassword, String newPassword) throws UserNotFoundException {
        Optional<User> optional = userRepository.findByEmail(email);
        if (optional.isEmpty()) {
            throw new UserNotFoundException();
        }
        User existingUser = optional.get();
        boolean isPasswordMatch = passwordEncoder.matches(currentPassword, existingUser.getPassword());
        if (existingUser.getPassword() != null) {
            if (!isPasswordMatch) {
                throw new RuntimeException("Password does not match");
            } else {
                existingUser.setPassword(newPassword);
                existingUser.setPassword(passwordEncoder.encode(existingUser.getPassword()));
            }
        }
        return userRepository.save(existingUser);
    }
}
