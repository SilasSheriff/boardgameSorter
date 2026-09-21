package com.boardgame.boardgameSorter.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class BggFetchingService {

    private final RestClient restClient;

    public BggFetchingService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://boardgamegeek.com")
                .build();
    }

    public String getBoardgameData(Integer bggId) {
        return restClient.get()
                .uri("/xmlapi2/thing?id={id}&stats=1", bggId)
                .retrieve()
                .body(String.class);
    }
}
