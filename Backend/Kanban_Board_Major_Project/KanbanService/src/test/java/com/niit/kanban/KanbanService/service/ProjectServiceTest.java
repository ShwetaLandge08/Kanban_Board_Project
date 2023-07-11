package com.niit.kanban.KanbanService.service;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.Stage;
import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.ProjectAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.StageAlreadyExistsException;
import com.niit.kanban.KanbanService.repository.ProjectRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DataMongoTest
public class ProjectServiceTest {
    @Mock
    private ProjectRepository repository;
    @InjectMocks
    private ProjectServiceImpl service;
    private Project project;

    @BeforeEach
    void setUp() {
        this.project = new Project(1, "Project-1", "create a website", new User(), new Date(),
                new Date("22/07/2023"), "High", 0.0, new ArrayList<>(), new ArrayList<>());
    }

    @AfterEach
    void tearDown() {
        project = null;
    }

//    @Test
//    @DisplayName("test for add project success")
//    public void testProjectForSaveProjectSuccess() throws ProjectAlreadyExistsException {
//        when(repository.save(project)).thenReturn(project);
//        Assertions.assertEquals(project, service.addProject(project));
//    }
//    @Test
//    @DisplayName("test for add project failure")
//    void testProjectForSaveProjectFailure() {
//        when(repository.findById(project.getProjectId())).thenReturn(Optional.ofNullable(project));
//        Assertions.assertThrows(ProjectAlreadyExistsException.class, () -> service.addProject(project));
//    }
//
//    @Test
//    @DisplayName("test for remove project success")
//    void testProjectForRemoveProjectSuccess() throws ProjectNotFoundException {
//        when(repository.findById(project.getProjectId())).thenReturn(Optional.ofNullable(project));
//        boolean flag = service.removeProject(project.getProjectId());
//        Assertions.assertTrue(flag);
//    }

    @Test
    @DisplayName("test for remove project failure")
    void testProjectForRemoveProjectFailure() {
        lenient().when(repository.findById(project.getProjectId())).thenReturn(Optional.ofNullable(null));
        Assertions.assertThrows(ProjectNotFoundException.class, () -> service.removeProject(project.getProjectId()));
    }
}
