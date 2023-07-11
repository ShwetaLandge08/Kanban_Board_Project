package com.niit.kanban.KanbanService.repository;

import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class ProjectRepositoryTest {
    @Autowired
    private ProjectRepository repository;
    private Project project;

    @BeforeEach
    void setUp() {
        this.project = new Project(1, "Project-1", "create a website", new User(), new Date(),
                new Date("22/07/2023"), "High", 0.0, new ArrayList<>(), new ArrayList<>());
    }

    @AfterEach
    void tearDown() {
        project = null;
        repository.deleteAll();
    }
    @Test
    @DisplayName("Test case for saving project object")
    public void testForSavingProject() {
        repository.save(project);
        Project project1 = repository.findById(project.getProjectId()).get();
        assertNotNull(project1);
        assertEquals(project.getProjectId(),project1.getProjectId());
    }
    @Test
    @DisplayName("Test case for deleting project object")
    public void TestForDeletingProject() {
        repository.save(project);
        Project project1 = repository.findById(project.getProjectId()).get();
        repository.delete(project1);
        assertEquals(Optional.empty(), repository.findById(project.getProjectId()));
    }

    @Test
    @DisplayName("Test case for fetching projects")
    public void testForFetchingProject() {
        Project project1 = new Project(2, "Project-2", "create a website for food", new User(), new Date(),
                new Date("23/07/2023"), "High", 0.0, new ArrayList<>(), new ArrayList<>());
        Project project2 = new Project(3, "Project-3", "create a website for music", new User(), new Date(),
                new Date("25/07/2023"), "High", 0.0, new ArrayList<>(), new ArrayList<>());
        repository.save(project2);
        repository.save(project1);
        List<Project> list = repository.findAll();
        assertEquals(2, list.size());
    }
}
