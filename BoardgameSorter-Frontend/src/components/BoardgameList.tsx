import { useEffect, useState } from "react";
import { KolTableStateless } from "@public-ui/react-v19";

import type { Boardgame } from "../models/Boardgame";
import { fetchBoardgames } from "../api/boardgameApi";

function BoardgameList() {
    const [boardgames, setBoardgames] = useState<Boardgame[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchBoardgames()
            .then(setBoardgames)
            .catch(() => {
                setError("Brettspiele konnten nicht geladen werden.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Brettspiele werden geladen...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const headerCells = {
    horizontal: [[
        { key: "recentRank", label: "Rang" },
        { key: "gameName", label: "Spiel" },
        { key: "authors", label: "Autor" },
        { key: "bggRating", label: "BGG" },
        { key: "myRating", label: "Meine Bewertung" },
        { key: "playerCount", label: "Spieler" },
        { key: "relativeRating", label: "Relative Bewertung" },
        { key: "changeRelativeRating", label: "Änderung" },
    ]]
};

const data = boardgames.map((game) => ({
    recentRank: game.recentRank ?? "-",
    gameName: game.gameName,
    authors: game.authors
        .map((author) => author.authorName)
        .join(", "),
    bggRating: game.bggRating?.toFixed(1) ?? "-",
    myRating: game.myRating ?? "-",
    playerCount: game.playerCount.length > 0
        ? game.playerCount.join(", ")
        : "-",
    relativeRating: game.relativeRating?.toFixed(2) ?? "-",
    changeRelativeRating: game.changeRelativeRating?.toFixed(2) ?? "-",
}));

    return (
        <main>
            <h1>Meine Brettspiele</h1>

            <KolTableStateless
                _label="Brettspiele"
                _headerCells={headerCells}
                _data={data}
            />
        </main>
    );
}

export default BoardgameList;