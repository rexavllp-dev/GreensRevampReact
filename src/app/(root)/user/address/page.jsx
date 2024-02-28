'use client';
import React from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from '@/components/maps/GoogleMap';
import { Radio, RadioGroup } from '@nextui-org/react';
import CustomCheckbox from '@/library/checkbox/CustomCheckbox';
import { FaPlus } from 'react-icons/fa';
import "./UserAddress.scss";
import { IoMdArrowRoundBack } from 'react-icons/io';
import CustomShippingMethodRadio from '@/app/checkout/components/CustomShippingMethodRadio';
import CustomAddressRadio from '@/app/checkout/components/CustomAddressRadio';

const UserAddress = () => {

    const dispatch = useDispatch();
    const { userAddress } = useSelector((state) => state.users)

    const [formData, setFormData] = React.useState({})


    const [addressTypes, setAddressTypes] = React.useState([
        {
            id: 1,
            title: 'Home',
            address: '123 Main St, Anytown USA 12345',
            value: 1
        },
        {
            id: 2,
            title: 'Work',
            address: '123 Main St, Anytown USA 12345',
            value: 2
        }
    ])

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

    return (
        <div className="step">
            {/* <div className="title">
                <CustomTypography content="1. Shipping Address" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
            </div> */}

            <CustomShippingMethodRadio data={shippingMethods}
                value={formData.shipping_method}
                onChange={(value) => { setFormData((prev) => ({ ...prev, shipping_method: value })) }}
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
                            />

                            <CustomInput name='customer_name' type='text'
                                maxLength={100}
                                placeholder='Full Name' label={'Full Name'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.customer_name}
                            />
                            <CustomInput name='customer_email' type='email'
                                maxLength={100}
                                placeholder='Email Address' label={'Email Address'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.customer_email}
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
                            />

                            <GoogleMap formData={formData} setFormData={setFormData}
                                handleInputChange={handleInputChange} />
                            <CustomInput name='address_line_2' type='text'
                                maxLength={100}
                                placeholder='Address Line 2' label={'Address Line 2'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.address_line_2}
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
           
        </div >
    )
}

export default UserAddress