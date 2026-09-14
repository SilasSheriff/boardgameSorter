import { useEffect, useState } from "react";
import { KolLink } from "@public-ui/react-v19";
import "./BoardgameTable.css";
import type { Boardgame } from "../../models/Boardgame";
import { fetchBoardgames } from "../../api/boardgameApi";

function BoardgameTable() {
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

return (
    <main className="boardgame-table-container">
        <h1>Meine Brettspiele</h1>

        <table className="boardgame-table">
            <thead>
                <tr>
                    <th>Rang</th>
                    <th>Spiel</th>
                    <th>Autor</th>
                    <th>BGG</th>
                    <th>Meine Bewertung</th>
                    <th>Spieler</th>
                    <th>Relative Bewertung</th>
                    <th>Änderung</th>
                    <th>Details</th>
                </tr>
            </thead>

            <tbody>
                {boardgames.map((game) => (
                    <tr key={game.id}>
                        <td>{game.recentRank ?? "-"}</td>

                        <td>{game.gameName}</td>

                        <td>
                            {game.authors.length > 0
                                ? game.authors
                                    .map((author) => author.authorName)
                                    .join(", ")
                                : "-"}
                        </td>

                        <td>
                            {game.bggRating?.toFixed(1) ?? "-"}
                        </td>

                        <td>
                            {game.myRating ?? "-"}
                        </td>

                        <td>
                            {game.playerCount.length > 0
                                ? game.playerCount.join(", ")
                                : "-"}
                        </td>

                        <td>
                            {game.relativeRating?.toFixed(2) ?? "-"}
                        </td>

                        <td>
                            {game.changeRelativeRating?.toFixed(2) ?? "-"}
                        </td>

                        <td>
                            <KolLink
                                _href={`/boardgames/${game.id}`}
                                _label="Details"
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </main>
);
}

export default BoardgameTable;