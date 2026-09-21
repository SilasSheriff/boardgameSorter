import type { Boardgame } from "../../models/Boardgame";

interface BoardgameRatingsProps {
    boardgame: Boardgame;
}

export default function BoardgameRatings({
    boardgame
}: BoardgameRatingsProps) {
    return (
        <section>
            <h2>Bewertungen & Rang</h2>

            <p>
                <strong>Aktueller Rang:</strong>{" "}
                {boardgame.recentRank ?? "Keine Angabe"}
            </p>

            <p>
                <strong>Meine Bewertung:</strong>{" "}
                {boardgame.myRating ?? "Keine Angabe"}
            </p>

            <p>
                <strong>Anzahl meiner Bewertungen:</strong>{" "}
                {boardgame.ratingCount ?? "Keine Angabe"}
            </p>

            <p>
                <strong>BGG-Bewertung:</strong>{" "}
                {boardgame.bggRating ?? "Keine Angabe"}
            </p>

            <p>
                <strong>Relative Bewertung:</strong>{" "}
                {boardgame.relativeRating ?? "Keine Angabe"}
            </p>

            <p>
                <strong>Änderung der relativen Bewertung:</strong>{" "}
                {boardgame.changeRelativeRating ?? "Keine Angabe"}
            </p>
        </section>
    );
}