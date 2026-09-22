import { useEffect, useState } from "react";
import type { Mechanism } from "../../models/Boardgame";
import { fetchMechanisms } from "../../api/boardgameApi";

interface MechanismSelectorProps {
    selectedMechanismIds: Set<number>;
    onSelectionChange: (ids: Set<number>) => void;
}

export default function MechanismSelector({
    selectedMechanismIds,
    onSelectionChange
}: MechanismSelectorProps) {

    const [mechanisms, setMechanisms] = useState<Mechanism[]>([]);

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

    const toggleMechanism = (mechanismId: number) => {
        const newIds = new Set(selectedMechanismIds);

        if (newIds.has(mechanismId)) {
            newIds.delete(mechanismId);
        } else {
            newIds.add(mechanismId);
        }

        onSelectionChange(newIds);
    };

    const sortedMechanisms = [...mechanisms].sort(
        (a, b) =>
            a.mechanismName.localeCompare(
                b.mechanismName,
                "de",
                {
                    sensitivity: "base"
                }
            )
    );

    return (
        <div className="boardgame-edit-field">
            <label>
                Spielmechanismen
            </label>

            <div className="mechanism-list">
                {sortedMechanisms.map(mechanism => (
                    <label
                        key={mechanism.id}
                        className="mechanism-option"
                    >
                        <input
                            type="checkbox"
                            checked={selectedMechanismIds.has(
                                mechanism.id
                            )}
                            onChange={() =>
                                toggleMechanism(mechanism.id)
                            }
                        />

                        <span>
                            {mechanism.mechanismName}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}