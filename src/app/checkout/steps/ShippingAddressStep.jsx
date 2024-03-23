'use client';
import React from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import { useDispatch } from 'react-redux';
import GoogleMap from '@/components/maps/GoogleMap';
import { Radio, RadioGroup } from '@nextui-org/react';
import CustomCheckbox from '@/library/checkbox/CustomCheckbox';
import CustomAddressRadio from '../components/CustomAddressRadio';
import { FaPlus } from 'react-icons/fa';
import CustomShippingMethodRadio from '../components/CustomShippingMethodRadio';
import "./ShippingAddressStep.scss";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { updateCartFlags } from '@/services/features/cartSlice';

const ShippingAddressStep = ({ onSubmit, formData, setFormData, userAddress, errors, setErrors }) => {

    const dispatch = useDispatch();

    const [shippingMethods, setShippingMethods] = React.useState([
        {
            id: 1,
            title: 'Shipping',
        },
        {
            id: 2,
            title: 'Store Pickup',
        }
    ])

    const handlePhoneChange = (name, value, countryCode) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (value === '' || re.test(value)) {
            setFormData((prev) => ({
                ...prev, [name]: value, customer_phone_country_code: countryCode
            }))
        }
    }

    const handleInputChange = ({ e, country }) => {

        if (e.target.name === 'fullname') {
            const re = /^[A-Za-z\s'.-]+$/;
            // if value is not blank, then test the regex
            if (e.target?.value === '' || re.test(e.target?.value)) {
                setFormData((prev) => ({
                    ...prev, [e.target.name]: e.target.value
                }))
            }
            // }

        } else {
            setFormData((prev) => ({
                ...prev, [e.target.name]: e.target.value
            }))
        }
    }



    const handleUpdateShippingMethod = (value) => {
        setFormData((prev) => ({ ...prev, shipping_method: value }))
        if (value === "Store Pickup") {
            setFormData((prev) => ({ ...prev, payment_method: "Credit Card/ Debit Card" }))
        }

        dispatch(updateCartFlags({
            data: {
                isStorePickup: (formData?.shipping_method === "Store Pickup") ? true : false,
                isCod: (formData?.payment_method === "Cash on Delivery") ? true : false
            }
        })).then((res) => {
            if (res.payload.success) {

            } else {

            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="step">
            {/* <div className="title">
                <CustomTypography content="1. Shipping Address" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
            </div> */}

            <CustomShippingMethodRadio data={shippingMethods}
                value={formData.shipping_method}
                onChange={(value) => {
                    handleUpdateShippingMethod(value);
                    // setFormData((prev) => ({ ...prev, shipping_method: value })) 
                }}
            />

            <div className="shipping_address w-100 mt-3">
                {
                    (!formData?.is_new_address && (userAddress?.result?.length > 0)) &&
                    <div className='flex gap-4 items-center w-100'>
                        <CustomAddressRadio data={userAddress?.result}
                            value={formData.address_id}
                            onChange={(value) => { setFormData((prev) => ({ ...prev, address_id: value })) }}
                        />
                    </div>
                }
                {/* <CustomButton label='Add a new address' variant='transparent' onClick={() => {
                    setFormData((prev) => ({ ...prev, is_new_address: true }))
                }} /> */}

                {
                    formData?.is_new_address ?
                        <div className='new_address_btn'>
                            <CustomTypography content='Add a new address' color="BLACK" size="MEDIUM" weight="MEDIUM" />
                        </div>
                        :
                        <div className='new_address_btn' onClick={() => { setFormData((prev) => ({ ...prev, is_new_address: true })) }}>
                            <FaPlus />
                            <CustomTypography content='Add a new address' color="BLACK" size="REGULAR" weight="MEDIUM" />
                        </div>
                }

                {
                    formData?.is_new_address &&
                    <>
                        <div className='new_address_form'>
                            <CustomInput name='address_title' type='text'
                                maxLength={100}
                                placeholder='Address Title' label={'Address Title'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.address_title}
                                isRequired={true}
                                isInvalid={errors.address_title.error}
                                errMsg={errors.address_title.message}
                            />

                            <CustomInput name='customer_name' type='text'
                                maxLength={100}
                                placeholder='Full Name' label={'Full Name'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.customer_name}
                                isRequired={true}
                                isInvalid={errors.customer_name.error}
                                errMsg={errors.customer_name.message}
                            />
                            <CustomInput name='customer_email' type='email'
                                maxLength={100}
                                placeholder='Email Address' label={'Email Address'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.customer_email}
                                isRequired={true}
                                isInvalid={errors.customer_email.error}
                                errMsg={errors.customer_email.message}
                            />
                            <CustomPhoneInput
                                isRequired={true}
                                name={'mobile'}
                                value={formData.customer_phone}
                                country={formData.customer_phone_country_code}
                                placeholder='Mobile Number'
                                label='Mobile Number'
                                onChange={(value, country) => {
                                    handlePhoneChange('customer_phone', value, country)
                                }}
                                isInvalid={errors.customer_phone.error}
                                errMsg={errors.customer_phone.message}
                            />

                            <GoogleMap formData={formData} setFormData={setFormData}
                                handleInputChange={handleInputChange}
                                isRequired={true}
                                isInvalid={errors.address_line_2.error}
                                errMsg={errors.address_line_2.message}
                            />
                            <CustomInput name='address_line_2' type='text'
                                maxLength={100}
                                placeholder='Address Line 2' label={'Address Line 2'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.address_line_2}
                                isRequired={true}
                                isInvalid={errors.address_line_2.error}
                                errMsg={errors.address_line_2.message}
                            />
                            <CustomInput name='flat_villa' type='text'
                                maxLength={100}
                                placeholder='Flat/ Villa Number' label={'Flat/ Villa Number'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.flat_villa}
                            />
                            <CustomInput name='zip_code' type='text'
                                maxLength={100}
                                placeholder='Zip Code' label={'Zip Code'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.zip_code}
                            />
                            <CustomTextarea label={'Delivery Remarks'}
                                placeholder={'Delivery Remarks'}
                                name={'delivery_remark'} value={formData.delivery_remark}
                                onChange={(e) => { handleInputChange({ e }) }}
                            />

                            {/* <CustomCheckbox
                            label={<p>Default Delivery Address</p>}
                            name='checkbox'
                            value={formData.default_delivery_address} onChange={(value) => { setFormData({ ...formData, default_delivery_address: value }) }}
                        />

                        <div className="flex gap-3 items-center">
                            <button className='savebtn' onClick={() => { setShowNewAddressForm(true) }}>
                                Save
                            </button>
                            <button className='cancelbtn' onClick={() => { setShowNewAddressForm(true) }}>
                                Cancel
                            </button>
                        </div> */}
                        </div>
                        {
                            userAddress?.result?.length > 0 &&
                            <div className='new_address_btn' onClick={() => { setFormData((prev) => ({ ...prev, is_new_address: false })) }}>
                                <IoMdArrowRoundBack />
                                <CustomTypography content='Use saved address?' color="BLACK" size="REGULAR" weight="MEDIUM" />
                            </div>
                        }
                    </>
                }

                {/* <button className='plusicon'
                            onClick={() => { setFormData((prev) => ({ ...prev, is_new_address: true })) }}>
                            <FaPlus />
                        </button> */}


            </div>
            <div className="flex justify-end mt-3">
                <CustomButton label='Use this address' variant='primary' onClick={() => { onSubmit() }} />
            </div>
        </div >
    )
}

export default ShippingAddressStep