'use client';
import React, { useEffect } from 'react'
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
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { createUserAddress, getAddressByUser, updateUserAddress } from '@/services/features/userSlice';
import { toast } from 'react-toastify';

const UserAddress = () => {

    const dispatch = useDispatch();
    const { userAddress, isUserAddressCreated, isUserAddressUpdated } = useSelector((state) => state.users)

    const [formData, setFormData] = React.useState({
        address_title: "",
        full_name: "",
        address_email: "",
        mobile_country_code: "",
        mobile_number: "",
        flat_villa: "",
        zip_code: "",
        delivery_remark: "",
        is_default: false,
        is_new_address: false,
        address_line_1: "",
        address_line_2: "",
        // country_code: "",
        // place: "",
        latitude: "",
        longitude: ""
    })

    useEffect(() => {
        dispatch(getAddressByUser({}));
        setFormData((prev) => ({
            ...prev,
            is_new_address: false
        }))
    }, [isUserAddressCreated, isUserAddressUpdated])

    const handlePhoneChange = (name, value, countryCode) => {
        const re = /^[0-9\b]+$/;
        // if value is not blank, then test the regex
        if (value === '' || re.test(value)) {
            setFormData((prev) => ({
                ...prev, [name]: value, mobile_country_code: countryCode
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

    const handleCreateAddress = () => {
        const data = {
            address_title: formData?.address_title,
            full_name: formData?.full_name,
            address_email: formData?.address_email,
            mobile_country_code: formData?.mobile_country_code,
            mobile_number: formData?.mobile_number,
            flat_villa: formData?.flat_villa,
            zip_code: formData?.zip_code,
            delivery_remark: formData?.delivery_remark,
            is_default: formData?.is_default || false,
            address_line_1: formData?.address_line_1,
            address_line_2: formData?.address_line_2,
            latitude: formData?.latitude,
            longitude: formData?.longitude
        }

        dispatch(createUserAddress({ data })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="address_section">
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Addresses'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
            </div>

            <div className="shipping_address w-100 mt-3">
                {
                    (userAddress?.result?.length > 0) &&
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

                            <CustomInput name='full_name' type='text'
                                maxLength={100}
                                placeholder='Full Name' label={'Full Name'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.full_name}
                            />
                            <CustomInput name='address_email' type='email'
                                maxLength={100}
                                placeholder='Email Address' label={'Email Address'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.address_email}
                            />
                            <CustomPhoneInput
                                isRequired={true}
                                name={'mobile'}
                                value={formData.mobile_number}
                                country={formData.mobile_country_code}
                                placeholder='Mobile Number'
                                label='Mobile Number'
                                onChange={(value, country) => {
                                    handlePhoneChange('mobile_number', value, country)
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

                            <CustomCheckbox
                                label={<p>Default Delivery Address</p>}
                                name='checkbox'
                                value={formData.is_default} onChange={(value) => { setFormData({ ...formData, is_default: value }) }}
                            />

                            <div className="flex gap-3 items-center">
                                <button className='savebtn' onClick={() => { handleCreateAddress() }}>
                                    Save
                                </button>
                                <button className='cancelbtn' onClick={() => { setFormData((prev) => ({ ...prev, is_new_address: false })) }}>
                                    Cancel
                                </button>
                            </div>
                        </div>
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