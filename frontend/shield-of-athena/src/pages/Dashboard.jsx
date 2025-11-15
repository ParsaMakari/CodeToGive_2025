import ImpactJourney from "../components/ImpactJourney";
import HomePage from "../pages/HomePage";

// I know someone is working omn dashboard its just a temp for testing
function Dashboard({ user }) {
    return (
        <>
            <HomePage user={user} />
            <ImpactJourney />
        </>
    );
}

export default Dashboard;
