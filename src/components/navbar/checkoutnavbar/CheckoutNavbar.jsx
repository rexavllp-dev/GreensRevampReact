import React from 'react'
import './CheckoutNavbar.scss';
import Link from 'next/link';
import { companyLogo, companyLogoMobile } from '../../../../public/images';
import Image from 'next/image';
import appConfig from '@/config/appConfig';

const CheckoutNavbar = () => {
    const imageUrl = appConfig.server.imageUrl;

    return (
        <div className='checkoutnavbar-wrapper'>
            <div className="navbar">
                <Link href="/">
                    <div className="logo">
                        <Image src={imageUrl + '/images/company_logo.svg'} alt="logo" width={217} height={62} />
                    </div>
                    <div className="logomobile">
                        <Image src={imageUrl + '/images/company_logo_mobile.png'} alt="logo" width={154} height={36} />
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default CheckoutNavbar