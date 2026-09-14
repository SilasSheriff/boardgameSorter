import type { Boardgame } from "../models/Boardgame";

const API_URL = "/api/boardgames";

export async function fetchBoardgames(): Promise<Boardgame[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}

export async function fetchBoardgame(id: number): Promise<Boardgame> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}