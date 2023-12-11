"use client";
import React from 'react';
import PropTypes from "prop-types";
import "./CustomButton.scss"


export const CustomButton = (props) => {
    const { fullWidth, disabled, variant, label, onClick, isTrailingIcon, icon, haveIcon, type, borderNone, loading, height } = props;

    return (
        <button className={`${variant} custombtn`} style={{ width: fullWidth ? '100%' : 'auto', height: height && height }} onClick={onClick}>
            <div className='custombtn-label' >
                {label}
            </div >
        </button >
    );
};

CustomButton.propTypes = {
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    variant: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
    isTrailingIcon: PropTypes.bool,
    icon: PropTypes.string,
    haveIcon: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    borderNone: PropTypes.bool,
    loading: PropTypes.bool,
};

CustomButton.defaultProps = {
    fullWidth: false,
    disabled: false,
    variant: "primary",
    label: "",
    onClick: () => { },
    isTrailingIcon: false,
    icon: '',
    haveIcon: false,
    type: 'button',
    borderNone: false,
    loading: false,
};

export default CustomButton;
