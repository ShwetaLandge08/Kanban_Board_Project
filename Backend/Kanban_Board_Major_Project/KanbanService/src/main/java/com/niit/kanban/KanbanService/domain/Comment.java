package com.niit.kanban.KanbanService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class Comment {
    @Id
    private int id;
    private String comment;
    private User commenter;
}

