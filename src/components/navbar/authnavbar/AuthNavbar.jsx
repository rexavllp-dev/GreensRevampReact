import React from 'react'
import './AuthNavbar.scss';
import Link from 'next/link';
import { companyLogo, companyLogoMobile } from '../../../../public/images';
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
                        <Image src={'/images/company_logo_mobile.png'} alt="logo" width={156} height={36} />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AuthNavbar