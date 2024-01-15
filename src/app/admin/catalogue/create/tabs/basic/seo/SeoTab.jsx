
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomButton from '@/library/buttons/CustomButton'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './SeoTab.scss'

const SeoTab = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        meta_title: '',
        meta_scripts: '',
        meta_description: '',
    })

    const [loading, setLoading] = React.useState(false);

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = () => {

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
                        name={'meta_scripts'} value={formData.meta_scripts}
                        onChange={(e) => { handleInputChange({ e }) }} />
                </div>

                <div className="stack">
                    <CustomTextarea label={'Meta Scripts'}
                        placeholder={'Meta Scripts'}
                        name={'meta_description'} value={formData.meta_description}
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