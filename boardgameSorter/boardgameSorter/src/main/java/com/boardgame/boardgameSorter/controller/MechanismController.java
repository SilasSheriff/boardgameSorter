package com.boardgame.boardgameSorter.controller;

import com.boardgame.boardgameSorter.entity.Mechanism;
import com.boardgame.boardgameSorter.service.MechanismService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mechanisms")
public class MechanismController {
    private final MechanismService mechanismService;

    public MechanismController(MechanismService mechanismService) {
        this.mechanismService = mechanismService;
    }

    @GetMapping
    public List<Mechanism> getAllMechanisms(){
        return mechanismService.getAllMechanisms();
    }
}
