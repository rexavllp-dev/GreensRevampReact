"use client";
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CustomButton from '@/library/buttons/CustomButton'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import "./CreateUser.scss"
import { useRouter } from 'next/navigation'
import CreateAccount from '../tabs/account/CreateAccount';

const UserDetails = () => {

    const router = useRouter();

    const tabs = [
        {
            id: 1,
            label: "Account",
            component: <CreateAccount />
        },
        {
            id: 2,
            label: "Permissions",
        },
    ]


    return (
        <div className='createuser'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="header">
                <div className="title">
                    <div className="backbtn" onClick={() => router.back()}>
                        <FaArrowLeft />
                    </div>
                    <CustomTypography content={"Create User"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="exportbtn">
                    {/* <CustomButton label={"Export"} variant='transparent' height='40px' /> */}
                </div>
            </div>
            <CustomTabs tabs={tabs} />
        </div>
    )
}

export default UserDetails