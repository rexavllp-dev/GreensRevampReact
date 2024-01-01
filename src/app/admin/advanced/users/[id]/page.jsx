"use client";
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CustomButton from '@/library/buttons/CustomButton'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import "./UserDetails.scss"
import { useRouter } from 'next/navigation'
import Accounts from '../tabs/account/Accounts';

const UserDetails = ({ params }) => {

    const id = params.id;

    const router = useRouter();

    const tabs = [
        {
            id: 1,
            label: "Account",
            component: <Accounts userId={id} />
        },
        {
            id: 2,
            label: "Permissions",
        },
        {
            id: 3,
            label: "Password",
        },
        {
            id: 4,
            label: 'Order History',
        },
        {
            id: 5,
            label: 'Coupon History',
        },
        {
            id: 6,
            label: 'Giftcards History',
        },
        {
            id: 7,
            label: 'Search History',
        },
        {
            id: 8,
            label: 'Loyalty Points',
        }
    ]

    return (
        <div className='userdetails'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="header">
                <div className="title">
                    <div className="backbtn" onClick={() => router.back()}>
                        <FaArrowLeft />
                    </div>
                    <CustomTypography content={"Users"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="exportbtn">
                    <CustomButton label={"Export"} variant='transparent' height='40px' />
                </div>
            </div>
            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default UserDetails