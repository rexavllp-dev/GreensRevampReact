"use client"
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import { IoFolderOpenOutline } from 'react-icons/io5'
import "./CreateBrand.scss"
import CustomTabs from '@/components/customtabs/CustomTabs'
import CustomButton from '@/library/buttons/CustomButton'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import ImageUpload from '@/components/imageupload/ImageUpload'
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs'
import { FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import CustomTextarea from '@/library/textarea/CustomTextarea'

function CreateBrand() {

    const router = useRouter()

    const [formData, setFormData] = React.useState({
        title: '',
        status: true,
    })
    const [loading, setLoading] = React.useState(false)

    const GeneralTab = () => {
        return (
            <div className='brandstab'>
                <div className="flex flex-col gap-2">
                    <CustomInput name='title' type='text'
                        maxLength={100}
                        placeholder='Title' label={'Title'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.title}
                    />
                    <CustomToggleButton label='Status' isRequired={true} value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />
                    <div className="flex justify-end">
                        <CustomButton label='Save Changes' />
                    </div>
                </div>
            </div>
        )
    }

    const ImagesTab = () => {
        return (
            <div className='brandstab'>
                <div className="stack mb-3">

                    <CustomTypography content='Logo' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'event_img_path'}
                        handleFileUpload={handleFileUpload}
                        // images={event?.images}
                        handleDeleteImage={handleDeleteImage}
                        haveUploadSize={true}
                        uploadSize={{
                            "width": '1920',
                            "height": '1080'
                        }}
                    />

                </div>

                <div className="stack">
                    <CustomTypography content='Banner Image' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'event_img_path'}
                        handleFileUpload={handleFileUpload}
                        // images={event?.images}
                        handleDeleteImage={handleDeleteImage}
                        haveUploadSize={true}
                        uploadSize={{
                            "width": '1920',
                            "height": '1080'
                        }}
                    />
                </div>
                <div className="flex justify-end mt-3">
                    <CustomButton label='Save Changes' />
                </div>
            </div>
        )
    }

    const SeoTab = () => (
        <div className="brandstab ">
            <div className="stack mb-3">
                <CustomInput name='meta_title' type='text'
                    maxLength={100}
                    placeholder='Meta Title' label={'Meta Title'}
                    onChange={(e) => { handleInputChange({ e }) }}
                    value={formData.meta_title}
                />
                <div className="mt-3">
                    <CustomTextarea label={'Meta Description'}
                        placeholder={'Meta Description'}
                        name={'meta_scripts'} value={formData.meta_scripts}
                        onChange={(e) => { handleInputChange({ e }) }} />
                </div>
            </div>

            <div className="stack mb-3">
                <CustomTextarea label={'Meta Scripts'}
                    placeholder={'Meta Scripts'}
                    name={'meta_description'} value={formData.meta_description}
                    onChange={(e) => { handleInputChange({ e }) }} />
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>
        </div>
    )


    const tabs = [
        {
            id: 1,
            label: "General",
            component: <GeneralTab />
        },
        {
            id: 2,
            label: "Images",
            component: <ImagesTab />
        },
        {
            id: 3,
            label: "SEO",
            component: <SeoTab />
        }
    ]

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleFileUpload = async (event) => {
        let files = null;

    }

    const handleDeleteImage = () => {

    }
    const handleSubmit = () => {

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