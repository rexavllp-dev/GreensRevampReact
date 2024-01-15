
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import { NUMBER_REGEX, SPECIAL_CHARS_REGEX, UPPERCASE_REGEX } from '@/utils/helpers/validationRules';
import { createUserByAdmin } from '@/services/features/userSlice';
import { isEmailValid } from '@/utils/helpers/IsEmailValid';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './GeneralTab.scss'
import { CustomCalendar } from '@/library/calendar/CustomCalendar';

const GeneralTab = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const roles = [
        { label: 'Customer', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Delivery', value: 3 },
    ]

    const [formData, setFormData] = React.useState({
        product_name: '',
        product_desc:'',
        tax_class: '',
        storage_type:'',
        tags:'',
        expiry_date:'',
        brand_name: '',
        categories: [],

        status: true,
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
        <div className='generaltab'>

            <div className="form">

                <div className="stack">

                    <CustomInput name='product_name' type='text'
                        maxLength={100}
                        placeholder='Product Name' label={'Product Name'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.product_name}
                    />
                    <CustomTextarea label={'Description'}
                        placeholder={'Description'}
                        name={'product_desc'} value={formData.product_desc}
                        onChange={(e) => { handleInputChange({ e }) }} />


                    <CustomSelect label={'Tax Class'} data={roles} />
                    <CustomSelect label={'Storage Type'} data={roles} />
                    <CustomSelect label={'Tags'} data={roles} />
                    <CustomCalendar
                        name={'expiry_date'}
                        label='Expiry Date'
                        value={formData.expiry_date}
                        // isInvalid={errors.trade_license_expiry.error}
                        // errMsg={errors.trade_license_expiry.message}
                        onChange={(date) => {
                            setFormData((prevData) => ({ ...prevData, expiry_date: date }));
                            // setErrors((prevErrors) => ({ ...prevErrors, trade_license_expiry: { error: false, message: '' } }));
                        }}
                    />
                </div>

                <div className="stack">

                    <CustomInput name='first_name' type='text'
                        maxLength={100}
                        placeholder='Brand Name' label={'Brand Name'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.first_name}
                    />

                    <CustomSelect label={'Categories'} data={roles} />
                    <CustomSelect label={'Product Return Type'} data={roles} />

                    <CustomInput name='first_name' type='text'
                        maxLength={100}
                        placeholder='Sales Unit' label={'Sales Unit'}

                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.first_name}
                    />

                    <CustomToggleButton label='Dashboard Status' value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />

                    <CustomToggleButton label='Product Status' value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>


        </div>
    )
}

export default GeneralTab