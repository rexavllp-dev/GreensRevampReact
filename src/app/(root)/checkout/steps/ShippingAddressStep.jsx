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

const ShippingAddressStep = ({ onSubmit, formData, setFormData }) => {

    const dispatch = useDispatch();
    const [showNewAddressForm, setShowNewAddressForm] = React.useState(false)

    const [addressTypes, setAddressTypes] = React.useState([
        {
            id: 1,
            title: 'Home',
            address: '123 Main St, Anytown USA 12345',
        },
        {
            id: 2,
            title: 'Work',
            address: '123 Main St, Anytown USA 12345',
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
                ...prev, [name]: value, usr_mobile_country_code: countryCode
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

            <div className="checkoutform">
                {
                    !showNewAddressForm &&
                    <div className='flex gap-4 items-center'>

                        {/* <RadioGroup
                            label=""
                            orientation="horizontal"
                        >
                            {
                                addressTypes.map((addressType) => (
                                    <Radio className='mr-1' key={addressType.id} value={addressType.title}>{addressType.title}</Radio>
                                ))
                            }
                        </RadioGroup> */}

                        <CustomAddressRadio data={addressTypes} />

                        <button className='plusicon' onClick={() => { setShowNewAddressForm(true) }}>
                            <FaPlus />
                        </button>
                    </div>
                }


                {
                    showNewAddressForm &&
                    <>
                        {/* <CustomInput name='address_title' type='text'
                            maxLength={100}
                            placeholder='Address Title' label={'Address Title'}
                            onChange={(e) => { handleInputChange({ e }) }}
                            value={formData.address_title}
                        /> */}

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
                        <CustomShippingMethodRadio data={shippingMethods}
                            value={formData.shipping_method}
                            onChange={(value) => { setFormData((prev) => ({ ...prev, shipping_method: value })) }}
                        />
                        {
                            formData.shipping_method === 'Shipping' &&
                            <>

                                <GoogleMap formData={formData} setFormData={setFormData}
                                    handleInputChange={handleInputChange} />
                                <CustomInput name='address_line' type='text'
                                    maxLength={100}
                                    placeholder='Address Line' label={'Address Line'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.address_line}
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
                                    name={'note'} value={formData.note}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                />
                            </>
                        }

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
                    </>
                }


            </div>
            <div className="flex justify-end">
                <CustomButton label='Use this address' variant='primary' onClick={() => { onSubmit() }} />
            </div>
        </div >
    )
}

export default ShippingAddressStep