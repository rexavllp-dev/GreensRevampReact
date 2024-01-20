"use client"
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect } from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'
import "./CreateBrand.scss"
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import ImageUpload from '@/components/imageupload/ImageUpload'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import { createBrand, getSingleBrand } from '@/services/features/brandSlice'
import GeneralTab from './tabs/GeneralTab'
import ImagesTab from './tabs/ImagesTab'
import SeoTab from './tabs/SeoTab'
import { useDispatch, useSelector } from 'react-redux'

function CreateBrand() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [formData, setFormData] = React.useState({
        brd_name: '',
        brand_status: true,
    })
    const [loading, setLoading] = React.useState(false);
    const { singleBrand } = useSelector(state => state.brands)
    const searchParams = useSearchParams()
    let id = searchParams.get('id');


  useEffect(() => {
        if (id) {
            dispatch(getSingleBrand({ id }));
        }
    }, [id])

   
    const tabs = [
        {
            id: 1,
            label: "General",
            component: <GeneralTab id={id} data={singleBrand} />
        },
        {
            id: 2,
            label: "Images",
            component: <ImagesTab id={id} data={singleBrand} />
        },
        {
            id: 3,
            label: "SEO",
            component: <SeoTab id={id} data={singleBrand} />
        }
    ]

    return (
        <div className='brands_section_wrapper'>
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="flex items-center gap-3 mt-3 mb-3">
                <div className="backbtn " onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Brands"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>
            <div className='brands_section'>
                <div className="forms">
                    <CustomTabs tabs={tabs} />
                </div>
            </div>
        </div>
    )
}

export default CreateBrand