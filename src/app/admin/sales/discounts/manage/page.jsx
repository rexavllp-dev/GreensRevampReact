
"use client";
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomSelect from '@/library/select/custom-select/CustomSelect';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import './ManageDiscount.scss';
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton';
import AutoComplete from '@/components/autocomplete/AutoComplete';
import { useEffect } from 'react';
import { getAllBrands } from '@/services/features/brandSlice';
import { useDispatch, useSelector } from 'react-redux';

const discountTypes = [
    { label: 'Percentage', value: "percentage" },
    { label: 'Fixed', value: 'fixed' },
]

const discountAppliedTypes = [
    { label: 'Brand', value: "brand" },
    { label: 'Category', value: 'category' },
]
const ManageDiscount = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    let id = searchParams.get('id');


    const [isDisabled, setIsDisabled] = React.useState(false)
    const { allBrands } = useSelector(state => state.brands);

    const [formData, setFormData] = React.useState({
        prd_name: '',
        prd_description: '',
        prd_tax_class: '',
        prd_storage_type: '',
        prd_tags: '',
        prd_expiry_date: '',
    })

    useEffect(() => {
        dispatch(getAllBrands())
    }, [])

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    return (
        <div className='manage-discount'>
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="header">
                <div className="title">
                    <div className="backbtn" onClick={() => router.back()}>
                        <FaArrowLeft />
                    </div>
                    <CustomTypography content={"Create Discount"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="exportbtn">
                    {/* <CustomButton label={"Export"} variant='transparent' height='40px' /> */}
                </div>
            </div>
            <div className="form">
                <div className="stack">
                    <CustomInput name='discount_name' type='text'
                        maxLength={100}
                        placeholder='Discount Name' label={'Discount Name'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.prd_name}
                        disabled={isDisabled}
                    />

                    <CustomCalendar
                        name={'special_price_start'}
                        label='Discount Start Date'
                        value={formData.special_price_start}
                        // isInvalid={errors.special_price_start.error}
                        // errMsg={errors.special_price_start.message}
                        disabled={isDisabled}
                        onChange={(date) => {
                            setFormData((prevData) => ({ ...prevData, special_price_start: date }));
                            // setErrors((prevErrors) => ({ ...prevErrors, special_price_start: { error: false, message: '' } }));
                        }}
                        isRequired={true}
                    />
                    <CustomToggleButton label='Discount Status' value={formData.prd_status}
                        disabled={isDisabled}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, prd_status: value })) }}
                    />

                    <CustomSelect label={'Discount Applied To'}
                        value={formData.special_price_type}
                        data={discountAppliedTypes}
                        name={'special_price_type'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                        isRequired={true}
                    />

                    <AutoComplete data={allBrands?.data} optionLabel={'brd_name'} optionValue={'id'} />

                </div>


                <div className='stack'>
                    <div className='flex gap-2'>
                        <div className='min-w-[200px]'>
                            <CustomSelect label={'Discount Type'} value={formData.special_price_type} data={discountTypes} name={'special_price_type'}
                                haveInfo={true}
                                info={"Percentage: Reduces the price by a certain percentage. Fixed: Subtracts a specific amount directly from the original price."}
                                onChange={(e) => { handleInputChange({ e }) }}
                                disabled={isDisabled}
                                isRequired={true}
                            />
                        </div>

                        <CustomInput name='product_price' type='text'
                            maxLength={100}
                            placeholder='Discount' label={'Discount'}
                            isRequired={true}
                            onChange={(e) => { handleInputChange({ e }) }}
                            value={formData.product_price}
                            disabled={isDisabled}
                        />
                    </div>


                    <CustomCalendar
                        name={'special_price_end'}
                        label='Discount End Date'
                        value={formData.special_price_end}
                        disabled={isDisabled}
                        // isInvalid={errors.special_price_end.error}
                        // errMsg={errors.special_price_end.message}
                        onChange={(date) => {
                            setFormData((prevData) => ({ ...prevData, special_price_end: date }));
                            // setErrors((prevErrors) => ({ ...prevErrors, special_price_end: { error: false, message: '' } }));
                        }}
                        isRequired={true}
                    />

                </div>
            </div>
        </div >
    )
}

export default ManageDiscount