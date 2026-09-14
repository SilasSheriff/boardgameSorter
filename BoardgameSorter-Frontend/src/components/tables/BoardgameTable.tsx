import { useEffect, useState } from "react";
import { KolLink } from "@public-ui/react-v19";
import "./BoardgameTable.css";
import type { Boardgame } from "../../models/Boardgame";
import { fetchBoardgames } from "../../api/boardgameApi";
import Pagination from "../Pagination/Pagination";

type SortKey =
    | "recentRank"
    | "gameName"
    | "author"
    | "bggRating"
    | "myRating"
    | "playerCount"
    | "relativeRating"
    | "changeRelativeRating";

type SortDirection = "asc" | "desc";

function BoardgameTable() {
    const [boardgames, setBoardgames] = useState<Boardgame[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [sortKey, setSortKey] = useState<SortKey>("recentRank");
    const [sortDirection, setSortDirection] =
        useState<SortDirection>("asc");

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

    function handleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDirection((direction) =>
                direction === "asc" ? "desc" : "asc"
            );
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }

        setCurrentPage(1);
    }

    function getSortIndicator(key: SortKey) {
        if (sortKey !== key) {
            return "";
        }

        return sortDirection === "asc" ? " ↑" : " ↓";
    }

    const sortedBoardgames = [...boardgames].sort((a, b) => {
        let valueA: string | number | null;
        let valueB: string | number | null;

        switch (sortKey) {
            case "recentRank":
                valueA = a.recentRank;
                valueB = b.recentRank;
                break;

            case "gameName":
                valueA = a.gameName;
                valueB = b.gameName;
                break;

            case "author":
                valueA = a.authors[0]?.authorName ?? null;
                valueB = b.authors[0]?.authorName ?? null;
                break;

            case "bggRating":
                valueA = a.bggRating;
                valueB = b.bggRating;
                break;

            case "myRating":
                valueA = a.myRating;
                valueB = b.myRating;
                break;

            case "playerCount":
                valueA = a.optimalPlayerCount;
                valueB = b.optimalPlayerCount;
                break;

            case "relativeRating":
                valueA = a.relativeRating;
                valueB = b.relativeRating;
                break;

            case "changeRelativeRating":
                valueA = a.changeRelativeRating;
                valueB = b.changeRelativeRating;
                break;
        }

        // Fehlende Werte ans Ende
        if (valueA === null && valueB === null) {
            return 0;
        }

        if (valueA === null) {
            return 1;
        }

        if (valueB === null) {
            return -1;
        }

        let result: number;

        if (
            typeof valueA === "string" &&
            typeof valueB === "string"
        ) {
            result = valueA.localeCompare(valueB, "de");
        } else {
            result = Number(valueA) - Number(valueB);
        }

        return sortDirection === "asc" ? result : -result;
    });

    const totalPages = Math.ceil(
        sortedBoardgames.length / pageSize
    );

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentBoardgames = sortedBoardgames.slice(
        startIndex,
        endIndex
    );

    function handlePageSizeChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setPageSize(Number(event.target.value));
        setCurrentPage(1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => Math.max(page - 1, 1));
    }

    function goToNextPage() {
        setCurrentPage((page) =>
            Math.min(page + 1, totalPages)
        );
    }

    return (
        <main className="boardgame-table-container">
            <h1>Meine Brettspiele</h1>

            <div className="pagination-top">
                <label htmlFor="page-size">
                    Spiele pro Seite:
                </label>

                <select
                    id="page-size"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>

            <table className="boardgame-table">
                <thead>
                    <tr>
                        <th
                            className="sortable"
                            onClick={() =>
                                handleSort("recentRank")
                            }
                        >
                            Rang{getSortIndicator("recentRank")}
                        </th>

                        <th
                            className="sortable"    
                            onClick={() =>
                                handleSort("gameName")
                            }
                        >
                            Spiel{getSortIndicator("gameName")}
                        </th>

                        <th>
                            Autor
                        </th>

                        <th
                            className="sortable"  
                            onClick={() =>
                                handleSort("bggRating")
                            }
                        >
                            BGG{getSortIndicator("bggRating")}
                        </th>

                        <th
                            className="sortable"   
                            onClick={() =>
                                handleSort("myRating")
                            }
                        >
                            Meine Bewertung
                            {getSortIndicator("myRating")}
                        </th>

                        <th
                            className="sortable"   
                            onClick={() =>
                                handleSort("playerCount")
                            }
                        >
                            Spieler
                            {getSortIndicator("playerCount")}
                        </th>

                        <th
                            className="sortable"   
                            onClick={() =>
                                handleSort("relativeRating")
                            }
                        >
                            Relative Bewertung
                            {getSortIndicator("relativeRating")}
                        </th>

                        <th
                            className="sortable"   
                            onClick={() =>
                                handleSort("changeRelativeRating")
                            }
                        >
                            Änderung
                            {getSortIndicator(
                                "changeRelativeRating"
                            )}
                        </th>

                        <th>Details</th>
                    </tr>
                </thead>

                <tbody>
                    {currentBoardgames.map((game) => (
                        <tr key={game.id}>
                            <td>
                                {game.recentRank ?? "-"}
                            </td>

                            <td>
                                {game.gameName}
                            </td>

                            <td>
                                {game.authors.length > 0
                                    ? game.authors
                                        .map(
                                            (author) =>
                                                author.authorName
                                        )
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

                                {game.optimalPlayerCount !== null && (
                                    <span className="optimal-player-count">
                                        {" "}
                                        (optimal:{" "}
                                        {game.optimalPlayerCount})
                                    </span>
                                )}
                            </td>

                            <td>
                                {game.relativeRating?.toFixed(2) ?? "-"}
                            </td>

                            <td>
                                {game.changeRelativeRating?.toFixed(2) ??
                                    "-"}
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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevious={goToPreviousPage}
                onNext={goToNextPage}
                onPageChange={setCurrentPage}
            />
        </main>
    );
}

export default BoardgameTable;