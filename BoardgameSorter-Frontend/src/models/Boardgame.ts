export interface Author {
    id: number;
    authorName: string;
}

export interface Boardgame {
    id: number;
    gameName: string;
    authors: Author[];

    playerCount: number[];
    optimalPlayerCount: number | null;
    yearOfRelease: number | null;

    recentRank: number | null;
    myRating: number | null;
    ratingCount: number | null;
    bggRating: number | null;
    relativeRating: number | null;
    changeRelativeRating: number | null;

    themes: unknown[];
    mechanisms: unknown[];

    complexity: number | null;
    interactivity: number | null;

    competitive: boolean | null;
    cooperative: boolean | null;
    teamBased: boolean | null;

    turnOrder: string | null;
    gameEndConditions: string[];
    expectedDurationAtOptimalPlayerCount: number | null;
}