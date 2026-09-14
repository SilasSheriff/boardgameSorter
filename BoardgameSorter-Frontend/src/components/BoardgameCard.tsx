import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Boardgame } from "../models/Boardgame";
import { fetchBoardgame } from "../api/boardgameApi";

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

            {/* Bewertungen und Rang */}
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

            {/* Spielmechanismen */}
            <section>
            <h2>Spielmechanismen</h2>

            {boardgame.mechanisms.length > 0 ? (
                <ul>
                    {boardgame.mechanisms.map(mechanism => (
                        <li key={mechanism.id}>
                            {mechanism.mechanismName}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Keine Angabe</p>
            )}
        </section>

            {/* Themen */}
            <section>
                <h2>Themen</h2>

                {boardgame.themes.length > 0 ? (
                    <ul>
                        {boardgame.themes.map(theme => (
                            <li key={theme.id}>
                                {theme.themeName}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Keine Angabe</p>
                )}
            </section>

            {/* Eigenschaften */}
            <section>
                <h2>Eigenschaften</h2>

                <p>
                    <strong>Komplexität:</strong>{" "}
                    {boardgame.complexity ?? "Keine Angabe"}
                </p>

                <p>
                    <strong>Interaktivität:</strong>{" "}
                    {boardgame.interactivity ?? "Keine Angabe"}
                </p>

                <p>
                    <strong>Kompetitiv:</strong>{" "}
                    {boardgame.competitive === null
                        ? "Keine Angabe"
                        : boardgame.competitive
                            ? "Ja"
                            : "Nein"}
                </p>

                <p>
                    <strong>Kooperativ:</strong>{" "}
                    {boardgame.cooperative === null
                        ? "Keine Angabe"
                        : boardgame.cooperative
                            ? "Ja"
                            : "Nein"}
                </p>

                <p>
                    <strong>Team-basiert:</strong>{" "}
                    {boardgame.teamBased === null
                        ? "Keine Angabe"
                        : boardgame.teamBased
                            ? "Ja"
                            : "Nein"}
                </p>
            </section>

            {/* Spielablauf */}
            <section>
                <h2>Spielablauf</h2>

                <p>
                    <strong>Zugreihenfolge:</strong>{" "}
                    {boardgame.turnOrder ?? "Keine Angabe"}
                </p>

                <p>
                    <strong>Spielende-Bedingungen:</strong>
                </p>

                {boardgame.gameEndConditions.length > 0 ? (
                    <ul>
                        {boardgame.gameEndConditions.map((condition, index) => (
                            <li key={index}>{condition}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Keine Angabe</p>
                )}
            </section>

        </div>
    );
}
