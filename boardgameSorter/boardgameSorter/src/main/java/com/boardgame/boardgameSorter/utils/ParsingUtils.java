package com.boardgame.boardgameSorter.utils;

import com.boardgame.boardgameSorter.entity.Boardgame;
import com.boardgame.boardgameSorter.entity.TurnOrder;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;

import java.io.IOException;
import java.io.Reader;
import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

public final class ParsingUtils {
    private ParsingUtils() {}

    public static CSVParser createParser(Reader reader, char delimiter) throws IOException {
        CSVFormat format = CSVFormat.DEFAULT
                .builder()
                .setDelimiter(delimiter)
                .setHeader()
                .setSkipHeaderRecord(true)
                .get();
        return format.parse(reader);
    }

    public static Set<String> separateCells(String input) {
        String[] lines = input.split("/");
        return new TreeSet<>(Arrays.asList(lines));
    }

    public static Integer parseInt(String input, Integer defaultValue) {
        if(input != null && !input.isBlank()) {
            return Integer.parseInt(input.trim());
        }
        else return defaultValue;
    }

    public static Double parseDouble(String input, Double defaultValue) {
        if(input != null && !input.isBlank()) {
            return Double.parseDouble(input.trim());
        }
        else return defaultValue;
    }

    public static void teamCoopSeparator(Boardgame boardgame, String input) {
        boardgame.setCooperative(false);
        boardgame.setTeamBased(false);
        boardgame.setCompetitive(false);

        switch (input.trim()) {
            case "C" -> boardgame.setCooperative(true);
            case "(C)" -> {
                boardgame.setCooperative(true);
                boardgame.setCompetitive(true);
            }
            case "T", "1 vs. X" -> boardgame.setTeamBased(true);
            case "(C/T)" ->{
                boardgame.setTeamBased(true);
                boardgame.setCooperative(true);
            }
            case "(T)" -> {
                boardgame.setTeamBased(true);
                boardgame.setCompetitive(true);

            }
            default -> boardgame.setCompetitive(true);
        }
    }

    public static Integer defineOptimalPlayerCount(String input) {
        if(!input.contains("(")){
            return Integer.parseInt(input.trim());
        }
        String inputReduced = input.split(" ")[1].trim()
                .replace("(", "")
                .replace(")", "");
        return Integer.parseInt(inputReduced);
    }

    public static Set<Integer> playerNumberSorter(String input) {
        Set<Integer> playerNumbers = new TreeSet<>();
        String inputReduced = input.split(" ")[0].trim();

        if (inputReduced.contains("/")){
            String[] playerCounts = inputReduced.split("/");
            for (String playerCount : playerCounts) {
                playerNumbers.add(Integer.parseInt(playerCount));
            }
        }
        else if (inputReduced.contains("-")){
            String[] minMaxPlayers = inputReduced.split("-");
            int maxPlayer = Integer.parseInt(minMaxPlayers[1]);
            int minPlayer = Integer.parseInt(minMaxPlayers[0]);
            for (int i = minPlayer; i <= maxPlayer; i++) {
                playerNumbers.add(i);
            }
        }
        else if (inputReduced.contains("+")) {
            int minPlayers = Integer.parseInt(inputReduced.replace("+",""));
            for (int i = minPlayers; i <= 12; i++) {
                playerNumbers.add(i);
            }
        }
        else{
            playerNumbers.add(Integer.parseInt(input));
        }
        return playerNumbers;
    }

    public static TurnOrder turnOrderParser(String input) {
        return switch (input.trim()) {
            case "strict clockwise" -> TurnOrder.CLOCKWISE;
            case "simultaneous" -> TurnOrder.SIMULTANEOUS;
            case "progressive" -> TurnOrder.PROGRESSIVE;
            case "pass order" -> TurnOrder.PASS_ORDER;
            case "variable" -> TurnOrder.VARIABLE;
            case "solo" -> TurnOrder.SOLO;
            case "trick taker" -> TurnOrder.TRICK_TAKER;
            case "role order" -> TurnOrder.ROLE_ORDER;
            case "stat based" -> TurnOrder.STAT_BASED;
            case "fixed" -> TurnOrder.FIXED;
            case "claim" -> TurnOrder.CLAIM;
            case "chit pull" -> TurnOrder.CHIT_PULL;
            case "auction" -> TurnOrder.AUCTION;
            case "random" -> TurnOrder.RANDOM;
            default -> null;
        };
    }
}
