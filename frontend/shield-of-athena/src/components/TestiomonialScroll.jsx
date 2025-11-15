import { useTranslation } from "react-i18next";
import "./css/TestimonialScroll.scss";
import avatar from "../assets/avatar_picture.jpg";

export default function TestiomonialScroll() {
    const { t } = useTranslation();

    // Get array from translations
    const testimonials = t("testimonials.items", { returnObjects: true });

    return (
        <div className="scroll-wrapper">
            <div className="scroll-content">
                {testimonials
                    .concat(testimonials)
                    .map((item, i) => (
                        <div key={i} className="scroll-card">
                            <p className="wheel-text">{item.text}</p>

                            <div className="wheel-person">
                                <img src={avatar} className="wheel-avatar" alt="" />
                                <div>
                                    <p className="wheel-name">{item.name}</p>
                                    <p className="wheel-role">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
