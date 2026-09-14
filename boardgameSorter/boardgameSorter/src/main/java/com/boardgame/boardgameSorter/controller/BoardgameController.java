package com.boardgame.boardgameSorter.controller;

import com.boardgame.boardgameSorter.dto.BoardgameUpdateRequest;
import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.service.BoardgameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boardgames")
public class BoardgameController {

    private final BoardgameService boardgameService;

    public BoardgameController(BoardgameService boardgameService) {
        this.boardgameService = boardgameService;
    }

    @Operation(
            summary = "Alle Brettspiele abrufen",
            description = "Gibt alle im BoardgameSorter gespeicherten Brettspiele zurück."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Brettspiele erfolgreich abgerufen"
    )
    @GetMapping
    public List<Boardgame> getAllBoardgames() {
        return boardgameService.getAllBoardgames();
    }

    @Operation(
            summary = "Ein Brettspiel abrufen",
            description = "Gibt ein einzelnes Brettspiel anhand seiner ID zurück."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Brettspiel erfolgreich abgerufen"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Brettspiel nicht gefunden"
            )
    })
    @GetMapping("/{id}")
    public Boardgame getBoardgame(
            @Parameter(
                    description = "ID des Brettspiels",
                    required = true
            )
            @PathVariable Integer id) {

        return boardgameService.getBoardgame(id);
    }

    @Operation(
            summary = "Ein Brettspiel bearbeiten",
            description = "Aktualisiert die bearbeitbaren Daten eines Brettspiels."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Brettspiel erfolgreich aktualisiert"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Brettspiel nicht gefunden"
            )
    })
    @PutMapping("/{id}")
    public Boardgame updateBoardgame(
            @Parameter(
                    description = "ID des Brettspiels",
                    required = true
            )
            @PathVariable Integer id,
            @RequestBody BoardgameUpdateRequest request
    ) {
        return boardgameService.updateBoardgame(id, request);
    }
}
