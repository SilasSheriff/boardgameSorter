package com.boardgame.boardgameSorter.controller;

import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.repository.BoardgameRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/boardgames")
public class BoardgameController {

    private final BoardgameRepository boardgameRepository;

    public BoardgameController(BoardgameRepository repository) {
        this.boardgameRepository = repository;

    }

    @GetMapping
    public List<Boardgame> getAllBoardgames() {
        return boardgameRepository.findAll();
    }

    @GetMapping("/{id}")
    public Boardgame getBoardgame(@PathVariable Integer id) {
        return boardgameRepository.findById(id)
                .orElseThrow();
    }

}
