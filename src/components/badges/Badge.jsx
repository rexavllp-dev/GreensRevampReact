import React from 'react'
import './Badge.scss'
import CustomTypography from '@/library/typography/CustomTypography'

const Badge = ({ color, label }) => {
    return (
        <div className={`${color} productbadge`}>
            <CustomTypography content={label} weight='SEMI-BOLD' color={color === 'best-seller' ? 'WHITE' : 'BLACK'} size='REGULAR' />
        </div>
    )
}

export default Badge