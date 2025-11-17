import { useEffect } from "react";
import ImpactJourney from "../components/ImpactJourney";
import HomePage from "../pages/HomePage";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

// I know someone is working omn dashboard its just a temp for testing
function Dashboard() {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        (!auth.user) && navigate("/login", {replace:true} );
    }, []);     

    (auth.user===null) && navigate("/login", {replace:true} );
    return (
        <>
            <HomePage />
        </>
    );
}

export default Dashboard;
