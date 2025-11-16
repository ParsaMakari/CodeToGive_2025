import "../css/Footer.scss";
import { useTranslation } from "react-i18next";

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <p className="site-footer__copy">
                    © {new Date().getFullYear()} {t("layout.footer.orgName")} –{" "}
                    {t("layout.footer.rights")}
                </p>

                <div className="site-footer__links">
                    <a
                        href="http://shieldofathena.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t("layout.footer.links.officialSite")}
                    </a>
                    <a href="#get-help">{t("layout.footer.links.getHelp")}</a>
                    <a href="#contact">{t("layout.footer.links.contact")}</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
