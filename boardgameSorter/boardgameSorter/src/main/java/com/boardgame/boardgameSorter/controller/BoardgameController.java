package com.boardgame.boardgameSorter.controller;

import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.service.BoardgameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boardgames")
public class BoardgameController {

    private final BoardgameService boardgameService;

    public BoardgameController(BoardgameService boardgameService) {
        this.boardgameService = boardgameService;
    }

    @GetMapping
    public List<Boardgame> getAllBoardgames() {
        return boardgameService.getAllBoardgames();
    }

    @GetMapping("/{id}")
    public Boardgame getBoardgame(@PathVariable Integer id) {
        return boardgameService.getBoardgame(id);
    }
}

