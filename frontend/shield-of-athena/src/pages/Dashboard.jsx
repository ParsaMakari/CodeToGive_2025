import ImpactJourney from "../components/ImpactJourney";
import Chat from "../components/Chat";
import { Link } from "react-router-dom";

// I know someone is working omn dashboard its just a temp for testing
function Dashboard({ user }) {
    return (
        <>
        <div className="auth">
            <div className="auth-card">
                <h1 className="auth-title">Welcome back, {user}</h1>
                <p>
                    From here we could show your recent donations, saved impact journeys,
                    and quick access to Athena Guide.
                </p>
            </div>
        </div>
            <Link to="/logout" className="auth-logout">
                <span>Log Out</span>
            </Link>
            <ImpactJourney />
            <Chat/>
        </>
    );
}

export default Dashboard;
