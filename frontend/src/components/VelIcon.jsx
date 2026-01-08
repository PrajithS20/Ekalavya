import React from 'react';

export const VelIcon = ({ size = 24, className = "" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Spear Head (Vel) */}
            <path d="M12 2L12 22" /> {/* Shaft */}
            <path d="M12 2C12 2 7 8 7 12C7 15 12 16 12 16C12 16 17 15 17 12C17 8 12 2 12 2Z" /> {/* Blade */}
            <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.5" /> {/* Gem/Center */}
        </svg>
    );
};

export default VelIcon;
