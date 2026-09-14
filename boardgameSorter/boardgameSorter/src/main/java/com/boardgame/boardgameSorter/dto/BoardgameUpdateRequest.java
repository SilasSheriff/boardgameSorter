package com.boardgame.boardgameSorter.dto;

public record BoardgameUpdateRequest(
        String gameName,
        Integer optimalPlayerCount,
        Integer yearOfRelease,
        Integer myRating,
        Double bggRating,
        Integer complexity,
        Integer interactivity
) {
}
