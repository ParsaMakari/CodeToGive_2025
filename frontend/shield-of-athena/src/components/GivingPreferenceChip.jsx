import React from "react";
import { motion } from "framer-motion";

export default function GivingPreferenceChip({
                                                 icon: Icon,
                                                 label,
                                                 selected,
                                                 onToggle,
                                             }) {
    return (
        <motion.button
            type="button"
            onClick={onToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`giving-chip ${selected ? "selected" : ""}`}
            data-testid={`chip-preference-${label.toLowerCase().replace(/\s+/g, "-")}`}
        >
            <Icon className="chip-icon" />
            <span>{label}</span>
        </motion.button>
    );
}
