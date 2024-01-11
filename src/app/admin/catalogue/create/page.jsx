"use client";
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CustomButton from '@/library/buttons/CustomButton'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import "./CreateCatalogue.scss"
import { useRouter } from 'next/navigation'
import GeneralTab from './tabs/general/GeneralTab';
import PriceTab from './tabs/price/PriceTab';
import InventoryTab from './tabs/inventory/InventoryTab';
import ImagesTab from './tabs/images/ImagesTab';
import SeoTab from './tabs/seo/SeoTab';
import BadgesTab from './tabs/badges/BadgesTab';

const UserDetails = () => {

    const router = useRouter();

    const tabs = [
        {
            id: 1,
            label: "General",
            component: <GeneralTab />
        },
        {
            id: 2,
            label: "Price",
            component: <PriceTab />
        },
        {
            id: 3,
            label: "Inventory",
            component: <InventoryTab />
        },
        {
            id: 4,
            label: "Images",
            component: <ImagesTab />
        },
        {
            id: 5,
            label: "SEO",
            component: <SeoTab />
        },
        {
            id: 6,
            label: "Badges",
            component: <BadgesTab />
        },
    ]


    return (
        <div className='createcatalogue'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="header">
                <div className="title">
                    <div className="backbtn" onClick={() => router.back()}>
                        <FaArrowLeft />
                    </div>
                    <CustomTypography content={"Create Product"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
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