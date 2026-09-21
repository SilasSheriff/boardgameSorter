import { useState, type FormEvent } from "react";
import type { Boardgame } from "../../models/Boardgame";
import "./BoardgameEditForm.css";

interface BoardgameEditFormProps {
    boardgame: Boardgame;
    onSave: (updatedBoardgame: Boardgame) => void;
    onCancel: () => void;
}

export default function BoardgameEditForm({
    boardgame,
    onSave,
    onCancel
}: BoardgameEditFormProps) {

    const [gameName, setGameName] = useState(boardgame.gameName);

    const [optimalPlayerCount, setOptimalPlayerCount] = useState(
        boardgame.optimalPlayerCount ?? ""
    );

    const [yearOfRelease, setYearOfRelease] = useState(
        boardgame.yearOfRelease ?? ""
    );

    const [myRating, setMyRating] = useState(
        boardgame.myRating ?? ""
    );

    const [bggRating, setBggRating] = useState(
        boardgame.bggRating ?? ""
    );

    const [complexity, setComplexity] = useState(
        boardgame.complexity ?? ""
    );

    const [interactivity, setInteractivity] = useState(
        boardgame.interactivity ?? ""
    );

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        const updatedBoardgame: Boardgame = {
            ...boardgame,
            gameName,
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
                    : Number(interactivity)
        };

        onSave(updatedBoardgame);
    };

    return (
        <form className="boardgame-edit-form" onSubmit={handleSubmit}>

            <div className="boardgame-edit-field">
                <label>
                    Spielname
                    <input
                        type="text"
                        value={gameName}
                        onChange={(event) =>
                            setGameName(event.target.value)
                        }
                    />
                </label>
            </div>

            <div className="boardgame-edit-field">
                <label>
                    Optimale Spielerzahl
                    <input
                        type="number"
                        value={optimalPlayerCount}
                        onChange={(event) =>
                            setOptimalPlayerCount(event.target.value)
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
                        onChange={(event) =>
                            setYearOfRelease(event.target.value)
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
                        onChange={(event) =>
                            setMyRating(event.target.value)
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
                        onChange={(event) =>
                            setBggRating(event.target.value)
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
                        onChange={(event) =>
                            setComplexity(event.target.value)
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
                        onChange={(event) =>
                            setInteractivity(event.target.value)
                        }
                    />
                </label>
            </div>
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