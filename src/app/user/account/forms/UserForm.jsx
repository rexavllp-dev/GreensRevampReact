'use client';

import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import MediaUpload from '@/library/mediaupload/MediaUpload'
import { toast } from 'react-toastify';
import CustomButton from '@/library/buttons/CustomButton';
import CustomTypography from '@/library/typography/CustomTypography';
import { updateAccountToCompany, updateUserDetailsByUser } from '@/services/features/userSlice';
import { useDispatch } from 'react-redux';

const UserForm = ({ isDisabled, userDetails }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        usr_firstname: '',
        usr_lastname: '',
        usr_mobile_number: '',
        usr_mobile_country_code: '',
        usr_email: '',
    })

    const [errors, setErrors] = React.useState({
        usr_firstname: {
            error: false,
            message: ''
        },
        usr_lastname: {
            error: false,
            message: ''
        },
        usr_mobile_number: {
            error: false,
            message: ''
        },
        usr_email: {
            error: false,
            message: ''
        },
    })

    React.useEffect(() => {
        if (userDetails) {
            setFormData((prev) => ({
                ...prev,
                usr_firstname: userDetails?.result?.usr_firstname,
                usr_lastname: userDetails?.result?.usr_lastname,
                usr_mobile_number: userDetails?.result?.usr_mobile_number,
                usr_mobile_country_code: userDetails?.result?.usr_mobile_country_code,
                usr_email: userDetails?.result?.usr_email,
            }))
        }
    }, [userDetails])

    useEffect(() => {
        console.log(formData);
    }, [formData])

    const handlePhoneChange = (name, value, countryCode) => {
        if (name === 'mobile') {
            const re = /^[0-9\b]+$/;
            // if value is not blank, then test the regex
            if (value === '' || re.test(value)) {
                setFormData((prev) => ({
                    ...prev, [name]: value, usr_mobile_country_code: countryCode
                }))
            }
        } else if (name === 'company_landline') {
            const re = /^[0-9\b]+$/;
            // if value is not blank, then test the regex
            if (value === '' || re.test(value)) {
                setFormData((prev) => ({
                    ...prev, [name]: value, company_landline_country_code: countryCode
                }))
            }
        }
    }


    const handleInputChange = ({ e, country }) => {

        if (e.target.name === 'trn_number') {
            const re = /^[0-9\b]+$/;
            // if value is not blank, then test the regex
            if (e.target?.value === '' || re.test(e.target?.value)) {
                setFormData((prev) => ({
                    ...prev, ['trn_number']: e.target.value
                }))
            }
        } else {
            setFormData((prev) => ({
                ...prev, [e.target.name]: e.target.value
            }))
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: {
                error: false,
                message: ''
            }
        }))
    }

    const handleUpdateUser = () => {
        const data = {
            ...formData
        }
        dispatch(updateUserDetailsByUser({ data: data })).then((res) => {
            if (res.payload.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <CustomInput name='usr_firstname' type='text'
                maxLength={100}
                placeholder='First Name' label={'First Name'}
                isRequired={true}
                onChange={(e) => { handleInputChange({ e }) }}
                value={formData.usr_firstname}
                isInvalid={errors.usr_firstname.error}
                errMsg={errors.usr_firstname.message}
                disabled={isDisabled}
            />
            <CustomInput
                name='usr_lastname'
                type='text'
                maxLength={100}
                placeholder='Last Name'
                label={'Last Name'}
                isRequired={true}
                onChange={(e) => { handleInputChange({ e }) }}
                value={formData.usr_lastname}
                isInvalid={errors.usr_lastname.error}
                errMsg={errors.usr_lastname.message}
                disabled={isDisabled}
            />
            <CustomInput name={'usr_email'} type='email'
                placeholder="Email Address"
                isInvalid={errors.usr_email.error}
                errMsg={errors.usr_email.message}
                label={'Email Address'} isRequired={true}
                value={formData.usr_email}
                onChange={(e) => { handleInputChange({ e }) }}
                disabled={isDisabled}
            />

            <CustomPhoneInput
                isRequired={true}
                name={'usr_mobile_number'}
                value={formData.usr_mobile_number}
                country={formData.usr_mobile_country_code}
                placeholder='Mobile Number'
                label='Mobile Number'
                onChange={(value, country) => {
                    handlePhoneChange('usr_mobile_number', value, country)
                }}
                isInvalid={errors.usr_mobile_number.error}
                errMsg={errors.usr_mobile_number.message}
                disabled={isDisabled}
            />

            {
                !isDisabled &&
                <div className="flex gap-3 items-center mt-3">
                    <CustomButton variant='transparent' label='Update' onClick={() => { handleUpdateUser() }} />
                </div>
            }
        </>
    )
}

export default UserForm