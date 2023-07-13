package com.niit.kanban.KanbanService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class Task {
    @Id
    private int id;
    private String title;
    private String description;
    @DBRef
    private User assignee;
    private Date startDate;
    private Date dueDate;
    private String priority;
    private String status;
    private List<Comment> comments;
}

