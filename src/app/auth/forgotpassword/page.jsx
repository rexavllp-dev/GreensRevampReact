"use client"
import React, { useEffect } from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTypography from '@/library/typography/CustomTypography'
import "./ForgotPassword.scss"
import { useRouter } from 'next/navigation'
import useWindowSize from '@/hooks/useWindowSize'
import { isEmailValid } from '@/utils/helpers/IsEmailValid'
import { forgotPassword } from '@/services/features/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const router = useRouter();
    const dispatch = useDispatch()

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const [loading, setLoading] = React.useState(false)

    const [formData, setFormData] = React.useState({
        email: ''
    })

    const [errors, setErrors] = React.useState({
        email: {
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
        // Validate email
        if (!isEmailValid(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: { error: true, message: 'Enter a valid email address' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: { error: false, message: '' }
            }));
        }

        return isValid;
    };


    const handleSubmit = () => {
        if (validateForm()) {

            let data = {
                usr_email: formData.email
            }

            setLoading(true);
            dispatch(forgotPassword({ data })).then((res) => {
                if (res.payload?.status === 200) {
                    toast.success(res.payload?.message);
                }else {
                    toast.error(res.payload?.message);
                }
                setLoading(false)
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            })
            // router.push('/auth/verifyemail/?orgin=individual', { scroll: true });
            // router.push('/auth/reset', { scroll: true });
        }
    }

    return (
        <div className='forgotpassword-container'>
            <div className="forgotpassword">
                <div className='header'>
                    <CustomTypography content="Forgot Password ?" color="BLACK" size="SUPER-LARGE" weight="MEDIUM" />
                    {/* <CustomTypography content="Lorem ipsum dolor" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                </div>

                <div className='form'>
                    <CustomInput name='email' type='text'
                        maxLength={100}
                        placeholder='Email address' label={'Email address'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.email}
                        isInvalid={errors.email.error}
                        errMsg={errors.email.message}
                    />

                    <div className='submitbtn'>
                        <CustomTypography content="You will get a link to reset your password." color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                        <CustomButton fullWidth label='Continue' onClick={handleSubmit} loading={loading} variant='primary' height={isMobileView ? '42px' : '50px'} />
                    </div>
                </div>

                <div className='footer'>
                    <CustomTypography content="Remember your password?" color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                    <CustomButton label='Login with password' onClick={() => router.push('/auth/login/?view=p')} fullWidth variant='transparent' height={isMobileView ? '42px' : '50px'} />
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword