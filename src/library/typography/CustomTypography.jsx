"use client";
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import config from '@/constants/config.json';
import useWindowSize from '@/hooks/useWindowSize';


const CustomTypography = (props) => {

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    return (
        <p
            {...props}
            style={{
                ...props.style,
                color: config?.COLORS[`${props.color.toUpperCase()}`]?.value,
                fontWeight: config?.WEIGHT[`${props.weight.toUpperCase()}`]?.value,
                fontSize: isMobileView ? config?.SIZE[`${props.size.toUpperCase()}`]?.mobile : config?.SIZE[`${props.size.toUpperCase()}`]?.value ,
            }}
        >
            {props?.content}
        </p>
    )

}


CustomTypography.propTypes = {
    color: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    weight: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
}

CustomTypography.defaultProps = {
    color: 'black',
    size: 'regular',
    weight: 'regular',
    content: '',
}

export default CustomTypography