'use client'
import React, { useEffect, useState } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import CustomButton from '@/library/buttons/CustomButton';
import GoogleMap from '@/components/maps/GoogleMap';
import { useDispatch, useSelector } from 'react-redux';
import { BsTruck } from "react-icons/bs";
import { FaMinus, FaPlus, FaStore } from 'react-icons/fa';
import './Checkout.scss';
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput';
import CustomRadioBox from '@/library/radiobox/CustomRadioBox';
import Image from 'next/image';

const Checkout = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = React.useState({

    })
    const [addressType, setAddressType] = React.useState('home')


    useEffect(() => {
    }, [])


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
        <div className='checkout-wrapper'>
            <div className="checkout">
                <div className="checkoutsteps">
                    <div className="step">
                        <div className="title">
                            <CustomTypography content="1. Shipping Address" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                        </div>

                        <div className="checkoutform">
                            <CustomInput name='fullname' type='text'
                                maxLength={100}
                                placeholder='Full Name' label={'Full Name'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.fullname}
                            />
                            <GoogleMap formData={formData} setFormData={setFormData}
                                handleInputChange={handleInputChange} />
                            <CustomInput name='addressline_one' type='text'
                                maxLength={100}
                                placeholder='Full Name' label={'Full Name'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.addressline_one}
                            />
                            <CustomTextarea label={'Delivery Remarks'}
                                placeholder={'Delivery Remarks'}
                                name={'delivery_remarks'} value={formData.delivery_remarks}
                                onChange={(e) => { handleInputChange({ e }) }}
                            />

                            <CustomPhoneInput
                                isRequired={true}
                                name={'mobile'}
                                value={formData.mobile}
                                country={formData.usr_mobile_country_code}
                                placeholder='Mobile Number'
                                label='Mobile Number'
                                onChange={(value, country) => {
                                    handlePhoneChange('mobile', value, country)
                                }}
                            />
                        </div>
                        <div className="flex justify-end">
                            <CustomButton label='Use this address' variant='primary' onClick={() => { }} />
                        </div>
                    </div>






                    <div className="step">
                        <div className="productcard">
                            <div className="title">
                                <CustomTypography content="2. Order Confirmation" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                            </div>
                            <div className="content">
                                <div className="left">
                                    <div className="image-wrapper">
                                        <div className="image">
                                            <Image width={100} height={100}
                                                alt="product"
                                                src={'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="title">
                                        <CustomTypography content={"Product Title"}
                                            color='BLACK' style={{ borderBottom: '1px solid #111', display: 'inline' }}
                                            size='MEDIUM' weight='MEDIUM' />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <CustomTypography content={"AED 30"} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                        <CustomTypography content="Quantity - 1" color="BLACK" size="MEDIUM" weight="REGULAR" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <CustomButton label='Continue' variant='primary' onClick={() => { }} />
                        </div>
                    </div>










                    <div className="step">
                        <div className="title mb-3">
                            <CustomTypography content="3. Payment Method" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                        </div>

                        <CustomRadioBox
                            value={addressType}
                            onChange={(value) => setAddressType(value)}
                            items={
                                [{
                                    id: 1,
                                    title: 'Credit Card/ Debit Card',
                                    value: 'price_asc'
                                },
                                {
                                    id: 2,
                                    title: 'Cash on Delivery',
                                    value: 'price_desc'
                                },
                                ]
                            } />

                        <div className="flex justify-end">
                            <CustomButton label='Continue' variant='primary' onClick={() => { }} />
                        </div>
                    </div>


                </div>

                <div className="carttotal">
                    <div className="item">
                        <CustomTypography content={`Subtotal ${'100'} items`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                        <CustomTypography content={"AED 96"} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                    </div>

                    <div className="item">
                        <CustomTypography content="Shipping" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                        <CustomTypography content="FREE" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                    </div>

                    <div className="item">
                        <CustomTypography content="VAT 5%" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                        {/* <CustomTypography content="AED 80" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" /> */}
                    </div>
                    <div className="item">
                        <CustomTypography content="Grand Total (Including VAT)" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                        <CustomTypography content={"AED 105"} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout