"use client";
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect, useState } from 'react'
import './VerifyPhone.scss'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomButton from '@/library/buttons/CustomButton'
import { useRouter, useSearchParams } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';

const VerifyPhone = () => {
    const router = useRouter()

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const searchParams = useSearchParams()
    let from = searchParams.get('orgin');


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
        if (from === 'company') {
            router.push('/welcome', { scroll: true })
        } else {
            router.push('/', { scroll: true })
        }
    }


    return (
        <>
            <div className="verifyphone-wrapper">
                <div className="verifyphone">
                    <div className="header">
                        <p className="title">Verify Your Phone Number</p>
                        <div className="changenumber">
                            <p>Enter OTP received in +971 1239840 </p>
                            <Link href={{
                                pathname: '/auth/updatenum', query: {
                                    orgin: from
                                }
                            }} >
                                <span className="changebtn"
                                // onClick={() => router.push('/auth/updatenum', { scroll: true })}
                                >
                                    Change
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="timer">
                        <CustomTypography content={`${formatTime(timeRemaining)} remaining`} size='MEDIUM-LARGE' color='GRAY-DARK' weight='MEDIUM' />
                    </div>
                    <div className="formwrapper">
                        <CustomInput type='text' placeholder='OTP' label={'OTP'} isRequired={false} />
                        {/* <Link href={{
                            pathname: '/', query: {
                                orgin: from
                            }
                        }} > */}
                        <CustomButton fullWidth label='Verify' variant='primary' height={isMobileView ? '42px' : '50px'}
                            onClick={handleVerify}
                        />
                        {/* </Link> */}
                        <CustomButton label='Resend OTP' variant='transparent' height={isMobileView ? '42px' : '50px'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default VerifyPhone