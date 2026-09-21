import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
    return (
        <nav className="navigation">
            <div className="navigation-content">
                <NavLink to="/" className="navigation-logo">
                    BoardgameSorter
                </NavLink>

                <div className="navigation-links">
                    <NavLink to="/boardgames">
                        Brettspiele
                    </NavLink>

                    <NavLink to="/rankings">
                        Rangliste
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;