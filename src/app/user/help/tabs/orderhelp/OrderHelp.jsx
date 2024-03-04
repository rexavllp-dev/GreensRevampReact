"use client";
import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdArrowForwardIos } from "react-icons/md";
import "./OrderHelp.scss";
import { useRouter } from 'next/navigation';

const OrderHelp = () => {
    const router = useRouter();
    return (
        <div className='orderhelp'>
            <div className="item" onClick={() => { router.push('/helpcenter') }}>
                <CustomTypography content='Track your order' size='MEDIUM-LARGE' color='PURE-BLACK' weight='MEDIUM' />
                <MdArrowForwardIos />

            </div>
            <div className="item">
                <CustomTypography content='Edit or Cancel an Order' size='MEDIUM-LARGE' color='PURE-BLACK' weight='MEDIUM' />
                <MdArrowForwardIos />
            </div>
            <div className="item">
                <CustomTypography content='Cancelled Orders' size='MEDIUM-LARGE' color='PURE-BLACK' weight='MEDIUM' />
                <MdArrowForwardIos />
            </div>
            <div className="item">
                <CustomTypography content='Delayed Orders' size='MEDIUM-LARGE' color='PURE-BLACK' weight='MEDIUM' />
                <MdArrowForwardIos />
            </div>
            <div className="item">
                <CustomTypography content='Missing items' size='MEDIUM-LARGE' color='PURE-BLACK' weight='MEDIUM' />
                <MdArrowForwardIos />
            </div>
            <div className="item">
                <CustomTypography content='Order Not Received' size='MEDIUM-LARGE' color='PURE-BLACK' weight='MEDIUM' />
                <MdArrowForwardIos />
            </div>
            <div className="item">
                <CustomTypography content='Pickup and Delivery' size='MEDIUM-LARGE' color='PURE-BLACK' weight='MEDIUM' />
                <MdArrowForwardIos />
            </div>
        </div>
    )
}

export default OrderHelp