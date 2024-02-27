"use client";

import React, { useEffect, useState } from 'react'
// import { ArrowUpIcon } from '../../components/custom-icons'
import "./ScrollTop.scss"
import { ArrowUpIcon } from '../customicons';
const ScrollTop = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined" && window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        typeof window !== "undefined" && window.addEventListener('scroll', handleScroll);

        return () => {
            typeof window !== "undefined" && window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: 'smooth' });
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