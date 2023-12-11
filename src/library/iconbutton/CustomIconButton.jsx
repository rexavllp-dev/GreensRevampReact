"use client";
import React, { useState } from 'react'
import './CustomIconButton.scss'
import IconRenderer from '@/utils/IconRender';

const CustomIconButton = ({ icon, variant, backgroundColor, iconColor, onClick }) => {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <button className='custom-iconbtn'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick} style={{ backgroundColor: isHovered ? '#32893b' : '#ffffff', border: isHovered ? "none" : "2px solid #32893b" }}>
            <IconRenderer iconName={icon} color={isHovered ? '#ffffff' : '#32893b'} />
        </button>
        // <button className='custom-iconbtn' 
        //     onClick={onClick} style={{ backgroundColor: backgroundColor, border: variant === 'primary' ? 'none' : `2px solid ${iconColor}` }}>
        //     <IconRenderer iconName={icon} color={iconColor} />
        // </button>
    )
}

export default CustomIconButton