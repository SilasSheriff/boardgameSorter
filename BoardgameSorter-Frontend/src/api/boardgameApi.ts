import type {
    Boardgame,
    Mechanism
} from "../models/Boardgame";

const API_URL = "/api/boardgames";

export async function fetchBoardgames(): Promise<Boardgame[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}

export async function fetchBoardgame(
    id: number
): Promise<Boardgame> {

    const response =
        await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}

export async function fetchMechanisms(): Promise<Mechanism[]> {
    const response =
        await fetch("/api/mechanisms");

    if (!response.ok) {
        throw new Error(
            "Mechanismen konnten nicht geladen werden."
        );
    }

    return response.json();
}

export interface BoardgameUpdateRequest {
    gameName?: string;
    optimalPlayerCount?: number | null;
    yearOfRelease?: number | null;
    myRating?: number | null;
    bggRating?: number | null;
    complexity?: number | null;
    interactivity?: number | null;
    mechanismIds?: number[];
}

export async function patchBoardgame(
    id: number,
    update: BoardgameUpdateRequest
): Promise<Boardgame> {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        }
    );

    if (!response.ok) {
        throw new Error(
            `HTTP error: ${response.status}`
        );
    }

    return await response.json();
}