"use client";
import React from 'react'
import './CustomSwitchButton.scss'
import CustomTypography from '@/library/typography/CustomTypography'

const CustomSwitchButton = ({ active, setActive, labelOne, labelTwo, isAdvancedDisabled }) => {
    return (
        <div className='customswitchbtn'>
            <div className={active === 0 ? "item active" : "item"} onClick={() => setActive(0)}>
                <CustomTypography content={labelOne} color={active === 0 ? "PURE-WHITE" : "BLACK-SECONDARY"} size="MEDIUM" weight="SEMI-BOLD" />
            </div>
            <div className={isAdvancedDisabled ? "item disabled" : (active === 1 ? "item active" : "item")} onClick={() => {
                if (!isAdvancedDisabled) {
                    setActive(1)
                }
            }}>
                <CustomTypography content={labelTwo} color={active === 1 ? "PURE-WHITE" : "BLACK-SECONDARY"} size="MEDIUM" weight="SEMI-BOLD" />
            </div>
        </div>
    )
}

export default CustomSwitchButton