import React from "react";
import { motion } from "framer-motion";

export default function ImpactAreaCard({
                                           icon: Icon,
                                           title,
                                           description,
                                           selected,
                                           onToggle,
                                       }) {
    return (
        <motion.button
            type="button"
            onClick={onToggle}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`impact-card ${selected ? "selected" : ""}`}
            data-testid={`card-impact-${title.toLowerCase().replace(/\s+/g, "-")}`}
        >
            <div className="impact-card-icon">
                <Icon />
            </div>

            <h3>{title}</h3>
            <p>{description}</p>

            {selected && (
                <div className="impact-card-checkmark">
                    ✓
                </div>
            )}
        </motion.button>
    );
}
