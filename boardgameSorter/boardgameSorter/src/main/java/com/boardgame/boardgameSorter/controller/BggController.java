package com.boardgame.boardgameSorter.controller;

import com.boardgame.boardgameSorter.service.BggFetchingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/bgg")
@RestController
public class BggController {

    private final BggFetchingService bggFetchingService;

    public BggController(BggFetchingService bggFetchingService) {
        this.bggFetchingService = bggFetchingService;
    }

    @GetMapping("/{bggid}")
    public String getBggData(@PathVariable("bggid") Integer bggId) {
        return bggFetchingService.getBoardgameData(bggId);
    }
}
