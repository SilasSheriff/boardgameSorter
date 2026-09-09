package com.boardgame.boardgameSorter.config;

import com.boardgame.boardgameSorter.service.CsvReaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataLoader implements CommandLineRunner {
    private final CsvReaderService csvReaderService;

    @Override
    public void run(String... args) {
        csvReaderService.importGames();
    }
}
