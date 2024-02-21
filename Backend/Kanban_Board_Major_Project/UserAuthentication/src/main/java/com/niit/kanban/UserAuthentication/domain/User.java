package com.niit.kanban.UserAuthentication.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(unique = true)
    private String email;
    private String name;
    private Long phoneNo;
    private String password;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;
    private Long otp;
    private LocalTime otpExpirationTime;
}
