import React from 'react'
import './AuthFooter.scss';
import { companyLogoLight } from '../../../../public/images'
import CustomTypography from '@/library/typography/CustomTypography'
import Image from 'next/image'
import Link from 'next/link'

const AuthFooter = () => {
    return (
        <div className='authfooter-wrapper'>
            <div className="footer">
                <div className="logo">
                    <Link href="/">
                        <Image src={companyLogoLight} />
                    </Link>
                </div>
                <div className="links">
                    <Link href="/auth/register">
                        <CustomTypography content='Conditions of Use' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                    </Link>
                    <Link href="/auth/register">
                        <CustomTypography content='Privacy Notice' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                    </Link>
                    <Link href="/auth/register">
                        <CustomTypography content='Help' color='QUATERNARY' size='REGULAR' weight='REGULAR' />
                    </Link>
                </div>
                <div className="copyright">
                    <CustomTypography content='© 2023 Greens International. All Rights Reserved.' color='QUATERNARY' size='SMALL-REGULAR' weight='THIN' />
                </div>
            </div>
        </div>
    )
}

export default AuthFooter