
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import { NUMBER_REGEX, SPECIAL_CHARS_REGEX, UPPERCASE_REGEX } from '@/utils/helpers/validationRules';
import { createUserByAdmin } from '@/services/features/userSlice';
import { isEmailValid } from '@/utils/helpers/IsEmailValid';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './ImagesTab.scss'
import MediaUpload from '@/library/mediaupload/MediaUpload';
import ImageUpload from '@/components/imageupload/ImageUpload';
import { Divider } from '@nextui-org/react';

const ImagesTab = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const roles = [
        { label: 'Customer', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Delivery', value: 3 },
    ]

    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        password: '',
        confirm_password: '',
        status: true,
        notes: ''
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

    const [loading, setLoading] = React.useState(false);


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
                "notes": formData.notes,
                "is_status": formData.status
            }
            setLoading(true);
            dispatch(createUserByAdmin({ data })).then((res) => {
                if (res.payload?.status === 200) {
                    toast.success(res.payload?.message);
                    router.back()
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false)
            })

        }
    }

    const handleFileUpload = async (event) => {
        let files = null;
        dispatch(updateEvent({
            event_id: id,
            data: formData
        })).then((response) => {
            files = event.target.files;

            const image = new Image();
            image.src = URL.createObjectURL(files[0]);

            let imgWidth, imgHeight;
            image.onload = function () {
                imgWidth = this.width;
                imgHeight = this.height;

                if (imgWidth == 1920 && imgHeight == 1080) {
                    const imageFormData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        // setEventImages((prevImages) => [...prevImages, files[i]])
                        imageFormData.append('event_image', files[i]);
                    }
                    // imageFormData.append('file', file);
                    dispatch(uploadEventImg({ formData: imageFormData, event_id: id }))
                }
                else {
                    toast.error("Please upload image of 1920x1080 dimensions")
                }
            };

        }).catch((err) => {
            console.log(err)
            toast.error("Please fill the fields before upload")
        })

    }

    const handleDeleteImage = (imgname) => {
        dispatch(deleteEventImage({ data: { image_name: imgname }, event_id: id }))
    }


    return (
        <div className='imagestab'>

            <div className="form">

                <div className="stack">

                    <CustomTypography content='Base Image' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'event_img_path'}
                        handleFileUpload={handleFileUpload}
                        // images={event?.images}
                        handleDeleteImage={handleDeleteImage}
                        haveUploadSize={true}
                        uploadSize={{
                            "width": '1920',
                            "height": '1080'
                        }}
                        required={true}
                    />

                </div>

                <div className="stack">
                    <CustomTypography content='Additional Images' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'event_img_path'}
                        handleFileUpload={handleFileUpload}
                        // images={event?.images}
                        handleDeleteImage={handleDeleteImage}
                        haveUploadSize={true}
                        uploadSize={{
                            "width": '1920',
                            "height": '1080'
                        }}
                        required={true}
                    />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>

        </div>
    )
}

export default ImagesTab