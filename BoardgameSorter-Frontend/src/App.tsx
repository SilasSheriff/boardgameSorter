import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home";
import BoardgameTable from "./components/tables/BoardgameTable";
import BoardgameCard from "./components/BoardgameCard/BoardgameCard";

function App() {
    return (
        <BrowserRouter>
            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/boardgames" element={<BoardgameTable />} />
                <Route path="/boardgames/:id" element={<BoardgameCard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;