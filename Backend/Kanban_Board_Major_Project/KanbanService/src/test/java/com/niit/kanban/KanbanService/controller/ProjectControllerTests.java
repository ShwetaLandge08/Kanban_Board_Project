package com.niit.kanban.KanbanService.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.niit.kanban.KanbanService.domain.Project;
import com.niit.kanban.KanbanService.domain.User;
import com.niit.kanban.KanbanService.exception.ProjectAlreadyExistsException;
import com.niit.kanban.KanbanService.exception.ProjectNotFoundException;
import com.niit.kanban.KanbanService.exception.UserNotFoundException;
import com.niit.kanban.KanbanService.service.ProjectService;
import com.niit.kanban.KanbanService.service.UserService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
public class ProjectControllerTests {
    @InjectMocks
    private ProjectController controller;
    @Mock
    private ProjectService service;
    private Project project;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() throws UserNotFoundException {
        this.project = new Project(1, "Project-1", "create a website", new User(), new Date(),
                new Date("22/07/2023"), "High", 0.0, new ArrayList<>(), new ArrayList<>());
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @AfterEach
    public void tearDown() {
        this.project = null;
    }

//    @Test
//    @DisplayName("test for finding projects success")
//    public void testProjectSaveSuccess() throws Exception {
//        lenient().when(service.addProject(any())).thenReturn(project);
//        //lenient() added for UnnecessaryStubbingException
//        mockMvc.perform(post("/api/kanban/project/add")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(convertJsonToString(project)))
//                .andExpect(status().isCreated())
//                .andDo(MockMvcResultHandlers.print());
//    }
//
//    @Test
//    @DisplayName("test for saving project failure")
//    public void testProjectSaveFailure() throws Exception {
//        when(service.addProject(any())).thenThrow(ProjectAlreadyExistsException.class);
//        mockMvc.perform(post("/api/kanban/project/add")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(convertJsonToString(project)))
//                .andExpect(status().isConflict())
//                .andDo(MockMvcResultHandlers.print());
//    }

    @Test
    @DisplayName("test for deleting project success")
    public void testStageDeleteSuccess() throws Exception {
        lenient().when(service.removeProject(anyInt())).thenReturn(true);
        mockMvc.perform(delete("/api/kanban/project/delete/1"))
                .andExpect(status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    @DisplayName("test for deleting project failure")
    public void testStageDeleteFailure() throws Exception {
        when(service.removeProject(anyInt())).thenThrow(ProjectNotFoundException.class);
        mockMvc.perform(delete("/api/kanban/project/delete/1"))
                .andExpect(status().isNotFound())
                .andDo(MockMvcResultHandlers.print());
    }

    private String convertJsonToString(Object obj) {
        String result;
        ObjectMapper om = new ObjectMapper();
        try {
            result = om.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
}
