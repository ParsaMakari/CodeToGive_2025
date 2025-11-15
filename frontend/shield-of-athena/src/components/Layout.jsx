import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatFloating from "./ChatFloating";

function Layout({ user, onLogout, children }) {
    return (
        <div className="app-shell">
            <Navbar user={user} onLogout={onLogout} />
            <main className="app-shell__main">{children}</main>
            <Footer />
            <ChatFloating />
        </div>
    );
}

export default Layout;
