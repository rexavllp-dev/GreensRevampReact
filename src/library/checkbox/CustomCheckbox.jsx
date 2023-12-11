"use client";
import React from 'react'
import PropTypes from 'prop-types';
import "./CustomCheckbox.scss"
import { Checkbox } from '@nextui-org/react';
import CustomTypography from '../typography/CustomTypography';

const CustomCheckbox = ({ name, value, onChange, disabled, placeholder, label, data, isMasterLabel, masterLabel, color, isRequired, isInvalid, errMsg, rounded }) => {

    return (
        <div>
            <Checkbox
                isRequired={isRequired}
                classNames={{
                    label: rounded ? "customcheckbox-label-rounded" : "customcheckbox-label", // default"customcheckbox-label",
                    wrapper: "customcheckbox-wrapper",
                    base: "customcheckbox-base",
                }}
                name={name}
                color='primary'
                // onChange={onChange}
                // value={value}
                radius={rounded ? "full" : "none"}
                isSelected={value}
                onValueChange={onChange}
                isInvalid={isInvalid}
            >
                <div className='flex'>
                    {label}
                    {isRequired && <span style={{ paddingLeft: '2px', color: '#F41260' }}>*</span>}
                </div>
                {/* <span className='flex'>
                    <CustomTypography content={label} />
                </span> */}
            </Checkbox >
            <p className="errmsg pt-1">{isInvalid ? errMsg : ''}</p>
        </div>
    )

}

CustomCheckbox.propTypes = {
    isMasterLabel: PropTypes.bool.isRequired,
    masterLabel: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    disabled: PropTypes.bool.isRequired,
    required: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    helperText: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

CustomCheckbox.defaultProps = {
    name: "",
    color: "",
    type: "",
    label: "",
    value: "",
    data: [],
    masterLabel: "",
    isMasterLabel: false,
    disabled: false,
    required: false,
    error: false,
    helperText: "",
    placeholder: "",
    // size: "medium",
    onChange: () => { },
};

export default CustomCheckbox