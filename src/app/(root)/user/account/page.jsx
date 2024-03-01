'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from '@/components/maps/GoogleMap';
import { FaPlus } from 'react-icons/fa';
import CustomAddressRadio from '@/app/checkout/components/CustomAddressRadio';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import "./UserAccount.scss";
import CustomButton from '@/library/buttons/CustomButton';
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import MediaUpload from '@/library/mediaupload/MediaUpload';
import CompanyForm from './forms/CompanyForm';
import { useRouter } from 'next/navigation';

const UserAccount = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [isDisabled, setIsDisabled] = React.useState(true);

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        confirm_password: '',
    })


    const [errors, setErrors] = React.useState({
        first_name: {
            error: false,
            message: ''
        },
        last_name: {
            error: false,
            message: ''
        },
        mobile: {
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
        }
    })

    const { singleUser } = useSelector(state => state.users)

    React.useEffect(() => {
        if (singleUser) {
            setFormData((prev) => ({
                ...prev,
                first_name: singleUser?.result?.usr_firstname,
                last_name: singleUser?.result?.usr_lastname,
                mobile: singleUser?.result?.usr_mobile_number,
                usr_mobile_country_code: singleUser?.result?.usr_mobile_country_code,
                email: singleUser?.result?.usr_email,
            }))
        }
    }, [singleUser])

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
        if (isDisabled) return;

        if (e.target.name === 'first_name' || e.target.name === 'last_name') {
            const re = /^[A-Za-z\s'.-]+$/;
            // if value is not blank, then test the regex
            if (e.target?.value === '' || re.test(e.target?.value)) {
                setFormData((prev) => ({
                    ...prev, [e.target.name]: e.target.value
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



    return (
        <div className="user_account">
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Account Information'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
            </div>

            <div className="w-100 mt-3">
                <div className='account_form'>
                    <div className="stack">
                        <CustomInput name='first_name' type='text'
                            maxLength={100}
                            placeholder='First Name' label={'First Name'}
                            isRequired={true}
                            onChange={(e) => { handleInputChange({ e }) }}
                            value={formData.first_name}
                            isInvalid={errors.first_name.error}
                            errMsg={errors.first_name.message}
                            disabled={isDisabled}
                        />
                        <CustomInput
                            name='last_name'
                            type='text'
                            maxLength={100}
                            placeholder='Last Name'
                            label={'Last Name'}
                            isRequired={true}
                            onChange={(e) => { handleInputChange({ e }) }}
                            value={formData.last_name}
                            isInvalid={errors.last_name.error}
                            errMsg={errors.last_name.message}
                            disabled={isDisabled}
                        />
                        <CustomInput name={'email'} type='email'
                            placeholder="Email Address"
                            isInvalid={errors.email.error}
                            errMsg={errors.email.message}
                            label={'Email Address'} isRequired={true}
                            value={formData.email}
                            onChange={(e) => { handleInputChange({ e }) }}
                            disabled={isDisabled}
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
                            isInvalid={errors.mobile.error}
                            errMsg={errors.mobile.message}
                            disabled={isDisabled}
                        />

                        <div className="flex gap-3 items-center mt-3">
                            <CustomButton variant='transparent' label='Save' onClick={() => { }} />

                        </div>


                        <div className='pt-5'>
                            <div className="account_card mb-5">
                                <CustomTypography content={"Change password"} color={'BLACK'} size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                                <div className='place-self-end'>
                                    <CustomButton variant='primary' label='Continue' onClick={() => { router.push('/settings/change-password') }} />
                                </div>
                            </div>
                            {/* <div className="account_card">
                                <CustomTypography content={"Deactivate your account"} color={'BLACK'} size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                                <div className='place-self-end'>
                                    <CustomButton variant='primary' label='Continue' />
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <CompanyForm />
                </div>

            </div>

        </div >
    )
}

export default UserAccount