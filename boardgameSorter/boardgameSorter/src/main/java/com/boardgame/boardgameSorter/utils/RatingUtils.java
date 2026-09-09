package com.boardgame.boardgameSorter.utils;

public class RatingUtils {

    public static double updateRating(int totalRanked, int ratingCount, int gameRank, double oldRelativeRating){
        double relativeRankNewRanking = 10.0 * (totalRanked - gameRank + 1) / totalRanked;
        return (relativeRankNewRanking + oldRelativeRating * ratingCount) / (ratingCount + 1);
    }
}
