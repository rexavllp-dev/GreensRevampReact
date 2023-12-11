import React from 'react'
import './AuthButton.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import IconRenderer from '@/utils/IconRender'

const AuthButton = ({ icon, onClick, backgroundColor, label }) => {
    return (
        <button className='authbutton'
            onClick={onClick} style={{ backgroundColor: backgroundColor }}>
            <IconRenderer iconName={icon} color='#ffffff' />
            <CustomTypography content={label} color={"PURE-WHITE"} size="MEDIUM" weight="SEMI-BOLD" />
        </button>
    )
}

export default AuthButton