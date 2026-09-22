package com.boardgame.boardgameSorter.service;

import com.boardgame.boardgameSorter.entity.Theme;
import com.boardgame.boardgameSorter.repository.ThemeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemeService {
    private final ThemeRepository themeRepository;

    public ThemeService(ThemeRepository themeRepository) {
        this.themeRepository = themeRepository;
    }

    public List<Theme> getAllThemes(){
        return themeRepository.findAll();
    }
}
