package com.boardgame.boardgameSorter.service;

import com.boardgame.boardgameSorter.dto.BoardgameUpdateRequest;
import com.boardgame.boardgameSorter.entity.Author;
import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.entity.Mechanism;
import com.boardgame.boardgameSorter.entity.Theme;
import com.boardgame.boardgameSorter.mapper.BoardgameUpdateMapper;
import com.boardgame.boardgameSorter.repository.AuthorRepository;
import com.boardgame.boardgameSorter.repository.BoardgameRepository;
import com.boardgame.boardgameSorter.repository.MechanismRepository;
import com.boardgame.boardgameSorter.repository.ThemeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BoardgameService {

    private final BoardgameRepository boardgameRepository;
    private final MechanismRepository mechanismRepository;
    private final BoardgameUpdateMapper boardgameUpdateMapper;
    private final AuthorRepository authorRepository;
    private final ThemeRepository themeRepository;

    public BoardgameService(
            BoardgameRepository boardgameRepository,
            MechanismRepository mechanismRepository,
            BoardgameUpdateMapper boardgameUpdateMapper,
            AuthorRepository authorRepository,
            ThemeRepository themeRepository
    ) {
        this.boardgameRepository = boardgameRepository;
        this.mechanismRepository = mechanismRepository;
        this.boardgameUpdateMapper = boardgameUpdateMapper;
        this.authorRepository = authorRepository;
        this.themeRepository = themeRepository;
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
        Boardgame boardgame = getBoardgame(id);

        boardgameUpdateMapper.updateBoardgame(
                request,
                boardgame
        );

        if (request.mechanismIds() != null) {

            Set<Mechanism> mechanisms = request.mechanismIds()
                    .stream()
                    .map(mechanismId ->
                            mechanismRepository.findById(mechanismId)
                                    .orElseThrow(() ->
                                            new ResponseStatusException(
                                                    HttpStatus.NOT_FOUND,
                                                    "Mechanismus mit ID "
                                                            + mechanismId
                                                            + " nicht gefunden"
                                            )
                                    )
                    )
                    .collect(Collectors.toSet());

            boardgame.setMechanisms(mechanisms);
        }

        if (request.authorsIds() != null) {

            Set<Author> authors = request.authorsIds()
                    .stream()
                    .map(authorId ->
                            authorRepository.findById(authorId)
                                    .orElseThrow(() ->
                                            new ResponseStatusException(
                                                    HttpStatus.NOT_FOUND,
                                                    "Mechanismus mit ID "
                                                            + authorId
                                                            + " nicht gefunden"
                                            )
                                    )
                    )
                    .collect(Collectors.toSet());

            boardgame.setAuthors(authors);
        }

        if (request.themeIds() != null) {

            Set<Theme> themes = request.themeIds()
                    .stream()
                    .map(themeId ->
                            themeRepository.findById(themeId)
                                    .orElseThrow(() ->
                                            new ResponseStatusException(
                                                    HttpStatus.NOT_FOUND,
                                                    "Mechanismus mit ID "
                                                            + themeId
                                                            + " nicht gefunden"
                                            )
                                    )
                    )
                    .collect(Collectors.toSet());

            boardgame.setThemes(themes);
        }

        return boardgameRepository.save(boardgame);
    }
}