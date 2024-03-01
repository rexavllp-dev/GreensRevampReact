"use client";
import React from 'react'
import './SettingsNavbar.scss';
import Link from 'next/link';
import { companyLogo, companyLogoMobile } from '../../../../public/images';
import Image from 'next/image';
import appConfig from '@/config/appConfig';
import CustomTypography from '@/library/typography/CustomTypography';
import { FaArrowLeft } from 'react-icons/fa';
import LeaveCheckoutModal from '@/app/checkout/components/leave_checkout_modal/LeaveCheckoutModal';
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const SettingsNavbar = () => {

    const router = useRouter();
    const imageUrl = appConfig.server.imageUrl;
    const { isOpen, onOpen, onClose } = useDisclosure();

    // const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

    // const handleSubmit = () => {
    //     setConfirmationOpen(false)
    //     onClose()
    //     router.back();
    // }


    return (
        <div className='settingsnavbar-wrapper'>
            <div className="navbar">
                <div className="left flex items-center gap-3" onClick={() => router.back()}>
                    <div className="cursor-pointer">
                        <FaArrowLeft size={19} />
                    </div>
                    <CustomTypography content="Cancel" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                </div>
                <div className="logosection">
                    <Link href="/">
                        <div className="logo">
                            <Image src={imageUrl + '/images/company_logo.svg'} alt="logo" width={217} height={62} />
                        </div>
                        <div className="logomobile">
                            <Image src={imageUrl + '/images/company_logo_mobile.png'} alt="logo" width={154} height={36} />
                        </div>
                    </Link>
                </div>
                <div className="right"></div>
            </div>
        </div >
    )
}

export default SettingsNavbar