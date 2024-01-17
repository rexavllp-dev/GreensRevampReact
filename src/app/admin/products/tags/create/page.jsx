"use client"
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'
import "./CreateTag.scss"
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import ImageUpload from '@/components/imageupload/ImageUpload'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import CustomTextarea from '@/library/textarea/CustomTextarea'

function CreateTag() {

    const router = useRouter()

    const [formData, setFormData] = React.useState({
        name: '',
        status: true,
    })
    const [loading, setLoading] = React.useState(false)

    const GeneralTab = () => {
        return (
            <div className='brandstab'>
                <div className="flex flex-col gap-2">
                    <CustomInput name='name' type='text'
                        maxLength={100}
                        placeholder='Name' label={'Name'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.name}
                    />
                    <div className="flex justify-end">
                        <CustomButton label='Save' />
                    </div>
                </div>
            </div>
        )
    }


    const tabs = [
        {
            id: 1,
            label: "General",
            component: <GeneralTab />
        }
    ]

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }



    return (
        <div className='brands_section_wrapper'>
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="flex items-center gap-3 mt-3 mb-3">
                <div className="backbtn " onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Tags"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>
            <div className='brands_section'>
                <div className="forms">
                    <CustomTabs tabs={tabs} />
                </div>
            </div>
        </div>
    )
}

export default CreateTag