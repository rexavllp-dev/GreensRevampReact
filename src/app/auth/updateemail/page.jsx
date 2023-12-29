"use client";
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect, useState } from 'react'
import './UpdateEmail.scss'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomButton from '@/library/buttons/CustomButton'
import { useRouter, useSearchParams } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import { isEmailValid } from '@/utils/helpers/IsEmailValid';
import { updateUserEmail } from '@/services/features/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const UpdateEmail = () => {
    const router = useRouter();
    const dispatch = useDispatch()

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;
    const [loading, setLoading] = React.useState(false);

    const searchParams = useSearchParams()
    let from = searchParams.get('orgin');
    let token = searchParams.get('token');

    const [formData, setFormData] = React.useState({
        email: ''
    })

    const [errors, setErrors] = React.useState({
        email: {
            error: false,
            message: ''
        },
    });

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
    }

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

    const handleSubmit = () => {
        if (validateForm()) {
            let data = {
                "usr_email": formData.email,
            }

            setLoading(true);
            dispatch(updateUserEmail({data, token, from})).then((res) => {
                if (res.payload?.status === 200) {
                    toast.success(res.payload?.message);
                    router.push(`/auth/verifyemail/?orgin=${from}&token=${token}`, { scroll: true });
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            }) 
        }
    }

    return (
        <>
            <div className="updateemail-wrapper">
                <div className="updateemail">
                    <div className="header">
                        <CustomTypography content='Change Email Address' size='SUPER-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
                    </div>

                    <div className="formwrapper">
                        <CustomInput type='email'
                            name={'email'}
                            isInvalid={errors.email.error}
                            errMsg={errors.email.message}
                            placeholder="Email Address"
                            label={'Email Address'}
                            isRequired={true}
                            onChange={(e) => { handleInputChange({ e }) }}
                        />
                        {/* <Link href={{
                            pathname: '/auth/verifyemail', query: {
                                orgin: from
                            }
                        }} > */}
                        <CustomButton label='Get Verification Email' onClick={handleSubmit} loading={loading} variant='primary' fullWidth height={isMobileView ? '42px' : '50px'}
                        // onClick={() => { router.push('/auth/verifyemail', { scroll: true }) }}
                        />
                        {/* </Link> */}
                        <CustomButton label='Go back' variant='transparent' height={isMobileView ? '42px' : '50px'} onClick={() => router.back()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEmail