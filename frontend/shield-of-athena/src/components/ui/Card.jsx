import React from "react";

export function Card({ children, className = "" }) {
    return (
        <div
            className={
                "rounded-2xl bg-white shadow-lg border border-[#e5e7eb] " +
                className
            }
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }) {
    return (
        <div className={"px-6 pt-6 pb-2 " + className}>
            {children}
        </div>
    );
}

export function CardContent({ children, className = "" }) {
    return (
        <div className={"px-6 pb-6 pt-2 space-y-4 " + className}>
            {children}
        </div>
    );
}
