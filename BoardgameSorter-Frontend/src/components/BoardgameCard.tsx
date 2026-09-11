import type { Boardgame } from "../models/Boardgame";

interface BoardgameCardProps {
    boardgame: Boardgame;
}

export default function BoardgameCard({ boardgame }: BoardgameCardProps) {
    return (
        <div className="boardgame-detail">
            <h1>{boardgame.gameName}</h1>

            <p>
                <strong>Autoren:</strong>{" "}
                {boardgame.authors
                    .map(author => author.authorName)
                    .join(", ")}
            </p>

            <p>
                <strong>Spieler:</strong>{" "}
                {boardgame.playerCount.join(", ")}
            </p>

            {boardgame.optimalPlayerCount !== null && (
                <p>
                    <strong>Optimale Spielerzahl:</strong>{" "}
                    {boardgame.optimalPlayerCount}
                </p>
            )}

            {boardgame.yearOfRelease !== null && (
                <p>
                    <strong>Erscheinungsjahr:</strong>{" "}
                    {boardgame.yearOfRelease}
                </p>
            )}

            {boardgame.myRating !== null && (
                <p>
                    <strong>Meine Bewertung:</strong>{" "}
                    {boardgame.myRating}
                </p>
            )}

            {boardgame.bggRating !== null && (
                <p>
                    <strong>BGG-Rating:</strong>{" "}
                    {boardgame.bggRating}
                </p>
            )}

            {boardgame.complexity !== null && (
                <p>
                    <strong>Komplexität:</strong>{" "}
                    {boardgame.complexity}
                </p>
            )}

            {boardgame.interactivity !== null && (
                <p>
                    <strong>Interaktivität:</strong>{" "}
                    {boardgame.interactivity}
                </p>
            )}

            <p>
                <strong>Spieltyp:</strong>{" "}
                {boardgame.cooperative && "Kooperativ "}
                {boardgame.competitive && "Kompetitiv "}
                {boardgame.teamBased && "Team-basiert"}
            </p>

            {boardgame.turnOrder && (
                <p>
                    <strong>Zugreihenfolge:</strong>{" "}
                    {boardgame.turnOrder}
                </p>
            )}

            {boardgame.expectedDurationAtOptimalPlayerCount !== null && (
                <p>
                    <strong>Spieldauer:</strong>{" "}
                    {boardgame.expectedDurationAtOptimalPlayerCount} Minuten
                </p>
            )}
        </div>
    );
}