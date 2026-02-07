import React from 'react';

const variants = {
    primary: "bg-oxigen-dark text-white hover:bg-oxigen-light hover:shadow-lg shadow-oxigen-dark/30",
    secondary: "bg-white text-oxigen-dark border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm",
    outline: "border-2 border-oxigen-dark text-oxigen-dark hover:bg-gray-50",
    ghost: "text-gray-600 hover:text-oxigen-light",
    navLink: "text-gray-600 hover:text-oxigen-light font-medium uppercase tracking-wide"
};

const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-3.5 text-lg",
    icon: "p-2"
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
    href,
    ...props
}) {
    const baseClasses = "rounded-lg font-semibold transition-all duration-300 inline-block text-center cursor-pointer";
    const variantClasses = variants[variant] || variants.primary;
    const sizeClasses = sizes[size] || sizes.md;

    const finalClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    if (href) {
        return (
            <a href={href} className={finalClassName} onClick={onClick} {...props}>
                {children}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={finalClassName} {...props}>
            {children}
        </button>
    );
}
