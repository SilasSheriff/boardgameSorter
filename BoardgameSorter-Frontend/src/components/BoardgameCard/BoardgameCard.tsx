import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Boardgame } from "../../models/Boardgame";
import { fetchBoardgame } from "../../api/boardgameApi";
import BoardgameInfo from "./BoardgameInfo";
import BoardgameRating from "./BoardgameRating";
import BoardgameProperties from "./BoardgameProperties";

export default function BoardgameCard() {
    const { id } = useParams<{ id: string }>();

    const [boardgame, setBoardgame] = useState<Boardgame | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Keine Spiel-ID angegeben.");
            setLoading(false);
            return;
        }

        fetchBoardgame(Number(id))
            .then(setBoardgame)
            .catch(() => {
                setError("Das Brettspiel konnte nicht geladen werden.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Brettspiel wird geladen...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!boardgame) {
        return <p>Brettspiel nicht gefunden.</p>;
    }

    return (
        <div className="boardgame-detail">

            {/* Grundinformationen */}
            {/* Spieler und Spieldauer */}
            <BoardgameInfo boardgame={boardgame} />

            {/* Bewertungen und Rang */}
            <BoardgameRating boardgame={boardgame} />

            {/* Spielmechanismen */}
            {/* Themen */}
            {/* Eigenschaften */}
            {/* Spielablauf */}
            <BoardgameProperties boardgame={boardgame} />

        </div>
    );
}