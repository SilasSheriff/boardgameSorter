package com.boardgame.boardgameSorter.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String themeName;

    private String themeDescription;
}
