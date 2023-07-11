package com.niit.kanban.UserAuthentication.service;

import com.niit.kanban.UserAuthentication.domain.User;
import com.niit.kanban.UserAuthentication.exception.UserAlreadyExistException;
import com.niit.kanban.UserAuthentication.exception.UserNotFoundException;
import com.niit.kanban.UserAuthentication.repository.UserRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @InjectMocks
    private UserServiceImpl userService;
    private User user;

    @BeforeEach
    void setUp() {
        user = new User(1, "arjitsingh@gmail.com", "Arjit", 9876543231L, "Arjit@123");
    }

    @AfterEach
    void tearDown() {
        user = null;
    }

    @Test
    @DisplayName("test user saved success")
    public void givenUserToSaveReturnSavedUserSuccess() throws UserAlreadyExistException {
        when(userRepository.save(user)).thenReturn(user);
        when(passwordEncoder.encode(user.getPassword())).thenReturn(user.getPassword());
        Assertions.assertEquals(user, userService.saveUser(user));
    }

    @Test
    @DisplayName("test user saved failure")
    void givenUserToSaveReturnSavedUserFailure() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));
        Assertions.assertThrows(UserAlreadyExistException.class, () -> userService.saveUser(user));
    }
}