"use client";
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import CustomButton from '@/library/buttons/CustomButton'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import "./CreateCatalogue.scss"
import { useRouter, useSearchParams } from 'next/navigation'
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
import ReviewsTab from './tabs/advanced/reviews/ReviewsTab';
import StockHistoryTab from './tabs/advanced/stockhistory/StockHistoryTab';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '@/services/features/productSlice';
import BulkDiscountTab from './tabs/basic/bulk-discount/BulkDiscountTab';

const catalogueDetails = () => {

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
            label: "General",
            component: <GeneralTab id={id} data={singleProduct} />
        },
        {
            id: 2,
            label: "Price",
            component: <PriceTab id={id} data={singleProduct} />
        },
        {
            id: 3,
            label: "Inventory",
            component: <InventoryTab id={id} data={singleProduct} />
        },
        {
            id: 4,
            label: "Images",
            component: <ImagesTab id={id} data={singleProduct} />
        },
        {
            id: 5,
            label: "SEO",
            component: <SeoTab id={id} data={singleProduct} />
        },
        {
            id: 6,
            label: "Badges",
            component: <BadgesTab id={id} data={singleProduct} />
        },
        {
            id: 7,
            label: "Bulk Discount",
            component: <BulkDiscountTab id={id} data={singleProduct} />
        },
    ]
    const advancedTabs = [
        {
            id: 1,
            label: "Options",
            component: <OptionsTab id={id} data={singleProduct} />
        },
        {
            id: 2,
            label: "Related Products",
            component: <RelatedProdTab id={id} data={singleProduct} />
        },
        {
            id: 3,
            label: "Product Variants",
            component: <VariantsTab id={id} data={singleProduct} />
        },
        {
            id: 4,
            label: "Reviews",
            component: <ReviewsTab id={id} data={singleProduct} />
        },
        // {
        //     id: 5,
        //     label: "Additional",
        //     component: <BadgesTab />
        // },
        {
            id: 6,
            label: "Searchable  Keywords",
            component: <SearchableKeywords id={id} data={singleProduct} />
        },
        {
            id: 7,
            label: "Stock History",
            component: <StockHistoryTab id={id} data={singleProduct} />
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
                    <CustomTypography content={(id && singleProduct.data?.product?.prd_name) ? singleProduct.data?.product?.prd_name : "Create Product"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="exportbtn">
                    {/* <CustomButton label={"Export"} variant='transparent' height='40px' /> */}
                </div>
            </div>
            <div className='switchbtn'>
                <CustomSwitchButton active={active} setActive={setActive} labelOne="Basic" labelTwo="Advanced" />
            </div>

            {
                active === 0 ? <CustomTabs tabs={basicTabs} id={id} isAdvanced={false} /> : <CustomTabs tabs={advancedTabs} id={id} isAdvanced={true} />
            }


        </div>
    )
}

export default catalogueDetails