"use client"
import React, { useEffect } from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import AuthButton from '@/library/buttons/authbuttons/AuthButton'
import CustomCheckbox from '@/library/checkbox/CustomCheckbox'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTypography from '@/library/typography/CustomTypography'
import "./LoginPage.scss"
import { useRouter, useSearchParams } from 'next/navigation'
import useWindowSize from '@/hooks/useWindowSize'
import { isEmailValid } from '@/utils/helpers/IsEmailValid'


const LoginPage = () => {

    const router = useRouter();

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const searchParams = useSearchParams()
    let from = searchParams.get('view');

    const [isLoginWithOTP, setIsLoginWithOTP] = React.useState(true)
    const [formData, setFormData] = React.useState({
        email_or_mobile: '',
        password: '',
        keep_me_signed: false
    })

    const [errors, setErrors] = React.useState({
        email_or_mobile: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: ''
        }
    })

    useEffect(() => {
        if (from === 'p') {
            setIsLoginWithOTP(false)
        }
    }, [from])

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
        if (!formData.email_or_mobile?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email_or_mobile: { error: true, message: 'Email or Mobile is required' }
            }));
            isValid = false;
        }
        else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email_or_mobile: { error: false, message: '' }
            }));
        }

        // Validate password
        if (!formData.password?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password is required' }
            }));
            isValid = false;
        }
        else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: false, message: '' }
            }));
        }

        return isValid;
    };


    const handleSubmit = () => {
        if (isLoginWithOTP) {
            router.push('/auth/verifyphone', { scroll: true });
        } else {
            if (validateForm()) {
                router.push('/', { scroll: true });
            }
        }
    }

    return (
        <div className='individual-register'>
            <div className='thirdparty'>
                <AuthButton label={'Sign in with Google'} icon={'GoogleIcon'} backgroundColor={'#8571FF'} />
                <AuthButton label={'Sign in with Facebook'} icon={'FacebookIcon'} backgroundColor={'#7694FF'} />
            </div>
            <div className='or'>
                <CustomTypography content="OR" color="GRAY-DARK" size="SMALL" weight="MEDIUM" />
            </div>


            <div className='form'>
                <CustomInput name='email_or_mobile' type='text'
                    maxLength={100}
                    placeholder='Email / Mobile Number' label={'Email / Mobile Number'}
                    isRequired={true}
                    onChange={(e) => { handleInputChange({ e }) }}
                    value={formData.email_or_mobile}
                    isInvalid={errors.email_or_mobile.error}
                    errMsg={errors.email_or_mobile.message}
                />

                {
                    !isLoginWithOTP && <>
                        <CustomInput
                            isInvalid={errors.password.error}
                            errMsg={errors.password.message}
                            type='password'
                            name={'password'}
                            value={formData.password}
                            onChange={(e) => { handleInputChange({ e }) }}
                            placeholder="Password"
                            label={'Password'}
                            isRequired={true}
                            haveProgress={false}
                        />

                        <div className='checkbox-group'>
                            <CustomCheckbox
                                isRequired={false}
                                label={<p>Keep me signed in</p>}
                                name='checkbox'
                                value={formData.keep_me_signed} onChange={(value) => { setFormData({ ...formData, keep_me_signed: value }) }}
                            />
                        </div>
                        <div className="actionbtn-wrapper">
                            <div className="actionbtn" onClick={() => { setIsLoginWithOTP(true) }}>
                                <CustomTypography content="Login using OTP" color="PRIMARY" size="MEDIUM" weight="MEDIUM" />
                            </div>
                            <div className="actionbtn" onClick={() => { router.push('/auth/forgotpassword') }}>
                                <CustomTypography content="Forgot Password?" style={{ cursor: 'pointer', borderBottom: '1px solid', display: 'inline' }} color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                            </div>
                        </div>
                    </>
                }


                <CustomButton fullWidth label={isLoginWithOTP ? 'Get OTP' : 'Login'} onClick={handleSubmit} variant='primary' height={isMobileView ? '42px' : '50px'} />
                {
                    isLoginWithOTP &&
                    <div className="bottom-action">
                        <div className="actionbtn" onClick={() => { setIsLoginWithOTP(false) }}>
                            <CustomTypography content="Use password" style={{ cursor: 'pointer', borderBottom: '1px solid', display: 'inline' }} color="PRIMARY" size="MEDIUM" weight="MEDIUM" />
                        </div>
                    </div>
                }

            </div>
            {/* 
            <div className='footer'>
                <CustomTypography content="Already have an account?" color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                <CustomButton label='Login' variant='transparent' height={isMobileView ? '42px' : '50px'} />
            </div> */}
        </div>
    )
}

export default LoginPage