import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfettiEffect({ trigger }) {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        if (trigger) {
            const colors = ["#a78bfa", "#c4b5fd", "#d8b4fe", "#e9d5ff", "#8b5cf6"];

            const pieces = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.3,
                duration: 1 + Math.random() * 0.5,
            }));

            setConfetti(pieces);

            setTimeout(() => setConfetti([]), 2000);
        }
    }, [trigger]);

    return (
        <div className="confetti-container">
            <AnimatePresence>
                {confetti.map((piece) => (
                    <motion.div
                        key={piece.id}
                        initial={{
                            x: `${piece.x}vw`,
                            y: "-10vh",
                            rotate: 0,
                            opacity: 1,
                        }}
                        animate={{
                            y: "110vh",
                            rotate: 360,
                            opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: piece.duration,
                            delay: piece.delay,
                            ease: "linear",
                        }}
                        style={{
                            position: "absolute",
                            width: "10px",
                            height: "10px",
                            backgroundColor: piece.color,
                            borderRadius: "2px",
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
