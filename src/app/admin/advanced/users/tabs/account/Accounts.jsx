
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import { Tab, Tabs } from '@nextui-org/react'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import { getSingleUser, updateUserByAdmin } from '@/services/features/userSlice'
import { useSearchParams } from 'next/navigation'
import './Accounts.scss'
import { useDispatch, useSelector } from 'react-redux';
import { isEmailValid } from '@/utils/helpers/IsEmailValid';
import { toast } from 'react-toastify';

const Accounts = ({ userId }) => {


    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = React.useState("");
    const roles = [
        { label: 'Customer', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Delivery', value: 3 },
    ]
    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({

        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        confirm_password: '',
        status: false,
        notes: '',
        address: [
            {
                address_line_1: 'Signature of Sugar DIP1 Tamcom - مجمع دبي للإستثمار - دبي - United Arab Emirates Dubai, United Arab Emirates',
                flat: 'Schon business park retail 63',
                area: 'Dubai inveatment park',
                mobile: 2384923983,
                city: 'Dubai',
                state: 'Dubai',
                country: 'UAE',
                landmark: 'Dubai Mall'
            },
            {
                address_line_1: 'Downtown Dubai - Dubai - United Arab Emirates',
                flat: 'Schon business park retail 63',
                area: 'Dubai inveatment park',
                mobile: 9884923983,
                city: 'Dubai',
                state: 'Dubai',
                country: 'UAE',
                landmark: 'Dubai Mall'
            },
        ]
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
        if (userId) {
            dispatch(getSingleUser(userId))
        }
    }, [userId])

    useEffect(() => {
        if (singleUser) {
            setFormData((prev) => ({
                ...prev,
                first_name: singleUser?.result?.usr_firstname,
                last_name: singleUser?.result?.usr_lastname,
                mobile: singleUser?.result?.usr_mobile_number,
                usr_mobile_country_code: singleUser?.result?.usr_mobile_country_code,
                email: singleUser?.result?.usr_email,
                status: singleUser?.result?.status,
                notes: singleUser?.result?.notes,
                status: singleUser?.result?.is_status
            }))
        }
    }, [singleUser])

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

        if (e.target.name === 'first_name' || e.target.name === 'last_name') {
            const firstLetter = e.target.value.charAt(0);
            if (e.target.name === 'first_name' && !formData.first_name?.trim()) {
                //First letter should not be a number
                const re = /^[A-Za-z\s'.-]+$/;
                // if value is not blank, then test the regex
                if (e.target?.value === '' || re.test(firstLetter)) {
                    setFormData((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))
                }
            } else if (e.target.name === 'last_name' && !formData.last_name?.trim()) {
                //First letter should not be a number
                const re = /^[A-Za-z\s'.-]+$/;
                // if value is not blank, then test the regex
                if (e.target?.value === '' || re.test(firstLetter)) {
                    setFormData((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))
                }
            } else {
                const re = /^[A-Za-z0-9\s'.-]+$/;
                // if value is not blank, then test the regex
                if (e.target?.value === '' || re.test(e.target?.value)) {
                    setFormData((prev) => ({
                        ...prev, [e.target.name]: e.target.value
                    }))
                }
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


    const validateForm = () => {
        let isValid = true;

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

        return isValid;
    };



    const handleSubmit = () => {
        if (validateForm()) {
            let data = {
                "usr_firstname": formData.first_name,
                "usr_lastname": formData.last_name,
                "usr_mobile_number": formData.mobile,
                "usr_mobile_country_code": formData.usr_mobile_country_code,
                "usr_email": formData.email,
                "notes": formData.notes,
                "is_status": formData.status
            }
            setLoading(true);
            dispatch(updateUserByAdmin({ data, id: userId })).then((res) => {
                if (res.payload?.status === 200) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false)
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false)
            })
        }
    }

    return (
        <div className='accountdetails'>

            <div className="form">

                <div className="stack">


                    <CustomInput name='first_name' type='text'
                        maxLength={100}
                        placeholder='First Name' label={'First Name'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.first_name}
                        isInvalid={errors.first_name.error}
                        errMsg={errors.first_name.message}
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
                    />
                    <CustomInput name={'email'} type='email'
                        placeholder="Email Address"
                        isInvalid={errors.email.error}
                        errMsg={errors.email.message}
                        label={'Email Address'} isRequired={true}
                        value={formData.email}
                        onChange={(e) => { handleInputChange({ e }) }}
                    />


                    <CustomPhoneInput
                        isRequired={true}
                        name={'mobile'}
                        value={formData.mobile}
                        placeholder='Mobile Number'
                        label='Mobile Number'
                        onChange={(value, country) => {
                            handlePhoneChange('mobile', value, country)
                        }}
                        isInvalid={errors.mobile.error}
                        errMsg={errors.mobile.message}
                    />
                    <CustomSelect label={'Roles'} isRequired={true} data={roles} />
                    <CustomToggleButton label='Status' isRequired={true} value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />
                    <CustomTextarea label={'Notes'} placeholder={'Remarks'} name={'notes'} value={formData.notes} onChange={(e) => { handleInputChange({ e }) }} />
                </div>

                <div className="stack">
                    <div className="shippingdetails">
                        <div className="shippingdetails-header">
                            <CustomTypography content={'Address Details'} color={'BLACK'} size='LARGE' weight='MEDIUM' />
                        </div>

                        <Tabs
                            aria-label="Options"
                            selectedKey={selectedTab}
                            onSelectionChange={setSelectedTab}
                        >

                            {
                                formData.address?.map((address, i) => (
                                    <Tab key={i} title={`Address ${i + 1}`}>
                                        <div className="address">
                                            <CustomTypography content={'Address line'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                            <CustomTypography content={address.address_line_1}
                                                color={'BLACK'}
                                                size='REGULAR'
                                                weight='BOLD'
                                            />
                                        </div>
                                        <div className="address">
                                            <CustomTypography content={'Flat/ Villa Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                            <CustomTypography content={address.flat}
                                                color={'BLACK'}
                                                size='REGULAR'
                                                weight='BOLD'
                                            />
                                        </div>
                                        <div className="address">
                                            <CustomTypography content={'Area'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                            <CustomTypography content={address.area}
                                                color={'BLACK'}
                                                size='REGULAR'
                                                weight='BOLD'
                                            />
                                        </div>
                                        <div className="address">
                                            <CustomTypography content={'Mobile Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                            <CustomTypography content={address.mobile}
                                                color={'BLACK'}
                                                size='REGULAR'
                                                weight='BOLD'
                                            />
                                        </div>
                                        <div className="address">
                                            <CustomTypography content={'Nearest Landmark'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                            <CustomTypography content={address.landmark}
                                                color={'BLACK'}
                                                size='REGULAR'
                                                weight='BOLD'
                                            />
                                        </div>
                                    </Tab>
                                ))
                            }
                        </Tabs>

                    </div>
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>

        </div>
    )
}

export default Accounts