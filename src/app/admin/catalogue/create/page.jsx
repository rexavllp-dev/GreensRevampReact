"use client";
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CustomButton from '@/library/buttons/CustomButton'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import "./CreateCatalogue.scss"
import { useRouter } from 'next/navigation'
import GeneralTab from './tabs/basic/general/GeneralTab';
import PriceTab from './tabs/basic/price/PriceTab';
import InventoryTab from './tabs/basic/inventory/InventoryTab';
import ImagesTab from './tabs/basic/images/ImagesTab';
import SeoTab from './tabs/basic/seo/SeoTab';
import BadgesTab from './tabs/basic/badges/BadgesTab';
import CustomSwitchButton from '@/library/buttons/switchbtn/CustomSwitchButton';
import OptionsTab from './tabs/advanced/options/OptionsTab';
import VariantsTab from './tabs/advanced/productvariants/VariantsTab';
import RelatedProdTab from './tabs/advanced/relatedproducts/RelatedProdTab';
import SearchableKeywords from './tabs/advanced/searchable/SearchableKeywords';

const UserDetails = () => {

    const router = useRouter();
    const [active, setActive] = React.useState(0);

    const basicTabs = [
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
    const advancedTabs = [
        {
            id: 1,
            label: "Options",
            component: <OptionsTab />
        },
        {
            id: 2,
            label: "Related Products",
            component: <RelatedProdTab />
        },
        {
            id: 3,
            label: "Product Variants",
            component: <VariantsTab />
        },
        {
            id: 4,
            label: "Reviews",
            component: <BadgesTab />
        },
        // {
        //     id: 5,
        //     label: "Additional",
        //     component: <BadgesTab />
        // },
        {
            id: 6,
            label: "Searchable  Keywords",
            component: <SearchableKeywords />
        },
        {
            id: 7,
            label: "Stock History",
            component: <BadgesTab />
        }
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
            <div className='switchbtn'>
                <CustomSwitchButton active={active} setActive={setActive} labelOne="Basic" labelTwo="Advanced" />
            </div>

            {
                active === 0 ? <CustomTabs tabs={basicTabs} /> : <CustomTabs tabs={advancedTabs} />
            }


        </div>
    )
}

export default UserDetails