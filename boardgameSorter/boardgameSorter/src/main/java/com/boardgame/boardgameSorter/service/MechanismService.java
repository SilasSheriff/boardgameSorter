package com.boardgame.boardgameSorter.service;

import com.boardgame.boardgameSorter.entity.Mechanism;
import com.boardgame.boardgameSorter.repository.MechanismRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MechanismService {
    private final MechanismRepository mechanismRepository;

    public MechanismService(MechanismRepository mechanismRepository) {
        this.mechanismRepository = mechanismRepository;
    }

    public List<Mechanism> getAllMechanisms(){
        return mechanismRepository.findAll();
    }
}
