package com.boardgame.boardgameSorter.service;

import com.boardgame.boardgameSorter.dto.BoardgameUpdateRequest;
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

    public Boardgame updateBoardgame(
            Integer id,
            BoardgameUpdateRequest request
    ) {
        Boardgame boardgame = boardgameRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Brettspiel mit ID " + id + " nicht gefunden"
                        )
                );

        boardgame.setGameName(request.gameName());
        boardgame.setOptimalPlayerCount(request.optimalPlayerCount());
        boardgame.setYearOfRelease(request.yearOfRelease());
        boardgame.setMyRating(request.myRating());
        boardgame.setBggRating(request.bggRating());
        boardgame.setComplexity(request.complexity());
        boardgame.setInteractivity(request.interactivity());

        return boardgameRepository.save(boardgame);
    }
}