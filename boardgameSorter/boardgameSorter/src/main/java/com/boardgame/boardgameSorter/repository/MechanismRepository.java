package com.boardgame.boardgameSorter.repository;

import com.boardgame.boardgameSorter.entity.Mechanism;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MechanismRepository extends JpaRepository<Mechanism,Integer> {
    Optional<Mechanism> findByMechanismName(String mechanismName);
}
