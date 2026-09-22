import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Boardgame } from "../../models/Boardgame";
import {
    fetchBoardgame,
    patchBoardgame,
    type BoardgameUpdateRequest
} from "../../api/boardgameApi";
import BoardgameInfo from "./BoardgameInfo";
import BoardgameRating from "./BoardgameRating";
import BoardgameProperties from "./BoardgameProperties";
import BoardgameEditForm from "./BoardgameEditForm";

export default function BoardgameCard() {

    const { id } = useParams<{ id: string }>();

    const [isEditing, setIsEditing] =
        useState(false);

    const [boardgame, setBoardgame] =
        useState<Boardgame | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {

        if (!id) {
            setError("Keine Spiel-ID angegeben.");
            setLoading(false);
            return;
        }

        fetchBoardgame(Number(id))
            .then(setBoardgame)
            .catch(() => {
                setError(
                    "Das Brettspiel konnte nicht geladen werden."
                );
            })
            .finally(() => {
                setLoading(false);
            });

    }, [id]);

    const handleSave = async (
        update: BoardgameUpdateRequest
    ) => {

        if (!boardgame) {
            return;
        }

        setSaving(true);
        setError(null);

        try {

            const updatedBoardgame =
                await patchBoardgame(
                    boardgame.id,
                    update
                );

            setBoardgame(updatedBoardgame);
            setIsEditing(false);

        } catch (error) {

            console.error(
                "Brettspiel konnte nicht gespeichert werden:",
                error
            );

            setError(
                "Das Brettspiel konnte nicht gespeichert werden."
            );

        } finally {

            setSaving(false);
        }
    };

    if (loading) {
        return <p>Brettspiel wird geladen...</p>;
    }

    if (error && !boardgame) {
        return <p>{error}</p>;
    }

    if (!boardgame) {
        return <p>Brettspiel nicht gefunden.</p>;
    }

    return (
        <div className="boardgame-detail">

            {error && (
                <p>{error}</p>
            )}

            {!isEditing ? (

                <>
                    <BoardgameInfo
                        boardgame={boardgame}
                    />

                    <BoardgameRating
                        boardgame={boardgame}
                    />

                    <BoardgameProperties
                        boardgame={boardgame}
                    />

                    <button
                        onClick={() =>
                            setIsEditing(true)
                        }
                    >
                        Bearbeiten
                    </button>
                </>

            ) : (

                <>
                    <BoardgameEditForm
                        boardgame={boardgame}
                        onSave={handleSave}
                        onCancel={() =>
                            setIsEditing(false)
                        }
                    />

                    {saving && (
                        <p>
                            Änderungen werden gespeichert...
                        </p>
                    )}
                </>

            )}

        </div>
    );
}