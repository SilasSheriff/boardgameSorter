package com.boardgame.boardgameSorter.repository;

import com.boardgame.boardgameSorter.entity.Boardgame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardgameRepository extends JpaRepository<Boardgame,Integer> {
    Optional<Boardgame> findByGameName(String gameName);

    boolean existsByGameName(String gameName);
}
