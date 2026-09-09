package com.boardgame.boardgameSorter.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Author {
    @Id
    @GeneratedValue
    private Integer id;

    private String authorName;
}
