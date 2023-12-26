"use client"
import React, { useEffect } from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import AuthButton from '@/library/buttons/authbuttons/AuthButton'
import CustomCheckbox from '@/library/checkbox/CustomCheckbox'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTypography from '@/library/typography/CustomTypography'
import Link from 'next/link'
import "./IndividualRegister.scss"
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import { useRouter } from 'next/navigation'
import useWindowSize from '@/hooks/useWindowSize'
import { isEmailValid } from '@/utils/helpers/IsEmailValid'
import { NUMBER_REGEX, SPECIAL_CHARS_REGEX, UPPERCASE_REGEX } from '@/utils/helpers/validationRules'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '@/services/features/authSlice'

const IndividualRegister = () => {

    const router = useRouter();

    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const dispatch = useDispatch();
    const { } = useSelector(state => state.auth)

    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        mobile: '',
        usr_mobile_country_code: '',
        email: '',
        password: '',
        confirm_password: '',
        agree: false,
        subscribe: false,
    })

    useEffect(() => {
        console.log(formData);
    }, [formData])

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
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirm_password: { error: false, message: '' }
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


    const handleSubmit = () => {
        if (validateForm()) {
            let data = {
                "usr_firstname": formData.first_name,
                "usr_lastname": formData.last_name,
                "usr_mobile_number": formData.mobile,
                "usr_mobile_country_code": formData.usr_mobile_country_code,
                "usr_password": formData.password,
                "usr_email": formData.email,
                "usr_tos_accepted": formData.agree,
                "usr_newsletter_accepted": formData.subscribe,
                // "usr_company": 10
            }
            setLoading(true);
            dispatch(userRegister(data)).then((res) => {
                if (res.payload?.status === 201) {
                    let token = res.payload?.result?.userToken?.token;
                    toast.success(res.payload?.message);
                    router.push(`/auth/verifyemail/?orgin=individual&token=${token}`, { scroll: true });
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false)
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false)
            })

            // router.push('/auth/verifyemail/?orgin=individual', { scroll: true });
        }
    }

    return (
        <div className='individual-register'>
            <div className='thirdparty'>
                <AuthButton label={'Sign in with Google'} icon={'GoogleIcon'} backgroundColor={'#8571FF'} />
                <AuthButton label={'Sign in with Facebook'} icon={'FacebookIcon'} backgroundColor={'#7694FF'} />
            </div>
            <div className='or'>
                <CustomTypography content="OR" color="GRAY-DARK" size="SMALL" weight="MEDIUM" />
            </div>

            <div className='form'>
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
                <CustomInput name={'email'} type='email'
                    placeholder="Email Address"
                    isInvalid={errors.email.error}
                    errMsg={errors.email.message}
                    label={'Email Address'} isRequired={true}
                    value={formData.email}
                    onChange={(e) => { handleInputChange({ e }) }}
                />
                <CustomInput
                    isInvalid={errors.password.error}
                    errMsg={errors.password.message}
                    type='password'
                    name={'password'}
                    value={formData.password}
                    onChange={(e) => { handleInputChange({ e }) }}
                    placeholder="Password"
                    label={'Password'}
                    isRequired={true}
                    haveProgress={true}
                />
                <CustomInput
                    isInvalid={errors.confirm_password.error}
                    errMsg={errors.confirm_password.message}
                    type='password'
                    value={formData.confirm_password}
                    name={'confirm_password'}
                    onChange={(e) => { handleInputChange({ e }) }}
                    placeholder="Confirm Password"
                    label={'Confirm Password'}
                    isRequired={true}
                    haveProgress={false}
                />

                <div className='checkbox-group'>
                    <CustomCheckbox
                        isRequired={true}
                        label={<p>I agree to the <Link style={{ borderBottom: '1px solid #4d4d4d', display: 'inline' }} href="/auth/register"> Terms of Use</Link>  and <Link style={{ borderBottom: '1px solid #4d4d4d' }} href="/auth/register">Privacy Policy</Link></p>}
                        name={"agree"}
                        isInvalid={errors.agree?.error}
                        errMsg={errors.agree?.message}
                        value={formData.agree} onChange={(value) => {
                            setFormData({ ...formData, agree: value });
                            setErrors({ ...errors, agree: { error: false, message: '' } });
                        }}
                    />
                    <CustomCheckbox
                        isRequired={false}
                        label={<p>Subscribe to our Newsletter</p>}
                        name='checkbox'
                        value={formData.subscribe} onChange={(value) => { setFormData({ ...formData, subscribe: value }) }}
                    />
                </div>

                {/* <Link href={{
                    pathname: '/auth/verifyemail', query: {
                        orgin: 'individual'
                    }
                }}> */}
                <CustomButton fullWidth label='Create an account' onClick={handleSubmit} loading={loading} variant='primary' height={isMobileView ? '42px' : '50px'}
                // onClick={() => { router.push('/auth/verifyemail', { scroll: true }) }}
                />
                {/* </Link> */}
            </div>
            {/* 
            <div className='footer'>
                <CustomTypography content="Already have an account?" color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                <CustomButton label='Login' variant='transparent' height={isMobileView ? '42px' : '50px'} />
            </div> */}
        </div>
    )
}

export default IndividualRegister