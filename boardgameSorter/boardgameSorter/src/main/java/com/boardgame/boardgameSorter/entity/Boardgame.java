package com.boardgame.boardgameSorter.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.Set;

@Entity
@Setter
@Getter
public class Boardgame {
     // Basics
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Integer id;

     private Integer bggId;

     @Nationalized
     @Column(unique = true)
     private String gameName;

     @ManyToMany
     private Set<Author> authors;

     @ElementCollection
     private Set<Integer> playerCount;

     private Integer optimalPlayerCount;
     private Integer yearOfRelease;


     // Ratings
     private Integer recentRank;
     private Integer myRating;
     private Integer ratingCount;
     private Double bggRating;
     private Double relativeRating;
     private Double changeRelativeRating;

     // Category
     @ManyToMany
     private Set<Theme> themes;

     @ManyToMany
     private Set<Mechanism> mechanisms;

     //Classifiers
     private Integer complexity;
     private Integer interactivity;

     private Boolean competitive;
     private Boolean cooperative;
     private Boolean teamBased;

     @Enumerated(EnumType.STRING)
     private TurnOrder turnOrder;
     @ElementCollection
     @Enumerated(EnumType.STRING)
     private Set<GameEndCondition> gameEndConditions;

     private Integer expectedDurationAtOptimalPlayerCount;
}
