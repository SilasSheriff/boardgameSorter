package com.boardgame.boardgameSorter.parser;

import com.boardgame.boardgameSorter.dto.RankingEntry;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import com.boardgame.boardgameSorter.utils.ParsingUtils;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Component
public class RankingCsvParser {

    public List<RankingEntry> parse(MultipartFile file) {
        List<RankingEntry> rankings = new ArrayList<>();
        try(Reader reader = new InputStreamReader(file.getInputStream())){
            CSVParser parser = ParsingUtils.createParser(reader,',');

            for (CSVRecord record : parser) {
                Integer gameRank = Integer.parseInt(record.get("Rank").trim());
                String gameName = record.get("Item").trim();

                RankingEntry rankingEntry = new RankingEntry(gameRank, gameName);
                rankings.add(rankingEntry);
            }
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
        return rankings;
    }
}
