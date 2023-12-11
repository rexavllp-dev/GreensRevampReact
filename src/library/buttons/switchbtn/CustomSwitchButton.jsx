"use client";
import React from 'react'
import './CustomSwitchButton.scss'
import CustomTypography from '@/library/typography/CustomTypography'

const CustomSwitchButton = ({ active, setActive }) => {
    return (
        <div className='customswitchbtn'>
            <div className={active === 0 ? "item active" : "item"} onClick={() => setActive(0)}>
                <CustomTypography content="Individual" color={active === 0 ? "PURE-WHITE" : "BLACK-SECONDARY"} size="MEDIUM" weight="SEMI-BOLD" />
            </div>
            <div className={active === 1 ? "item active" : "item"} onClick={() => setActive(1)}>
                <CustomTypography content="Company" color={active === 1 ? "PURE-WHITE" : "BLACK-SECONDARY"} size="MEDIUM" weight="SEMI-BOLD" />
            </div>
        </div>
    )
}

export default CustomSwitchButton