"use client";
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect, useState } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomButton from '@/library/buttons/CustomButton'
import { useRouter, useSearchParams } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, resendLoginOtp, resendOtp, verifyLoginOtp } from '@/services/features/authSlice';
import { toast } from 'react-toastify';
import './VerifyLogin.scss'

const VerifyLogin = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const searchParams = useSearchParams()
    let from = searchParams.get('orgin');
    let phoneNumber = searchParams.get('p');


    const [formData, setFormData] = useState({
        otp: ''
    })

    const [timeRemaining, setTimeRemaining] = useState(parseTime('00:60'));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    // Timer reached zero, you can add additional logic here if needed
                    clearInterval(intervalId);
                    return 0;
                }
            });
        }, 1000);

        // Clean up the interval when the component unmounts  
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array means this effect will only run once after the initial render

    // Helper function to parse the time from the content string
    function parseTime(content) {
        const [minutes, seconds] = content.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    // Helper function to format the time as MM:SS
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const handleVerify = () => {
        dispatch(verifyLoginOtp({ data: { usr_mobile_number: phoneNumber, otp: formData.otp } })).then((res) => {
            console.log(res)
            if (res.payload?.status === 200) {
                toast.success("Login successfully", {
                    toastId: 'success1',
                });
                router.push('/', { scroll: true });
            } else {
                toast.error(res.payload?.message, {
                    toastId: 'fail1',
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleInputChange = (e) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (e.target?.value === '' || re.test(e.target?.value)) {
            setFormData((prev) => ({
                ...prev, otp: e.target.value
            }))
        }
    }

    const handleResendOtp = () => {
        dispatch(resendLoginOtp({ usr_mobile_number: phoneNumber })).then((res) => {
            if (res.payload?.status === 200) {
                toast.success(res.payload?.message, {
                    toastId: 'success1',
                });
            } else {
                toast.error(res.payload?.message, {
                    toastId: 'fail1',
                });
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            <div className="verifylogin-wrapper">
                <div className="verifylogin">
                    <div className="header">
                        <p className="title">Verify Your Phone Number</p>
                        <div className="changenumber">
                            <p>Enter OTP received in {phoneNumber}</p>
                        </div>
                    </div>

                    <div className="timer">
                        {/* <CustomTypography content={`${formatTime(timeRemaining)} remaining`} size='MEDIUM-LARGE' color='GRAY-DARK' weight='MEDIUM' /> */}
                    </div>
                    <div className="formwrapper">
                        <CustomInput type='text' placeholder='OTP' value={FormData.otp} name={'otp'} onChange={handleInputChange} label={'OTP'} isRequired={false} />
                        {/* <Link href={{
                            pathname: '/', query: {
                                orgin: from
                            }
                        }} > */}
                        <CustomButton fullWidth label='Verify' variant='primary' height={isMobileView ? '42px' : '50px'}
                            onClick={handleVerify}
                        />
                        {/* </Link> */}
                        <CustomButton label='Resend OTP' variant='transparent' height={isMobileView ? '42px' : '50px'}
                            onClick={handleResendOtp}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyLogin