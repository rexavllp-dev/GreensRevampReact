"use client";
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CustomButton from '@/library/buttons/CustomButton'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import "./appearnceSettings.scss"
import { useRouter, useSearchParams } from 'next/navigation'
import BannerlTab from './tabs/banner/BannerTab';
import CategoryTab from './tabs/category/CategoryTab';
import BrandTab from './tabs/brand/BrandTab';
import SeasonTab from './tabs/season/SeasonTab';
import AdsTab from './tabs/ads/AdsTab';

import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '@/services/features/productSlice';
import CustomSwitchButton from '@/library/buttons/switchbtn/CustomSwitchButton';

const appearnceSettings = () => {

    const router = useRouter();
    const [active, setActive] = React.useState(0);
    const dispatch = useDispatch();

    const {
        singleProduct,
        isProductCreated,
        isProductUpdated,
        isPriceCreated,
        isPriceUpdated,
        isProductImageUploaded,
        isProductSeoCreated,
        isProductSeoUpdated,
        isStockModified,
        isProductImgDeleted,
        isProductVariantValueDeleted
    } = useSelector(state => state.products);

    const {
        isInventoryCreated,
        isInventoryUpdated,
    } = useSelector(state => state.inventory);

    const searchParams = useSearchParams()
    let id = searchParams.get('id');

    useEffect(() => {
        if (id) {
            dispatch(getSingleProduct({ id }));
        }
    }, [
        id,
        isProductCreated,
        isProductUpdated,
        isPriceCreated,
        isPriceUpdated,
        isProductImageUploaded,
        isProductSeoCreated,
        isInventoryCreated,
        isInventoryUpdated,
        isProductSeoUpdated,
        isStockModified,
        isProductImgDeleted,
        isProductVariantValueDeleted
    ])


    const basicTabs = [
        {
            id: 1,
            label: "Banners",
            component: <BannerlTab id={id} data='' />
        },
        {
                id: 2,
                label: "Shop by Category",
                component: <CategoryTab id={id} data='' />
                // component: "uii"
        },
        {
            id: 3,
            label: "Favorite Brands",
            component: <BrandTab id={id} data='' />
        },

        {
            id: 4,
            label: "Shop by Season",
            component: <SeasonTab id={id} data='' />
        },

        {
            id: 5,
            label: "Ads",
            component: <AdsTab id={id} data='' />
        },

        // {
        //     id: 5,
        //     label: "Ad Banners",
        //     component: <BannerlTab id={id} data={singleProduct} />
        // },

        // {
        //     id: 5,
        //     label: "Others",
        //     component: <BannerlTab id={id} data={singleProduct} />
        // },
       
    ]

    return (
        <div className='appearnceSettings'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="header">
                <div className="title">
                    <div className="backbtn" onClick={() => router.back()}>
                        <FaArrowLeft />
                    </div>
                    <CustomTypography content="Appearance Settings" weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="exportbtn">
                    {/* <CustomButton label={"Export"} variant='transparent' height='40px' /> */}
                </div>
            </div>
           

            <CustomTabs tabs={basicTabs} id={id} isAdvanced={false} />
            

        </div>
    )
}

export default appearnceSettings