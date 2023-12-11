"use client";

import React, { useEffect, useState } from 'react'
// import { ArrowUpIcon } from '../../components/custom-icons'
import "./ScrollTop.scss"
import { ArrowUpIcon } from '../customicons';
const ScrollTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {
                isVisible &&
                <div className="back_btn_icon" onClick={scrollToTop}>
                    <ArrowUpIcon color="white" width={20} height={20} />
                </div>
            }
        </div>

    )
}

export default ScrollTop