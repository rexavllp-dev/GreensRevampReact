"use client";

import React from 'react';
import "./ChangePassword.scss";
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import CustomTypography from '@/library/typography/CustomTypography';

const ChangePassword = () => {

    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
        old_password: '',
        new_password: '',
        confirm_password: '',
    })

    const [errors, setErrors] = React.useState({
        old_password: {
            error: false,
            message: ''
        },
        new_password: {
            error: false,
            message: ''
        },
        confirm_password: {
            error: false,
            message: ''
        }
    })

    const handleInputChange = ({ e, country }) => {

        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: {
                error: false,
                message: ''
            }
        }))

    }

    const validateForm = () => {
        let isValid = true;
        // Validate confirm password
        if (!formData.old_password?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                old_password: { error: true, message: 'Old password is required' }
            }));
            isValid = false;
        }
        else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                old_password: { error: false, message: '' }
            }));
        }

        // Validate password
        if (!formData.new_password?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                new_password: { error: true, message: 'Password is required' }
            }));
            isValid = false;
        }
        else if (!formData.new_password?.match(UPPERCASE_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                new_password: { error: true, message: 'Password must contain at least one uppercase letter' }
            }));
            isValid = false;
        }
        else if (!formData.new_password?.match(NUMBER_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                new_password: { error: true, message: 'Password must contain at least one number' }
            }));
            isValid = false;
        }
        else if (!formData.new_password?.match(SPECIAL_CHARS_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                new_password: { error: true, message: 'Password must contain at least one special character' }
            }));
            isValid = false;
        }
        else if (formData.new_password?.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                new_password: { error: true, message: 'Password must be at least 8 characters long' }
            }));
            isValid = false;
        }
        else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: false, message: '' }
            }));
        }

        // Validate confirm password
        if (!formData.confirm_password?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: { error: true, message: 'Confirm password is required' }
            }));
            isValid = false;
        }
        else if ((formData.password !== formData.confirm_password) || (!formData.confirm_password?.length)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: { error: true, message: 'Passwords do not match' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: { error: false, message: '' }
            }));
        }

        return isValid;
    };

    const handleSubmit = () => {

    }


    return (
        <div className='changepassword-container'>
            <div className="changepassword">
                <div className='header'>
                    <CustomTypography content="Change Your Password" color="BLACK" size="SUPER-LARGE" weight="MEDIUM" />
                    {/* <CustomTypography content="Lorem ipsum dolor" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                </div>

                <div className='form'>
                    <CustomInput
                        isInvalid={errors.old_password.error}
                        errMsg={errors.old_password.message}
                        type='password'
                        name={'old_password'}
                        value={formData.old_password}
                        onChange={(e) => {
                            handleInputChange({ e });
                        }}
                        placeholder="Old Password"
                        label={'Old Password'}
                        isRequired={true}
                        haveProgress={false}
                    />

                    <CustomInput
                        isInvalid={errors.new_password.error}
                        errMsg={errors.new_password.message}
                        type='password'
                        name={'new_password'}
                        value={formData.new_password}
                        onChange={(e) => {
                            handleInputChange({ e });
                        }}
                        placeholder="New Password"
                        label={'New Password'}
                        isRequired={true}
                        haveProgress={true}
                    />
                    <CustomInput
                        isInvalid={errors.confirm_password.error}
                        errMsg={errors.confirm_password.message}
                        type='password'
                        value={formData.confirm_password}
                        name={'confirm_password'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        placeholder="Confirm Password"
                        label={'Confirm Password'}
                        isRequired={true}
                        haveProgress={false}
                    />


                    <div className='submitbtn'>
                        <CustomButton fullWidth label='Save' onClick={handleSubmit} variant='primary' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword