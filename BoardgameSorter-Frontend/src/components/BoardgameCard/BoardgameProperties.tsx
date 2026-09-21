import type { Boardgame } from "../../models/Boardgame";

interface BoardgamePropertiesProps {
    boardgame: Boardgame;
}

export default function BoardgameProperties({
    boardgame
}: BoardgamePropertiesProps) {
    return (
        <>
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
        </>
    );
}