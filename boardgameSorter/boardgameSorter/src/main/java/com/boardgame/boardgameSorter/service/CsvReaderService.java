package com.boardgame.boardgameSorter.service;

import com.boardgame.boardgameSorter.mapper.BoardgameCsvMapper;
import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.repository.BoardgameRepository;
import com.boardgame.boardgameSorter.utils.ParsingUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

@Service
@RequiredArgsConstructor
public class CsvReaderService {
    private final BoardgameRepository boardgameRepository;
    private final BoardgameCsvMapper boardgameCsvMapper;

    public void importGames(){
        ClassPathResource resource = new ClassPathResource("data/Silas Spiele.26.07.csv");

        try(Reader reader = new InputStreamReader(resource.getInputStream())){
            CSVParser parser = ParsingUtils.createParser(reader,';');

            for (CSVRecord record : parser) {
                String gameName = record.get("Name").trim();

                Boardgame boardgame = boardgameRepository
                        .findByGameName(gameName)
                        .orElseGet(Boardgame::new);

                boardgameCsvMapper.mapBasics(record, boardgame);
                boardgameCsvMapper.mapTheme(record, boardgame);
                boardgameCsvMapper.mapMechanisms(record, boardgame);
                boardgameCsvMapper.mapAuthors(record, boardgame);
                boardgameRepository.save(boardgame);
            }
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}