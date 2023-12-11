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

const UpdateNum = () => {
    const router = useRouter();

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;


    const searchParams = useSearchParams()
    let from = searchParams.get('orgin');

    return (
        <>
            <div className="updatenum-wrapper">
                <div className="updatenum">
                    <div className="header">
                        <CustomTypography content='Change Mobile Number' size='SUPER-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
                    </div>

                    <div className="formwrapper">
                        <CustomPhoneInput label='Mobile Number' placeholder='Mobile Number' />
                        <Link href={{
                            pathname: '/auth/verifyphone', query: {
                                orgin: from
                            }
                        }} >
                            <CustomButton label='Get OTP' variant='primary'
                                height={isMobileView ? '42px' : '50px'}
                                fullWidth
                            // onClick={() => { router.push('/auth/verifyphone', { scroll: true }) }}
                            />
                        </Link>
                        <CustomButton label='Go back' variant='transparent' height={isMobileView ? '42px' : '50px'} onClick={() => router.back()} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNum