import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ setUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        setUser(null);
        navigate("/login");
    }, []);

    return null;
}
