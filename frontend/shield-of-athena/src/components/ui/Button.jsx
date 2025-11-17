import React from "react";

export default function Button({
                                   children,
                                   variant = "solid",
                                   size = "md",
                                   className = "",
                                   ...props
                               }) {
    const base =
        "inline-flex items-center justify-center rounded-full font-medium transition-all border cursor-pointer";
    const variants = {
        solid:
            "bg-[#5b4b8a] text-white border-transparent hover:opacity-90",
        outline:
            "bg-transparent text-[#5b4b8a] border-[#5b4b8a] hover:bg-[#f4f0ff]",
        ghost:
            "bg-transparent text-[#5b4b8a] border-transparent hover:bg-[#f4f0ff]",
    };
    const sizes = {
        sm: "text-sm px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-5 py-2.5",
    };

    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
