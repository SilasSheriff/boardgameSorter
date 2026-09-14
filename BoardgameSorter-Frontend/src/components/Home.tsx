import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <main className="home">
            <h1>BoardgameSorter</h1>

            <p>
                Verwalte und bewerte deine Brettspielsammlung.
            </p>

            <div className="home-links">
                <Link to="/boardgames">
                    Meine Brettspiele
                </Link>

                <Link to="/rankings">
                    Rangliste importieren
                </Link>
            </div>
        </main>
    );
}

export default Home;