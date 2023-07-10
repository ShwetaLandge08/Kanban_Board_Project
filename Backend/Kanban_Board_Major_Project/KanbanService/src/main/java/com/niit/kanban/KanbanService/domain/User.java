package com.niit.kanban.KanbanService.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.File;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Document
public class User {
    @Id
    private String email;
    private String password;
    private String name;
    private Long phoneNo;
//    private File photo;
}

