
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardgameList from "./components/BoardgameList";
import BoardgameCard from "./components/BoardgameCard";

function App() {
    return (
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path="/" element={<BoardgameList />} />
                    <Route path="/boardgames/:id" element={<BoardgameCard />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;

