"use client";
import React from 'react'
import "./HelpCenter.scss";
import CustomTypography from '@/library/typography/CustomTypography';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const HelpCenter = () => {
    const router = useRouter();
    
    return (
        <div className='helpcenter'>
            <div className="header mb-3">
                <CustomTypography content={'Help Center'} weight="BOLD" color="BLACK" size="LARGE" />
            </div>
            <div className="helpsection">
                <div className="helptopics">
                    <CustomTypography content={'Help Topics'} weight="BOLD" color="BLACK" size="LARGE" />

                    <div className='topics'>
                        <div className="topic topic-active">
                            <CustomTypography content={'Your order'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        </div>
                        <div className="topic">
                            <CustomTypography content={'Accounts & Payments'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        </div>
                        <div className="topic">
                            <CustomTypography content={'Returns & Refunds'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        </div>
                        <div className="topic">
                            <CustomTypography content={'Policies and terms of use'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="title mb-5 pt-3">
                        <div className="flex gap-3">
                            <div className="cursor-pointer" onClick={() => router.back()}>
                                <MdKeyboardArrowLeft size={32} />
                            </div>
                            <CustomTypography content={'Track your order'} weight="BOLD" color="BLACK" size="LARGE" />
                        </div>
                    </div>

                    <div className="body flex flex-col gap-3 pl-2 pt-4">
                        <CustomTypography content={'You can track your order from your shipping confirmation email or by visiting greensintl.com'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        <CustomTypography content={'We send an email with a tracking link as soon as your package ships, which you can use any time to check its progress.'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        <CustomTypography content={'To track your order on Greensintl.com:'} weight="MEDIUM" color="BLACK" size="MEDIUM-LARGE" className='pt-3' />
                        <CustomTypography content={'1. On Greensintl.com, select Account.'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        <CustomTypography content={'2. Select Purchase history.'} weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />
                        <CustomTypography content={"3. If you're logged in to your account, scroll to the order you want to track and select Track Shipment. If you're not logged in, select the link to track."}
                            weight="REGULAR" color="BLACK" size="MEDIUM-LARGE" />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default HelpCenter