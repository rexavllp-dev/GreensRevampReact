'use client';

import React, { useEffect } from 'react'
import { CustomCalendar } from '@/library/calendar/CustomCalendar'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import MediaUpload from '@/library/mediaupload/MediaUpload'
import { toast } from 'react-toastify';

const CompanyForm = () => {

    const [formData, setFormData] = React.useState({
        company_name: '',
        first_name: '',
        last_name: '',
        designation: '',
        email: '',
        password: '',
        confirm_password: '',
        company_landline: '',
        company_landline_country_code: '',
        mobile: '',
        usr_mobile_country_code: '',
        trn_number: '',
        trade_license_expiry: '',
        vat_certificate: {},
        trade_license: {},
        agree: false,
        subscribe: false,
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
        password: {
            error: false,
            message: ''
        },
        confirm_password: {
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


    const validateForm = () => {
        let isValid = true;

        // Validate company name
        if (!formData.company_name?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                company_name: { error: true, message: 'Company name is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                company_name: { error: false, message: '' }
            }));
        }

        // Validate first name
        if (!formData.first_name?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                first_name: { error: true, message: 'First name is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                first_name: { error: false, message: '' }
            }));
        }

        // Validate last name
        if (!formData.last_name?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                last_name: { error: true, message: 'Last name is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                last_name: { error: false, message: '' }
            }));
        }

        // Validate designation
        if (!formData.designation?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                designation: { error: true, message: 'Designation is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                designation: { error: false, message: '' }
            }));
        }

        // Validate mobile
        if (!formData.mobile?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                mobile: { error: true, message: 'Mobile number is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                mobile: { error: false, message: '' }
            }));
        }

        // Validate email
        if (!isEmailValid(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: { error: true, message: 'Enter a valid email address' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: { error: false, message: '' }
            }));
        }

        // Validate password
        if (!formData.password?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password is required' }
            }));
            isValid = false;
        }
        else if (!formData.password?.match(UPPERCASE_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must contain at least one uppercase letter' }
            }));
            isValid = false;
        }
        else if (!formData.password?.match(NUMBER_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must contain at least one number' }
            }));
            isValid = false;
        }
        else if (!formData.password?.match(SPECIAL_CHARS_REGEX)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must contain at least one special character' }
            }));
            isValid = false;
        }
        else if (formData.password?.length < 8) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: true, message: 'Password must be at least 8 characters long' }
            }));
            isValid = false;
        }
        else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: { error: false, message: '' }
            }));
        }

        // validate trn number
        if (!formData.trn_number?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                trn_number: { error: true, message: 'TRN number is required' }
            }));
            isValid = false;
        }
        else if (formData.trn_number?.length < 15) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                trn_number: { error: true, message: 'TRN should be 15 digits' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                trn_number: { error: false, message: '' }
            }));
        }

        // Validate confirm password
        if (!formData.confirm_password?.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: { error: true, message: 'Confirm password is required' }
            }));
            isValid = false;
        }
        else if ((formData.password !== formData.confirm_password) || (!formData.confirm_password?.length)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: { error: true, message: 'Passwords do not match' }
            }));
            isValid = false;
        }
        else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: { error: false, message: '' }
            }));
        }

        // Validate vat certificate uploaded or not uploaded
        if (!formData.vat_certificate?.name) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                vat_certificate: { error: true, message: 'VAT certificate is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                vat_certificate: { error: false, message: '' }
            }));
        }

        // Validate Trade license is uploaded or not uploaded
        if (!formData.trade_license?.name) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                trade_license: { error: true, message: 'Trade license is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                trade_license: { error: false, message: '' }
            }));
        }

        // Validate Trade license expiry
        if (!formData.trade_license_expiry) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                trade_license_expiry: { error: true, message: 'Trade license expiry date is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                trade_license_expiry: { error: false, message: '' }
            }));
        }

        // Validate agreed terms and conditions
        if (!formData.agree) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                agree: { error: true, message: 'You have to agree terms and conditions to continue' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                agree: { error: false, message: '' }
            }));
        }

        return isValid;
    };

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
        } else if (e.target.name === 'first_name' || e.target.name === 'last_name') {
          
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

    }




    return (
        <div className="stack">
            <CustomInput name={'company_name'} value={formData.company_name} onChange={(e) => { handleInputChange({ e }) }}
                type='text' placeholder='Company Name' label={'Company Name'} isRequired={true}
                isInvalid={errors.company_name?.error} errMsg={errors.company_name?.message}
            />

            <CustomInput name={'designation'} type='text' value={formData.designation} onChange={(e) => { handleInputChange({ e }) }}
                placeholder='Designation' label={'Designation'} isRequired={true}
                isInvalid={errors.designation?.error} errMsg={errors.designation?.message}
            />

            <CustomPhoneInput name={'company_landline'} value={formData.company_landline}
                label='Landline' isRequired={false} placeholder={'Landline'}
                // isInvalid={errors.landline.error}
                // errMsg={errors.landline.message}
                onChange={(value, country) => {
                    handlePhoneChange('company_landline', value, country)
                }}
            />

            {/* <CustomToggleButton label='VAT Registered' isRequired={true} /> */}
            <MediaUpload name={'vat_certificate'} label='VAT Certficate' placeholder='VAT Certificate' isRequired={true}
                haveInfo={true}
                isInvalid={errors.vat_certificate.error}
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
                isInvalid={errors.trade_license.error}
                errMsg={errors.trade_license.message}
                value={formData.trade_license}
                handleFileUpload={handleFileUpload}
                info={'Only JPEG and PDF formats are allowed'}
            />

            <CustomCalendar
                name={'trade_license_expiry'}
                label='Trade License Expiry Date'
                // maxDate={maxDate}
                value={formData.trade_license_expiry}
                isInvalid={errors.trade_license_expiry.error}
                errMsg={errors.trade_license_expiry.message}
                onChange={(date) => {
                    setFormData((prevData) => ({ ...prevData, trade_license_expiry: date }));
                    setErrors((prevErrors) => ({ ...prevErrors, trade_license_expiry: { error: false, message: '' } }));
                }}
                isRequired={true}
            />
        </div>
    )
}

export default CompanyForm