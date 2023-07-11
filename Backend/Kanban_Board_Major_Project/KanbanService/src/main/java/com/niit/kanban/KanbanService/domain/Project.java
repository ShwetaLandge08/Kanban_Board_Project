package com.niit.kanban.KanbanService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class Project {
    @Id
    private int projectId;
    private String title;
    private String description;
    private User admin;
    private Date startDate;
    private Date dueDate;
    private String priority;
    private double completion;
    private List<Stage> stages;
    private List<User> members;
}