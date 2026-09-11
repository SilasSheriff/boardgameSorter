package com.boardgame.boardgameSorter.service;

import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.repository.BoardgameRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BoardgameService {

    private final BoardgameRepository boardgameRepository;

    public BoardgameService(BoardgameRepository boardgameRepository) {
        this.boardgameRepository = boardgameRepository;
    }

    public List<Boardgame> getAllBoardgames() {
        return boardgameRepository.findAll();
    }

    public Boardgame getBoardgame(Integer id) {
        return boardgameRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Brettspiel mit ID " + id + " nicht gefunden"
                        )
                );
    }
}