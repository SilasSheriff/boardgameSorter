package com.boardgame.boardgameSorter.dto;

import java.util.Set;

public record BoardgameUpdateRequest(
        String gameName,
        Integer optimalPlayerCount,
        Integer yearOfRelease,
        Integer myRating,
        Double bggRating,
        Integer complexity,
        Integer interactivity,
        Set<Integer> mechanismIds,
        Set<Integer> authorsIds,
        Set<Integer> themeIds
) {
}
