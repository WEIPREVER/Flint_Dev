package com.example.flint.model;

import com.sun.istack.NotNull;
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name="user")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private UUID id;
    @NotNull
    @Column(name="username", unique = true)
    private String userName;
    @NotNull
    @Column(name="email")
    private String email;
    @NotNull
    @Column(name="password")
    private String password;

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
