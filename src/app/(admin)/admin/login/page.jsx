"use client"
import React, { useEffect } from 'react'
import AuthNavbar from "@/components/navbar/authnavbar/AuthNavbar";
import CustomButton from '@/library/buttons/CustomButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTypography from '@/library/typography/CustomTypography'
import "./AdminLogin.scss"
import { useRouter, useSearchParams } from 'next/navigation'
import useWindowSize from '@/hooks/useWindowSize'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { login } from '@/services/features/authSlice'

const AdminLogin = () => {

    const router = useRouter();
    const dispatch = useDispatch()

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;


    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
        email_or_mobile: '',
        password: '',
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
    });

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
        if (!formData.email_or_mobile?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email_or_mobile: { error: true, message: 'Email is required' }
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
        if (validateForm()) {
            let data = {
                usr_email: formData.email_or_mobile,
                usr_password: formData.password
            }
            setLoading(true);
            dispatch(login({ data })).then((res) => {
                if (res.payload?.status == 200) {
                    toast.success(res.payload?.message);
                    if (res.payload?.result?.user?.is_role == 7) {
                        router.push('/admin', { scroll: true });
                    } else {
                        router.push('/', { scroll: true });
                    }
                } else {
                    if (res.payload?.response?.data?.status == 422) {
                        if (res.payload?.response?.data?.unverified == 'email') {
                            router.push(`/auth/verifyemail/?orgin=${res.payload?.response?.data?.from}&token=${res.payload?.response?.data?.token}`, { scroll: true });
                        } else {
                            router.push(`/auth/verifyphone/?orgin=${res.payload?.response?.data?.from}&token=${res.payload?.response?.data?.token}`, { scroll: true });
                        }
                    }
                    toast.error(res.payload?.response?.data?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error("Login failed");
                setLoading(false);
            })
        }
    }

    return (
        <>
            <AuthNavbar />
            <div className='admin-login-container'>
                <div className="admin-login">
                    <div className='header'>
                        <CustomTypography content="Login to Dashboard" color="BLACK" size="SUPER-LARGE" weight="MEDIUM" />
                        {/* <CustomTypography content="Lorem ipsum dolor" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                    </div>

                    <div className='form'>
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

                        <div className='submitbtn'>
                            <CustomButton fullWidth label='Login' onClick={handleSubmit} variant='primary' height={isMobileView ? '42px' : '50px'} />
                        </div>
                    </div>

                    {/* <div className='footer'>
                    <CustomTypography content="Remember your password?" color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                    <CustomButton label='Login' fullWidth variant='transparent' height={isMobileView ? '42px' : '50px'} />
                </div> */}
                </div>
            </div>
        </>
    )
}

export default AdminLogin