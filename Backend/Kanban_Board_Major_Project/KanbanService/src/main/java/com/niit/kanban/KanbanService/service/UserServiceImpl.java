package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.domain.Task;
import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.UserAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.UserNotFoundException;
import com.niit.kanban.KanbanService.proxy.EmailProxy;
import com.niit.kanban.KanbanService.proxy.IUserProxy;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import com.niit.kanban.KanbanService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final IUserProxy userProxy;
    private final EmailProxy emailProxy;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;

    @Autowired
    public UserServiceImpl(IUserProxy userProxy, EmailProxy emailProxy, UserRepository userRepository, ProjectRepository projectRepository) {
        this.userProxy = userProxy;
        this.emailProxy = emailProxy;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
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

        if (user.getImage() != null)
            existingUser.setImage(user.getImage());

        userProxy.updateUser(existingUser);
        emailProxy.sendUpdateMail(existingUser);
        existingUser.setPhoneNo(null);
        existingUser.setPassword(null);
        existingUser.setImage(null);
        return userRepository.save(existingUser);
    }

    @Override
    public boolean deleteUser(String email) throws UserNotFoundException {
        User user = userRepository.findById(email).orElseThrow(UserNotFoundException::new);
        List<Project> allProject = projectRepository.findAll();
        for (Project project : allProject) {
            if (project.getAdmin().getEmail().equals(email)) {
                projectRepository.delete(project);
            } else {
                List<User> members = project.getMembers();
                members.removeIf(member -> member.getEmail().equals(email));

                List<Stage> allStages = project.getStages();
                for (Stage stage : allStages) {
                    List<Task> tasks = stage.getTasks();
                    //we should not remove task but we have to change assignee to null for that task. this can
                    //be only done after adding functionality for update task Assignee.
                    tasks.removeIf(task -> task.getAssignee().getEmail().equals(email));
                }
                projectRepository.save(project);
            }
        }
        userProxy.deleteUser(email);
        userRepository.delete(user);
        return true;
    }

}
