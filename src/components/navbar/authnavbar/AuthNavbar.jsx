import React from 'react'
import './AuthNavbar.scss';
import Link from 'next/link';
import { companyLogo, companyLogoMobile } from '@/assets/images';
import Image from 'next/image';

const AuthNavbar = () => {
    return (
        <div className='authnavbar-wrapper'>
            <div className="navbar">
                <Link href="/">
                    <div className="logo">
                        <Image src={companyLogo} />
                    </div>
                    <div className="logomobile">
                        <Image src={companyLogoMobile} />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AuthNavbar