package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.UserAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.UserNotFoundException;
import com.niit.kanban.KanbanService.proxy.EmailProxy;
import com.niit.kanban.KanbanService.proxy.IUserProxy;
import com.niit.kanban.KanbanService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final IUserProxy userProxy;
    private final EmailProxy emailProxy;
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(IUserProxy userProxy, EmailProxy emailProxy, UserRepository userRepository) {
        this.userProxy = userProxy;
        this.emailProxy = emailProxy;
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) throws UserAlreadyExistsException {
        if (userRepository.existsById(user.getEmail())) throw new UserAlreadyExistsException();
        userProxy.saveUser(user);
        emailProxy.sendRegistrationMail(user);
        user.setPhoneNo(null);
        user.setPassword(null);
        //user.setName(null);
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public User getUser(String email) throws UserNotFoundException {
        return userRepository.findById(email).orElseThrow(UserNotFoundException::new);
    }

    @Override
    public User updateUser(String email, User user) throws UserNotFoundException {
        User existingUser = userRepository.findById(email).orElseThrow(UserNotFoundException::new);

        if (user.getName() != null && !user.getName().isEmpty())
            existingUser.setName(user.getName());

        if (user.getPhoneNo() != null)
            existingUser.setPhoneNo(user.getPhoneNo());

        userProxy.updateUser(existingUser);
        emailProxy.sendUpdateMail(existingUser);

        existingUser.setPhoneNo(null);
        return userRepository.save(existingUser);
    }

}
