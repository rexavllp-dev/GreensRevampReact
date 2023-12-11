"use client";
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect } from 'react'
import './Welcome.scss'
import AuthNavbar from '@/components/navbar/authnavbar/AuthNavbar'
import AuthFooter from '@/components/footer/authfooter/AuthFooter'
import { useRouter } from 'next/navigation';

const VerifyEmail = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/', { scroll: false })
        }, 8000)
    }, [])

    return (
        <>
            <AuthNavbar />
            <div className="welcome-wrapper">
                <div className="welcome">
                    <div className="header">
                        <CustomTypography content='Thank you for completing the registration' size='SUPER-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
                        <CustomTypography content='Our team will now review your documents shortly and will update you once we activate your account. Thank you for your patience.' size='LARGE' color='PURE-BLACK' weight='REGULAR' />
                    </div>
                </div>
            </div>
            <AuthFooter />
        </>
    )
}

export default VerifyEmail