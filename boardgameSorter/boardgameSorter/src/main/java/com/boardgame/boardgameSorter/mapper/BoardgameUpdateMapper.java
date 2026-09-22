package com.boardgame.boardgameSorter.mapper;

import com.boardgame.boardgameSorter.dto.BoardgameUpdateRequest;
import com.boardgame.boardgameSorter.entity.Boardgame;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface BoardgameUpdateMapper {

    @BeanMapping(
            nullValuePropertyMappingStrategy =
                    NullValuePropertyMappingStrategy.IGNORE
    )
    void updateBoardgame(
            BoardgameUpdateRequest request,
            @MappingTarget Boardgame boardgame
    );
}