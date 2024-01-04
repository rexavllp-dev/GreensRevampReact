"use client"
import React, { useEffect, useState } from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import AuthButton from '@/library/buttons/authbuttons/AuthButton'
import CustomCheckbox from '@/library/checkbox/CustomCheckbox'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTypography from '@/library/typography/CustomTypography'
import "./LoginPage.scss"
import { useRouter, useSearchParams } from 'next/navigation'
import useWindowSize from '@/hooks/useWindowSize'
import { isEmailValid } from '@/utils/helpers/IsEmailValid'
import { useDispatch } from 'react-redux'
import { login, loginWithOtp } from '@/services/features/authSlice'
import { toast } from 'react-toastify'
import { Cookies } from 'react-cookie'
import Axios from '../../../../services/axios/Axios'

// set up cookies
const cookies = new Cookies();


const LoginPage = () => {

    const router = useRouter();
    const dispatch = useDispatch()

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const [loading, setLoading] = useState(false)

    const searchParams = useSearchParams()
    let from = searchParams.get('view');

    const [isLoginWithOTP, setIsLoginWithOTP] = React.useState(true);
    const [formData, setFormData] = React.useState({
        mobile: '',
        email_or_mobile: '',
        password: '',
        keep_me_signed: false
    });

    const [errors, setErrors] = React.useState({
        mobile: {
            error: false,
            message: ''
        },
        email_or_mobile: {
            error: false,
            message: ''
        },
        password: {
            error: false,
            message: ''
        }
    });

    useEffect(() => {
        if (from === 'p') {
            setIsLoginWithOTP(false)
        }
    }, [from])

    const handleInputChange = ({ e, country }) => {

        if (e.target.name === 'mobile') {
            const re = /^[0-9\b]+$/;
            // if value is not blank, then test the regex
            if (e.target?.value === '' || re.test(e.target?.value)) {
                setFormData((prev) => ({
                    ...prev, mobile: e.target.value
                }))
            }
        } else {
            setFormData((prev) => ({
                ...prev, [e.target.name]: e.target.value
            }))

        }

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

    const validateMobile = () => {
        let isValid = true;
        // Validate mobile
        if (!formData.mobile?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                mobile: { error: true, message: 'Mobile number is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                mobile: { error: false, message: '' }
            }));
        }

        return isValid;
    };


    const handleSubmit = () => {
        if (isLoginWithOTP) {
            if (validateMobile()) {
                let data = {
                    usr_mobile_number: formData.mobile,
                }

                setLoading(true);
                dispatch(loginWithOtp({ data })).then((res) => {
                    if (res.payload?.status == 200) {
                        toast.success(res.payload?.message);
                        router.push(`/auth/verifylogin?p=${formData.mobile}`, { scroll: true });
                    } else {
                        console.log(res)
                        toast.error(res.payload?.response?.data?.message);
                    }
                    setLoading(false);
                }).catch((err) => {
                    toast.error("Login failed");
                    setLoading(false);
                })
            }
        } else {
            if (validateForm()) {
                let data = {
                    usr_email: formData.email_or_mobile,
                    usr_password: formData.password
                }
                setLoading(true);
                dispatch(login({ data })).then((res) => {
                    if (res.payload?.status == 200) {
                        toast.success(res.payload?.message);
                        router.push('/', { scroll: true });
                    } else {
                        toast.error(res.payload?.response?.data?.message);
                    }
                    setLoading(false);
                }).catch((err) => {
                    toast.error("Login failed");
                    setLoading(false);
                })
            }
        }
    }

    const handleGoogleLogin = () => {
        window.open('http://localhost:5000/api/v1/users/auth/google', '_self');
    }

    const handleFacebookLogin = () => {
        window.open('http://localhost:5000/api/v1/users/auth/facebook/callback', '_self');
    }

    return (
        <div className='individual-register'>
            <div className='thirdparty'>
                <AuthButton label={'Sign in with Google'} icon={'GoogleIcon'} backgroundColor={'#8571FF'} onClick={() => { handleGoogleLogin() }} />
                <AuthButton label={'Sign in with Facebook'} icon={'FacebookIcon'} backgroundColor={'#7694FF'} onClick={() => { handleFacebookLogin() }} />
            </div>
            <div className='or'>
                <CustomTypography content="OR" color="GRAY-DARK" size="SMALL" weight="MEDIUM" />
            </div>

            <div className='form'>
                {
                    isLoginWithOTP ?
                        <CustomInput name='mobile' type='text'
                            maxLength={100}
                            placeholder='Mobile Number' label={'Mobile Number'}
                            isRequired={true}
                            onChange={(e) => { handleInputChange({ e }) }}
                            value={formData.mobile}
                            isInvalid={errors.mobile.error}
                            errMsg={errors.mobile.message}
                        />
                        :

                        <>
                            <CustomInput
                                name='email_or_mobile'
                                type='text'
                                maxLength={100}
                                placeholder='Email Address' label={'Email Address'}
                                isRequired={true}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.email_or_mobile}
                                isInvalid={errors.email_or_mobile.error}
                                errMsg={errors.email_or_mobile.message}
                            />

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

                <CustomButton fullWidth label={isLoginWithOTP ? 'Get OTP' : 'Login'} onClick={handleSubmit} loading={loading} variant='primary' height={isMobileView ? '42px' : '50px'} />
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