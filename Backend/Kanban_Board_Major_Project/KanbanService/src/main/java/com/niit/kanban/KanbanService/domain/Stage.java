package com.niit.kanban.KanbanService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Document
public class Stage {
    @Id
    private String name;
    private int wipLimit;
    private List<Task> tasks;
}
