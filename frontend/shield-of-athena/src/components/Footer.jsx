import "../css/Footer.scss";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <p className="site-footer__copy">
                    © {new Date().getFullYear()} Shield of Athena – All rights reserved.
                </p>
                <div className="site-footer__links">
                    <a href="https://shieldofathena.com" target="_blank" rel="noreferrer">
                        Official website
                    </a>
                    <a href="#get-help">Get help</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
