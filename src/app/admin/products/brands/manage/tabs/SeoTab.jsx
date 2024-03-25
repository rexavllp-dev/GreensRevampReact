import React, { useEffect } from 'react'
import CustomButton from "@/library/buttons/CustomButton"
import CustomInput from "@/library/input/custominput/CustomInput"
import CustomTextarea from "@/library/textarea/CustomTextarea"
import { useDispatch } from "react-redux"
import { createBrandSeo, updateBrandSeo } from '@/services/features/brandSlice'
import { toast } from 'react-toastify'


const SeoTab = ({ id, data }) => {


    const [formData, setFormData] = React.useState({
        meta_title: '',
        meta_script: '',
        meta_description: '',
    })
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    useEffect(() => {
        if (data?.result?.id) {
            setFormData((prev) => ({
                meta_title: data?.result?.meta_title,
                meta_script: data?.result?.meta_script,
                meta_description: data?.result?.meta_description
            }))
        }
    }, [data])

    const handleSubmit = () => {
        const data = {
            meta_title: formData.meta_title,
            meta_script: formData.meta_script,
            meta_description: formData.meta_description,
        }
        if (data?.result?.id) {
            dispatch(updateBrandSeo({ data: data, id: id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);

                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
        } else {
            dispatch(createBrandSeo({ data: data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);

                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
        }

    }


    return (
        <div className="brandstab ">
            <div className="forms">

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
                            name={'meta_script'} value={formData.meta_script}
                            onChange={(e) => { handleInputChange({ e }) }} />
                    </div>
                </div>

                <div className="stack mb-3">
                    <CustomTextarea label={'Meta Scripts'}
                        placeholder={'Meta Scripts'}
                        name={'meta_description'} value={formData.meta_description}
                        onChange={(e) => { handleInputChange({ e }) }} />
                </div>
            </div>
            <div className="savebtn flex justify-end">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={() => handleSubmit()} />
            </div>
        </div>
    )
}

export default SeoTab