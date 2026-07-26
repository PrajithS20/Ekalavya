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
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            className={className}
        >
            {/* Sharp Spear Head */}
            <path d="M12 1 L7 12 L12 15 L17 12 Z" /> 
            {/* Center Line and Shaft */}
            <path d="M12 1 L12 23" />
            {/* Minimal Base Crossbar */}
            <path d="M9 15 L15 15" strokeWidth="2" />
        </svg>
    );
};

export default VelIcon;
