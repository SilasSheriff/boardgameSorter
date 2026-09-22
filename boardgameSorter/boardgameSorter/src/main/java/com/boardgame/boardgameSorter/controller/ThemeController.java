package com.boardgame.boardgameSorter.controller;

import com.boardgame.boardgameSorter.entity.Mechanism;
import com.boardgame.boardgameSorter.entity.Theme;
import com.boardgame.boardgameSorter.service.MechanismService;
import com.boardgame.boardgameSorter.service.ThemeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/themes")
public class ThemeController {
    private final ThemeService themeService;

    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @GetMapping
    public List<Theme> getAllThemes(){
        return themeService.getAllThemes();
    }
}
