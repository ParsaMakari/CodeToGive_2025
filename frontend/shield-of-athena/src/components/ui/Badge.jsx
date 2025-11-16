import React from "react";

export default function Badge({ children, className = "", ...props }) {
    return (
        <span
            className={
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-[#f3e8ff] text-[#5b21b6] " +
                className
            }
            {...props}
        >
      {children}
    </span>
    );
}
