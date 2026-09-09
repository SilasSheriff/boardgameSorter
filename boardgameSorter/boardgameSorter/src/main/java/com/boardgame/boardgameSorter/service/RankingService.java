package com.boardgame.boardgameSorter.service;

import com.boardgame.boardgameSorter.dto.RankingEntry;
import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.repository.BoardgameRepository;
import com.boardgame.boardgameSorter.utils.RatingUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class RankingService {
    private int totalRanked;
    private final BoardgameRepository boardgameRepository;

    public RankingService(BoardgameRepository boardgameRepository) {
        this.boardgameRepository = boardgameRepository;
    }


    public void updateRankings(List<RankingEntry> rankings) {
        totalRanked = rankings.size();

        for (RankingEntry ranking : rankings) {
            Optional<Boardgame> boardgame = boardgameRepository.findByGameName(ranking.gameName());
            if (boardgame.isPresent()) {
                updateExistingGame(boardgame.get(), ranking);
            } else {
                createNewGame(ranking);
            }
        }
    }

    private void updateExistingGame(Boardgame boardgame, RankingEntry ranking) {
        boardgame.setRecentRank(ranking.gameRank());
        double newRelativeRank = RatingUtils.updateRating(
                totalRanked, boardgame.getRatingCount(), ranking.gameRank(), boardgame.getRelativeRating());

        boardgame.setRelativeRating(newRelativeRank);
        boardgame.setRatingCount(boardgame.getRatingCount() + 1);

        boardgameRepository.save(boardgame);
    }

    private void createNewGame(RankingEntry ranking) {
        Boardgame boardgame = new Boardgame();
        boardgame.setGameName(ranking.gameName());
        boardgame.setRecentRank(ranking.gameRank());

        double relativeRank = RatingUtils.updateRating(totalRanked,0, ranking.gameRank(), 0.0);

        boardgame.setRelativeRating(relativeRank);
        boardgame.setRatingCount(1);

        boardgameRepository.save(boardgame);
    }
}

