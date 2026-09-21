import type { Boardgame } from "../../models/Boardgame";

interface BoardgameInfoProps {
    boardgame: Boardgame;
}

export default function BoardgameInfo({ boardgame }: BoardgameInfoProps) {
    return (
        <>
            {/* Grundinformationen */}
            <section>
                <h1>{boardgame.gameName}</h1>

                <p>
                    <strong>Autoren:</strong>{" "}
                    {boardgame.authors.length > 0
                        ? boardgame.authors
                            .map(author => author.authorName)
                            .join(", ")
                        : "Keine Angabe"}
                </p>

                <p>
                    <strong>Erscheinungsjahr:</strong>{" "}
                    {boardgame.yearOfRelease ?? "Keine Angabe"}
                </p>
            </section>

            {/* Spieler und Spieldauer */}
            <section>
                <h2>Spieler & Spieldauer</h2>

                <p>
                    <strong>Spielerzahl:</strong>{" "}
                    {boardgame.playerCount.length > 0
                        ? boardgame.playerCount.join(", ")
                        : "Keine Angabe"}
                </p>

                <p>
                    <strong>Optimale Spielerzahl:</strong>{" "}
                    {boardgame.optimalPlayerCount ?? "Keine Angabe"}
                </p>

                <p>
                    <strong>Spieldauer:</strong>{" "}
                    {boardgame.expectedDurationAtOptimalPlayerCount !== null
                        ? `${boardgame.expectedDurationAtOptimalPlayerCount} Minuten`
                        : "Keine Angabe"}
                </p>
            </section>
        </>
    );
}