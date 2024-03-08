'use client';

import React, { useEffect } from 'react'
import { CustomCalendar } from '@/library/calendar/CustomCalendar'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import MediaUpload from '@/library/mediaupload/MediaUpload'
import { toast } from 'react-toastify';
import CustomButton from '@/library/buttons/CustomButton';
import CustomTypography from '@/library/typography/CustomTypography';
import { updateAccountToCompany, updateCompanyDetailsByUser } from '@/services/features/userSlice';
import { useDispatch } from 'react-redux';

const CompanyUserForm = ({ isDisabled, userDetails }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        company_name: '',
        first_name: '',
        last_name: '',
        designation: '',
        email: '',
        company_landline: '',
        company_landline_country_code: '',
        mobile: '',
        usr_mobile_country_code: '',
        trn_number: '',
        trade_license_expiry: '',
        vat_certificate: {},
        trade_license: {},
    })

    const [errors, setErrors] = React.useState({
        company_name: {
            error: false,
            message: ''
        },
        first_name: {
            error: false,
            message: ''
        },
        last_name: {
            error: false,
            message: ''
        },
        designation: {
            error: false,
            message: ''
        },
        email: {
            error: false,
            message: ''
        },
        mobile: {
            error: false,
            message: ''
        },
        vat_certificate: {
            error: false,
            message: ''
        },
        trade_license: {
            error: false,
            message: ''
        },
        trn_number: {
            error: false,
            message: ''
        },
        trade_license_expiry: {
            error: false,
            message: ''
        },
    });

    React.useEffect(() => {
        if (userDetails) {
            setFormData((prev) => ({
                ...prev,
                first_name: userDetails?.result?.usr_firstname,
                last_name: userDetails?.result?.usr_lastname,
                mobile: userDetails?.result?.usr_mobile_number,
                usr_mobile_country_code: userDetails?.result?.usr_mobile_country_code,
                email: userDetails?.result?.usr_email,
                company_name: userDetails?.result?.company_name,
                designation: userDetails?.result?.usr_designation,
                company_landline: userDetails?.result?.company_landline,
                company_landline_country_code: userDetails?.result?.company_landline_country_code,
                trn_number: userDetails?.result?.company_trn_number,
                trade_license_expiry: new Date(userDetails?.result?.company_trade_license_expiry),
                vat_certificate: {},
                trade_license: {},
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

    const handleFileUpload = (event) => {

        const files = event.target.files;
        const file = files[0];

        const fieldName = event.target.name;

        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: file
        }))

        setErrors((prevErrors) => ({
            ...prevErrors,
            [event.target.name]: {
                error: false,
                message: ''
            }
        }))
    }

    const handleSubmit = () => {

        const companyFormData = new FormData();

        companyFormData.append('usr_firstname', formData.first_name);
        companyFormData.append('usr_lastname', formData.last_name);
        companyFormData.append('usr_designation', formData.designation);
        // companyFormData.append('usr_mobile_number', formData.mobile);
        // companyFormData.append('usr_mobile_country_code', formData.usr_mobile_country_code);
        companyFormData.append('usr_password', formData.password);
        // companyFormData.append('usr_email', formData.email);
        companyFormData.append('company_name', formData.company_name);
        companyFormData.append('company_trn_number', formData.trn_number);
        companyFormData.append('company_trade_license_expiry', new Date(formData.trade_license_expiry));
        
        if(formData.vat_certificate){
            companyFormData.append('company_vat_certificate', formData.vat_certificate);
        }
        if(formData.trade_license){
            companyFormData.append('company_trade_license', formData.trade_license);
        }
        if (formData.company_landline?.trim()) {
            companyFormData.append('company_landline', formData.company_landline);
            companyFormData.append('company_landline_country_code', formData.company_landline_country_code);
        }


        dispatch(updateCompanyDetailsByUser({ data: companyFormData })).then((res) => {
            if (res.payload.success) {
                toast.success(res.payload.message)
            } else {
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <CustomInput name={'company_name'} value={formData.company_name} onChange={(e) => { handleInputChange({ e }) }}
                type='text' placeholder='Company Name' label={'Company Name'} isRequired={true}
                isInvalid={errors.company_name?.error} errMsg={errors.company_name?.message}
                disabled={isDisabled}
            />

            <CustomInput name={'first_name'} type='text' value={formData.first_name} onChange={(e) => { handleInputChange({ e }) }}
                placeholder='First Name' label={'First Name'} isRequired={true}
                isInvalid={errors.first_name?.error} errMsg={errors.first_name?.message}
                disabled={isDisabled}

            />

            <CustomInput name={'last_name'} type='text' value={formData.last_name} onChange={(e) => { handleInputChange({ e }) }}
                placeholder='Last Name' label={'Last Name'} isRequired={true}
                isInvalid={errors.last_name?.error} errMsg={errors.last_name?.message}
                disabled={isDisabled}
            />

            <CustomInput name={'designation'} type='text' value={formData.designation} onChange={(e) => { handleInputChange({ e }) }}
                placeholder='Designation' label={'Designation'} isRequired={true}
                isInvalid={errors.designation?.error} errMsg={errors.designation?.message}
                disabled={isDisabled}
            />

            <CustomPhoneInput name={'mobile'} value={formData.mobile}
                label='Mobile Number' isRequired={true} placeholder={'Mobile Number'}
                isInvalid={errors.mobile.error}
                errMsg={errors.mobile.message}
                onChange={(value, country) => {
                    handlePhoneChange('mobile', value, country)
                }}
                disabled={true}
            />

            <CustomPhoneInput name={'company_landline'} value={formData.company_landline}
                label='Landline' isRequired={false} placeholder={'Landline'}
                // isInvalid={errors.landline.error}
                disabled={isDisabled}
                // errMsg={errors.landline.message}
                onChange={(value, country) => {
                    handlePhoneChange('company_landline', value, country)
                }}
            />

            <CustomInput name={'email'} type='text' value={formData.email} onChange={(e) => { handleInputChange({ e }) }}
                disabled={true}
                placeholder="Email Address" label={'Email Address'} isRequired={true}
                isInvalid={errors.email?.error} errMsg={errors.email?.message}
            />

            {/* <CustomToggleButton label='VAT Registered' isRequired={true} /> */}
            <MediaUpload name={'vat_certificate'} label='VAT Certficate' placeholder='VAT Certificate' isRequired={true}
                haveInfo={true}
                isInvalid={errors.vat_certificate.error}
                disabled={isDisabled}
                errMsg={errors.vat_certificate.message}
                info={'Only JPEG and PDF formats are allowed'}
                value={formData.vat_certificate}
                handleFileUpload={handleFileUpload}
            />
            <CustomInput
                name={'trn_number'}
                type='text'
                value={formData.trn_number}
                isInvalid={errors.trn_number.error}
                errMsg={errors.trn_number.message}
                maxLength={15}
                onChange={(e) => { handleInputChange({ e }) }}
                placeholder='TRN Number'
                disabled={isDisabled}
                label={'TRN Number'}
                haveInfo={true}
                info={'TRN should be 15 digits'}
                isRequired={true}
            />
            <MediaUpload
                name={'trade_license'}
                label='Trade License Certificate'
                placeholder='Trade License Certificate'
                isRequired={true}
                haveInfo={true}
                disabled={isDisabled}
                isInvalid={errors.trade_license.error}
                errMsg={errors.trade_license.message}
                value={formData.trade_license}
                handleFileUpload={handleFileUpload}
                info={'Only JPEG and PDF formats are allowed'}
            />

            <CustomCalendar
                name={'trade_license_expiry'}
                label='Trade License Expiry Date'
                disabled={isDisabled}
                value={formData.trade_license_expiry}
                isInvalid={errors.trade_license_expiry.error}
                errMsg={errors.trade_license_expiry.message}
                onChange={(date) => {
                    setFormData((prevData) => ({ ...prevData, trade_license_expiry: date }));
                    setErrors((prevErrors) => ({ ...prevErrors, trade_license_expiry: { error: false, message: '' } }));
                }}
                isRequired={true}
            />

            <div className="flex gap-3 items-center mt-3">
                <CustomButton variant='transparent' label='Update' onClick={() => { handleSubmit() }} />
            </div>
        </>
    )
}

export default CompanyUserForm