'use client';

import React, { useEffect } from 'react'
import { CustomCalendar } from '@/library/calendar/CustomCalendar'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import MediaUpload from '@/library/mediaupload/MediaUpload'
import { toast } from 'react-toastify';
import CustomButton from '@/library/buttons/CustomButton';
import CustomTypography from '@/library/typography/CustomTypography';
import { updateAccountToCompany } from '@/services/features/userSlice';
import { useDispatch } from 'react-redux';

const CompanyForm = ({ isDisabled }) => {

    const dispatch = useDispatch(); 

    const [formData, setFormData] = React.useState({
        company_name: '',
        designation: '',
        company_landline: '',
        company_landline_country_code: '',
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
        designation: {
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
        companyFormData.append('company_name', formData.company_name);
        companyFormData.append('usr_designation', formData.designation);
        companyFormData.append('company_vat_certificate', formData.vat_certificate);
        companyFormData.append('company_trn_number', formData.trn_number);
        companyFormData.append('company_trade_license', formData.trade_license);
        // companyFormData.append('company_trade_license_expiry', formData.trade_license_expiry?.toLocaleDateString('en-GB'));
        companyFormData.append('company_trade_license_expiry', new Date(formData.trade_license_expiry));

        if (formData.company_landline?.trim()) {
            companyFormData.append('company_landline', formData.company_landline);
            companyFormData.append('company_landline_country_code', formData.company_landline_country_code);
        }
        dispatch(updateAccountToCompany({ data: companyFormData })).then((res) => {
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
        <div className="stack">
            <div className="mb-3">
                <CustomTypography content={"Update to Business Account"} color={'BLACK'} size='MEDIUM-LARGE' weight='SEMI-BOLD' />
            </div>

            <CustomInput name={'company_name'} value={formData.company_name} onChange={(e) => { handleInputChange({ e }) }}
                type='text' placeholder='Company Name' label={'Company Name'} isRequired={true}
                isInvalid={errors.company_name?.error} errMsg={errors.company_name?.message}
                disabled={isDisabled}
            />

            <CustomInput name={'designation'} type='text' value={formData.designation} onChange={(e) => { handleInputChange({ e }) }}
                placeholder='Designation' label={'Designation'} isRequired={true}
                isInvalid={errors.designation?.error} errMsg={errors.designation?.message}
                disabled={isDisabled}
            />

            <CustomPhoneInput name={'company_landline'} value={formData.company_landline}
                label='Landline' isRequired={false} placeholder={'Landline'}
                // isInvalid={errors.landline.error}
                // errMsg={errors.landline.message}
                onChange={(value, country) => {
                    handlePhoneChange('company_landline', value, country)
                }}
                disabled={isDisabled}
            />

            {/* <CustomToggleButton label='VAT Registered' isRequired={true} /> */}
            <MediaUpload name={'vat_certificate'} label='VAT Certficate' placeholder='VAT Certificate' isRequired={true}
                haveInfo={true}
                isInvalid={errors.vat_certificate.error}
                errMsg={errors.vat_certificate.message}
                info={'Only JPEG and PDF formats are allowed'}
                value={formData.vat_certificate}
                handleFileUpload={handleFileUpload}
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
            />

            <div className="flex gap-3 items-center mt-3">
                <CustomButton variant='transparent' label='Update' onClick={() => { handleSubmit() }} />

            </div>
        </div>
    )
}

export default CompanyForm