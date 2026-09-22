import { useEffect, useState} from "react";
import type { Boardgame, Mechanism } from "../../models/Boardgame";
import {
    fetchMechanisms,
    type BoardgameUpdateRequest
} from "../../api/boardgameApi";
import EntitySelector from "../EntitySelector/EntitySelector";
import "./BoardgameEditForm.css";

interface BoardgameEditFormProps {
    boardgame: Boardgame;
    onSave: (update: BoardgameUpdateRequest) => void;
    onCancel: () => void;
}

export default function BoardgameEditForm({
    boardgame,
    onSave,
    onCancel
}: BoardgameEditFormProps) {

    const [gameName, setGameName] = useState(
        boardgame.gameName
    );

    const [mechanisms, setMechanisms] =
        useState<Mechanism[]>([]);

    const [optimalPlayerCount, setOptimalPlayerCount] =
        useState(
            boardgame.optimalPlayerCount ?? ""
        );

    const [yearOfRelease, setYearOfRelease] =
        useState(
            boardgame.yearOfRelease ?? ""
        );

    const [myRating, setMyRating] =
        useState(
            boardgame.myRating ?? ""
        );

    const [bggRating, setBggRating] =
        useState(
            boardgame.bggRating ?? ""
        );

    const [complexity, setComplexity] =
        useState(
            boardgame.complexity ?? ""
        );

    const [interactivity, setInteractivity] =
        useState(
            boardgame.interactivity ?? ""
        );

        
    const [selectedPlayerCounts, setSelectedPlayerCounts] =
    useState<Set<number>>(
        new Set(boardgame.playerCount)
    );

    const [newPlayerCount, setNewPlayerCount] =
        useState("");

    const [selectedMechanismIds, setSelectedMechanismIds] =
        useState<Set<number>>(
            new Set(
                boardgame.mechanisms.map(
                    mechanism => mechanism.id
                )
            )
        );

    useEffect(() => {
        fetchMechanisms()
            .then(setMechanisms)
            .catch(error => {
                console.error(
                    "Mechanismen konnten nicht geladen werden:",
                    error
                );
            });
    }, []);

    const handleSubmit = () => {
       

        const update: BoardgameUpdateRequest = {
            gameName,

            playerCount:
                Array.from(selectedPlayerCounts),

            optimalPlayerCount:
                optimalPlayerCount === ""
                    ? null
                    : Number(optimalPlayerCount),

            yearOfRelease:
                yearOfRelease === ""
                    ? null
                    : Number(yearOfRelease),

            myRating:
                myRating === ""
                    ? null
                    : Number(myRating),

            bggRating:
                bggRating === ""
                    ? null
                    : Number(bggRating),

            complexity:
                complexity === ""
                    ? null
                    : Number(complexity),

            interactivity:
                interactivity === ""
                    ? null
                    : Number(interactivity),

            mechanismIds:
                Array.from(selectedMechanismIds)
        };

        onSave(update);
    };

    return (
        <form
            className="boardgame-edit-form"
            onSubmit={handleSubmit}
        >
            <h1>Brettspiel bearbeiten</h1>

            <div className="boardgame-edit-field">
                <label>
                    Spielname

                    <input
                        type="text"
                        value={gameName}
                        onChange={event =>
                            setGameName(event.target.value)
                        }
                    />
                </label>
            </div>

    
    <div className="boardgame-edit-field">
        <label>
            Spielerzahl
        </label>

        <div className="player-count-list">
            {Array.from(selectedPlayerCounts)
                .sort((a, b) => a - b)
                .map(playerCount => (
                    <label
                        key={playerCount}
                        className="player-count-option"
                    >
                        <input
                            type="checkbox"
                            checked={true}
                            onChange={() => {
                                const newPlayerCounts =
                                    new Set(selectedPlayerCounts);

                                newPlayerCounts.delete(
                                    playerCount
                                );

                                setSelectedPlayerCounts(
                                    newPlayerCounts
                                );
                            }}
                        />

                        <span>{playerCount}</span>
                    </label>
                ))}
        </div>

            <div className="player-count-add">
                <input
                    type="number"
                    min="1"
                    value={newPlayerCount}
                    onChange={event =>
                        setNewPlayerCount(
                            event.target.value
                        )
                    }
                    placeholder="Weitere Spielerzahl"
                />

                <button
                    type="button"
                    onClick={() => {
                        const playerCount =
                            Number(newPlayerCount);

                        if (playerCount < 1) {
                            return;
                        }

                        const newPlayerCounts =
                            new Set(selectedPlayerCounts);

                        newPlayerCounts.add(playerCount);

                        setSelectedPlayerCounts(
                            newPlayerCounts
                        );

                        setNewPlayerCount("");
                    }}
                >
                    +
                </button>
            </div>
        </div>


            <div className="boardgame-edit-field">
                <label>
                    Optimale Spielerzahl

                    <input
                        type="number"
                        value={optimalPlayerCount}
                        onChange={event =>
                            setOptimalPlayerCount(
                                event.target.value
                            )
                        }
                    />
                </label>
            </div>

            <div className="boardgame-edit-field">
                <label>
                    Erscheinungsjahr

                    <input
                        type="number"
                        value={yearOfRelease}
                        onChange={event =>
                            setYearOfRelease(
                                event.target.value
                            )
                        }
                    />
                </label>
            </div>

            <div className="boardgame-edit-field">
                <label>
                    Meine Bewertung

                    <input
                        type="number"
                        value={myRating}
                        onChange={event =>
                            setMyRating(
                                event.target.value
                            )
                        }
                    />
                </label>
            </div>

            <div className="boardgame-edit-field">
                <label>
                    BGG-Bewertung

                    <input
                        type="number"
                        step="0.1"
                        value={bggRating}
                        onChange={event =>
                            setBggRating(
                                event.target.value
                            )
                        }
                    />
                </label>
            </div>

            <div className="boardgame-edit-field">
                <label>
                    Komplexität

                    <input
                        type="number"
                        value={complexity}
                        onChange={event =>
                            setComplexity(
                                event.target.value
                            )
                        }
                    />
                </label>
            </div>

            <div className="boardgame-edit-field">
                <label>
                    Interaktivität

                    <input
                        type="number"
                        value={interactivity}
                        onChange={event =>
                            setInteractivity(
                                event.target.value
                            )
                        }
                    />
                </label>
            </div>

            <EntitySelector
                label="Spielmechanismen"
                entities={mechanisms}
                selectedIds={selectedMechanismIds}
                getId={mechanism => mechanism.id}
                getLabel={mechanism => mechanism.mechanismName}
                onSelectionChange={setSelectedMechanismIds}
            />

            <div className="boardgame-edit-actions">
                <button
                    className="boardgame-edit-save"
                    type="submit"
                >
                    Speichern
                </button>

                <button
                    className="boardgame-edit-cancel"
                    type="button"
                    onClick={onCancel}
                >
                    Abbrechen
                </button>
            </div>
        </form>
    );
}