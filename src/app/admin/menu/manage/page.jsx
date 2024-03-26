"use client"
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect } from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'
import "./CreateMenu.scss"
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import ImageUpload from '@/components/imageupload/ImageUpload'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter, useSearchParams } from 'next/navigation'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import { createMenu, getSingleMenu } from '@/services/features/menuSlice'
import GeneralTab from './tabs/GeneralTab'
import { useDispatch, useSelector } from 'react-redux'

function CreateMenu() {

    const router = useRouter()
    const dispatch = useDispatch()

    const [formData, setFormData] = React.useState({
        brd_name: '',
        menu_status: true,
    })
    const [loading, setLoading] = React.useState(false);
    const { singleMenu, isCreateMenuLoaded, isUpdateMenuLoaded, isUploadImageLoaded, isMenuSeoCreated, isMenuSeoUpdated } = useSelector(state => state.menus)
    const searchParams = useSearchParams()
    let id = searchParams.get('id');


    useEffect(() => {
        if (id) {
            dispatch(getSingleMenu({ id }));
        }
    }, [id, isCreateMenuLoaded, isUpdateMenuLoaded, isUploadImageLoaded, isMenuSeoCreated, isMenuSeoUpdated])


    const tabs = [
        {
            id: 1,
            label: "General",
            component: <GeneralTab id={id} data={singleMenu} />
        }
    ]

    return (
        <div className='menus_section_wrapper'>
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="flex items-center gap-3 mt-3 mb-3">
                <div className="backbtn " onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Menus"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>
            <div className='menus_section'>
                <div className="forms">
                    <CustomTabs tabs={tabs} />
                </div>
            </div>
        </div>
    )
}

export default CreateMenu