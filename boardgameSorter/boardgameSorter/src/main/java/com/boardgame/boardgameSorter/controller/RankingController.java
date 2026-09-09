package com.boardgame.boardgameSorter.controller;

import com.boardgame.boardgameSorter.dto.RankingEntry;
import com.boardgame.boardgameSorter.parser.RankingCsvParser;
import com.boardgame.boardgameSorter.service.RankingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/rankings")
@CrossOrigin
public class RankingController {
    private final RankingService rankingService;
    private final RankingCsvParser rankingCsvParser;

    public RankingController(RankingService rankingService, RankingCsvParser rankingCsvParser) {
        this.rankingService = rankingService;
        this.rankingCsvParser = rankingCsvParser;
    }

    @PostMapping("/upload")
    public void updateRankings(@RequestParam("file") MultipartFile file) {
        List<RankingEntry> rankings = rankingCsvParser.parse(file);
        rankingService.updateRankings(rankings);
    }
}
