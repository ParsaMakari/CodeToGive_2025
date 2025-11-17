import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatFloating from "./ChatFloating";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

function Layout({ children }) {
    const {checkAuthStatus} = useAuth();
  
    useEffect(() => {
        checkAuthStatus()
    }, []);

    return (
        <div className="app-shell">
            <Navbar/>
                <main className="app-shell__main">{children}</main>
            <Footer />
            <ChatFloating />
        </div>
    );
}

export default Layout;
