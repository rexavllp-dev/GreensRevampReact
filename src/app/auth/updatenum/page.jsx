"use client";
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect, useState } from 'react'
import './UpdateNum.scss'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomButton from '@/library/buttons/CustomButton'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput';
import { useRouter, useSearchParams } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { updateUserMobile } from '@/services/features/authSlice';
import { toast } from 'react-toastify';

const UpdateNum = () => {
    const router = useRouter();

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(false);
    const searchParams = useSearchParams()
    const from = searchParams.get('orgin');
    const token = searchParams.get('token');


    const [formData, setFormData] = React.useState({
        mobile: '',
        usr_mobile_country_code: ''
    })

    const [errors, setErrors] = React.useState({
        mobile: {
            error: false,
            message: ''
        },
    });

    const handlePhoneChange = (name, value, countryCode) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (value === '' || re.test(value)) {
            setFormData((prev) => ({
                ...prev, [name]: value, usr_mobile_country_code: countryCode
            }))
        }
    }

    const validateForm = () => {
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
    }

    const handleSubmit = () => {
        if (validateForm()) {
            let data = {
                "usr_mobile_number": formData.mobile,
                "usr_mobile_country_code": formData.usr_mobile_country_code,
            }

            setLoading(true)
            dispatch(updateUserMobile({ data, token })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                    router.push(`/auth/verifyphone/?orgin=${from}&token=${token}`, { scroll: true });
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false)
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false)
            })
        }
    }

    return (
        <>
            <div className="updatenum-wrapper">
                <div className="updatenum">
                    <div className="header">
                        <CustomTypography content='Change Mobile Number' size='SUPER-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
                    </div>

                    <div className="formwrapper">
                        <CustomPhoneInput
                            isRequired={true}
                            name={'mobile'}
                            value={formData.mobile}
                            placeholder='Mobile Number'
                            label='Mobile Number'
                            onChange={(value, country) => {
                                handlePhoneChange('mobile', value, country)
                            }}
                            isInvalid={errors.mobile.error}
                            errMsg={errors.mobile.message}
                        />
                        {/* <Link href={{
                            pathname: '/auth/verifyphone', query: {
                                orgin: from
                            }
                        }} > */}
                        <CustomButton label='Get OTP' variant='primary'
                            height={isMobileView ? '42px' : '50px'}
                            fullWidth
                            loading={loading}
                            onClick={handleSubmit}
                        // onClick={() => { router.push('/auth/verifyphone', { scroll: true }) }}
                        />
                        {/* </Link> */}
                        <CustomButton label='Go back' variant='transparent' height={isMobileView ? '42px' : '50px'} onClick={() => router.back()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNum