"use client"
import React, { useEffect } from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTypography from '@/library/typography/CustomTypography'
import "./ResetPassword.scss"
import { useRouter, useSearchParams } from 'next/navigation'
import useWindowSize from '@/hooks/useWindowSize'
import { toast } from 'react-toastify'
import { NUMBER_REGEX, SPECIAL_CHARS_REGEX, UPPERCASE_REGEX } from '@/utils/helpers/validationRules'
import { useDispatch } from 'react-redux'
import { resetPassword } from '@/services/features/authSlice'

const ResetPassword = () => {

    const router = useRouter();
    const dispatch = useDispatch()

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const searchParams = useSearchParams()
    let token = searchParams.get('token');

    const [formData, setFormData] = React.useState({
        password: '',
        confirm_password: '',
    })

    const [errors, setErrors] = React.useState({
        password: {
            error: false,
            message: ''
        },
        confirm_password: {
            error: false,
            message: ''
        }
    })

    const handleInputChange = ({ e }) => {
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


        // Validate password
        if (!formData.password?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password is required' }
            }));
            isValid = false;
        }
        else if (!formData.password?.match(UPPERCASE_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must contain at least one uppercase letter' }
            }));
            isValid = false;
        }
        else if (!formData.password?.match(NUMBER_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must contain at least one number' }
            }));
            isValid = false;
        }
        else if (!formData.password?.match(SPECIAL_CHARS_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must contain at least one special character' }
            }));
            isValid = false;
        }
        else if (formData.password?.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must be at least 8 characters long' }
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
        if (validateForm()) {

            let data = {
                "usr_password": formData.password,
                token: token
            }

            dispatch(resetPassword({ data })).then((res) => {
                if (res.payload?.status === 200) {
                    toast.success(res.payload?.message);
                    router.push('/auth/login', { scroll: true });
                } else {
                    toast.error(res.payload?.message);
                }
            }).catch((err) => {
                toast.error(err.message);
            })
            // router.push('/auth/verifyemail/?orgin=individual', { scroll: true });
        }
    }

    return (
        <div className='resetpassword-container'>
            <div className="resetpassword">
                <div className='header'>
                    <CustomTypography content="Reset Password" color="BLACK" size="SUPER-LARGE" weight="MEDIUM" />
                    {/* <CustomTypography content="Lorem ipsum dolor" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                </div>

                <div className='form'>
                    <CustomInput
                        isInvalid={errors.password.error}
                        errMsg={errors.password.message}
                        type='password'
                        name={'password'}
                        value={formData.password}
                        onChange={(e) => { handleInputChange({ e }) }}
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
                        <CustomButton fullWidth label='Confirm' onClick={handleSubmit} variant='primary' height={isMobileView ? '42px' : '50px'} />
                    </div>
                </div>

                {/* <div className='footer'>
                    <CustomTypography content="Remember your password?" color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                    <CustomButton label='Login' fullWidth variant='transparent' height={isMobileView ? '42px' : '50px'} />
                </div> */}
            </div>
        </div>
    )
}

export default ResetPassword