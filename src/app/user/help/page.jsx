"use client";
import React from 'react'
import './help.scss'
import CustomTabs from '@/components/customtabs/CustomTabs'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import CustomTypography from '@/library/typography/CustomTypography';
import OrderHelp from './tabs/orderhelp/OrderHelp';

const HelpCenter = () => {
    const tabs = [
        {
            id: 1,
            label: "Your Order",
            component: <OrderHelp />
        },
        {
            id: 2,
            label: "Accounts & Payments",
            component: ''
        },
        {
            id: 3,
            label: "Returns & Refunds",
            component: ''
        },
        {
            id: 4,
            label: "Policies & Terms of use",
            component: ''
        },
    ]

    const router = useRouter();


    return (
        <div className='helpcenter'>
            <div className="header mb-3 ml-4">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Help Center'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
            </div>
            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default HelpCenter