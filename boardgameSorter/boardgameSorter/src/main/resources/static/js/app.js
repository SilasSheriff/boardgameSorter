// ================================
// Configuration
// ================================

const API_URL = "/api/boardgames";


// ================================
// State
// ================================

let boardgames = [];


// ================================
// API
// ================================

async function fetchBoardgames() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
}


// ================================
// Rendering
// ================================

function renderBoardgames(games) {
    const container = document.getElementById("boardgames");

    container.innerHTML = "";

    games.forEach(game => {
        const card = createBoardgameCard(game);
        container.appendChild(card);
    });
}


function createBoardgameCard(game) {
    const card = document.createElement("div");
    card.classList.add("boardgame-card");

    card.innerHTML = `
        <h2>${game.gameName}</h2>
        <p>Bewertung: ${game.bggRating ?? "-"}</p>
        <p>Spieler: ${game.playerCount ?? "-"}</p>
        <p>Komplexität: ${game.complexity ?? "-"}</p>
    `;

    return card;
}


// ================================
// Initialization
// ================================

async function init() {
    try {
        boardgames = await fetchBoardgames();
        renderBoardgames(boardgames);
    } catch (error) {
        console.error("Fehler beim Laden der Brettspiele:", error);
    }
}

init();