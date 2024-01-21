
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomButton from '@/library/buttons/CustomButton'
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import './SeoTab.scss'
import { createProductSeo, updateProductSeo } from '@/services/features/productSlice';
import { toast } from 'react-toastify';

const SeoTab = ({ data, id }) => {

    const dispatch = useDispatch();
    const router = useRouter();



    const [formData, setFormData] = React.useState({
        meta_title: '',
        meta_script: '',
        meta_description: '',
        product_id: id,
    })

    const [loading, setLoading] = React.useState(false);


    useEffect(() => {
        if (data?.data?.product?.product_seo_id) {
            setFormData((prev) => ({
                meta_title: data?.data?.product?.meta_title,
                meta_script: data?.data?.product?.meta_script,
                meta_description: data?.data?.product?.meta_description,
                product_id: id
            }))

        }
    }, [data])

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = () => {
        setLoading(true)
        if (data?.data?.product?.product_seo_id) {
            dispatch(updateProductSeo({ data: formData, id: id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })

        } else {
            dispatch(createProductSeo({ data: formData })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((error) => {
                console.log(error)
                setLoading(false)
            })
        }
    }

    return (
        <div className='seotab'>

            <div className="form">

                <div className="stack">

                    <CustomInput name='meta_title' type='text'
                        maxLength={100}
                        placeholder='Meta Title' label={'Meta Title'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.meta_title}
                    />
                    <CustomTextarea label={'Meta Description'}
                        placeholder={'Meta Description'}
                        name={'meta_description'} value={formData.meta_description}
                        onChange={(e) => { handleInputChange({ e }) }} />
                </div>

                <div className="stack">
                    <CustomTextarea label={'Meta Scripts'}
                        placeholder={'Meta Scripts'}
                        name={'meta_script'} value={formData.meta_script}
                        onChange={(e) => { handleInputChange({ e }) }} />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>


        </div>
    )
}

export default SeoTab