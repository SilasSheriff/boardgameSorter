package com.boardgame.boardgameSorter.mapper;

import com.boardgame.boardgameSorter.entity.Author;
import com.boardgame.boardgameSorter.entity.Boardgame;

import com.boardgame.boardgameSorter.entity.Mechanism;
import com.boardgame.boardgameSorter.entity.Theme;
import com.boardgame.boardgameSorter.repository.AuthorRepository;
import com.boardgame.boardgameSorter.repository.MechanismRepository;
import com.boardgame.boardgameSorter.repository.ThemeRepository;
import com.boardgame.boardgameSorter.utils.ParsingUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Component
public class BoardgameCsvMapper {
    private final MechanismRepository mechanismRepository;
    private final AuthorRepository authorRepository;
    private final ThemeRepository themeRepository;

    public void mapBasics(CSVRecord record, Boardgame boardGame) {
        String gameName = record.get("Name").trim();
        boardGame.setGameName(gameName);
        boardGame.setComplexity(ParsingUtils.parseInt(record.get("Complexity"),-1));
        boardGame.setInteractivity(ParsingUtils.parseInt(record.get("Interactivity"),-1));
        boardGame.setRecentRank(ParsingUtils.parseInt(record.get("Rank"),-1));
        boardGame.setMyRating(ParsingUtils.parseInt(record.get("My Rating"),-1));
        boardGame.setBggRating(ParsingUtils.parseDouble(record.get("BGG Rating"),-1.0));
        boardGame.setChangeRelativeRating
                (ParsingUtils.parseDouble(record.get("Change Rel. Rating"),-1.0));
        boardGame.setRelativeRating(ParsingUtils.parseDouble(record.get("Relative Rating"),-1.0));
        boardGame.setYearOfRelease(ParsingUtils.parseInt(record.get("Year Of Release"),-10000));
        boardGame.setExpectedDurationAtOptimalPlayerCount
                (ParsingUtils.parseInt(record.get("Duration"),-1));
        boardGame.setRatingCount(ParsingUtils.parseInt(record.get("Rank Count"),-1));

        ParsingUtils.teamCoopSeparator(boardGame,record.get("Cooperative"));
        boardGame.setOptimalPlayerCount(ParsingUtils.defineOptimalPlayerCount(record.get("Player Amount")));
        boardGame.setPlayerCount(ParsingUtils.playerNumberSorter(record.get("Player Amount")));

        boardGame.setTurnOrder(ParsingUtils.turnOrderParser(record.get("Turn Order")));
    }

    public void mapMechanisms(CSVRecord record, Boardgame boardGame) {
        Set<String> mechanismsStringSet = ParsingUtils.separateCells(record.get("Central Mechanisms"));
        Set<Mechanism> mechanismSet = new HashSet<>();
        for (String mechs : mechanismsStringSet) {
            Mechanism mechanism = mechanismRepository
                    .findByMechanismName(mechs)
                    .orElseGet(() -> {
                        Mechanism newMechanism = new Mechanism();
                        newMechanism.setMechanismName(mechs);
                        return mechanismRepository.save(newMechanism);
                    });

            mechanismSet.add(mechanism);
        }
        boardGame.setMechanisms(mechanismSet);
    }

    public void mapAuthors(CSVRecord record, Boardgame boardGame) {
        Set<String> authorsStringSet = ParsingUtils.separateCells(record.get("Author(s)"));
        Set<Author> authorsSet = new HashSet<>();
        for (String authorIndex : authorsStringSet) {
            Author author = authorRepository
                    .findByAuthorName(authorIndex)
                    .orElseGet(() -> {
                        Author newAuthor = new Author();
                        newAuthor.setAuthorName(authorIndex);
                        return authorRepository.save(newAuthor);
                    });

            authorsSet.add(author);
        }
        boardGame.setAuthors(authorsSet);
    }

    public void mapTheme(CSVRecord record, Boardgame boardGame) {
        Set<String> themeStringSet = ParsingUtils.separateCells(record.get("Theme"));
        Set<Theme> themeSet = new HashSet<>();
        for (String themeIndex : themeStringSet) {
            Theme theme = themeRepository
                    .findByThemeName(themeIndex)
                    .orElseGet(() -> {
                        Theme newTheme = new Theme();
                        newTheme.setThemeName(themeIndex);
                        return themeRepository.save(newTheme);
                    });

            themeSet.add(theme);
        }
        boardGame.setThemes(themeSet);
    }
}
