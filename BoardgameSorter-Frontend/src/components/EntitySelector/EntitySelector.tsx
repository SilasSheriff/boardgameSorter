import { useState } from "react";
import "./EntitySelector.css";

interface EntitySelectorProps<T> {
    label: string;
    entities: T[];
    selectedIds: Set<number>;
    getId: (entity: T) => number;
    getLabel: (entity: T) => string;
    onSelectionChange: (ids: Set<number>) => void;
}

export default function EntitySelector<T>({
    label,
    entities,
    selectedIds,
    getId,
    getLabel,
    onSelectionChange
}: EntitySelectorProps<T>) {

    const [searchTerm, setSearchTerm] = useState("");

    const toggleEntity = (id: number) => {
        const newIds = new Set(selectedIds);

        if (newIds.has(id)) {
            newIds.delete(id);
        } else {
            newIds.add(id);
        }

        onSelectionChange(newIds);
    };

    const filteredEntities = entities
        .filter(entity =>
            getLabel(entity)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        .sort((a, b) =>
            getLabel(a).localeCompare(
                getLabel(b),
                "de",
                {
                    sensitivity: "base"
                }
            )
        );

    return (
        <div className="boardgame-edit-field">
            <label>
                {label}
            </label>

            <input
                className="entity-search"
                type="text"
                placeholder={`${label} suchen...`}
                value={searchTerm}
                onChange={event =>
                    setSearchTerm(event.target.value)
                }
            />

            <div className="entity-list">
                {filteredEntities.map(entity => {
                    const id = getId(entity);

                    return (
                        <label
                            key={id}
                            className="entity-option"
                        >
                            <input
                                type="checkbox"
                                checked={selectedIds.has(id)}
                                onChange={() =>
                                    toggleEntity(id)
                                }
                            />

                            <span>
                                {getLabel(entity)}
                            </span>
                        </label>
                    );
                })}

                {filteredEntities.length === 0 && (
                    <p className="entity-no-results">
                        Keine Treffer
                    </p>
                )}
            </div>
        </div>
    );
}