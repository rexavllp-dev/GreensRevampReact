
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
import { uploadProductImage } from '@/services/features/productSlice';

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


    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }



    const handleSubmit = () => {

        setLoading(true);
        dispatch(uploadProductImage({ data })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
            } else {
                toast.error(res.payload?.message);
            }
            setLoading(false);
        }).catch((err) => {
            toast.error(err.message);
            setLoading(false)
        })
    }

    const handleFileUpload = async (event) => {
        let files = null;
        let isBaseImage;
        if (event.target.name === 'prd_additional_img') {
            isBaseImage = false;
        } else {
            isBaseImage = true;
        }
        files = event.target.files;
        // const file = files[0];
        const productFormData = new FormData();
        productFormData.append('files', files);
        productFormData.append('isBaseImage', isBaseImage);
        dispatch(uploadProductImage({ data: productFormData, id: 10 })).then((response) => {
            if (response.payload?.success) {
                toast.success(response.payload?.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteImage = (imgname) => {

    }


    return (
        <div className='imagestab'>

            <div className="form">

                <div className="stack">

                    <CustomTypography content='Base Image' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'prd_base_img'}
                        handleFileUpload={handleFileUpload}
                        // images={event?.images}
                        handleDeleteImage={handleDeleteImage}
                        haveUploadSize={true}
                        required={true}
                    />

                </div>

                <div className="stack">
                    <CustomTypography content='Additional Images' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'prd_additional_img'}
                        handleFileUpload={handleFileUpload}
                        // images={event?.images}
                        handleDeleteImage={handleDeleteImage}
                        haveUploadSize={true}
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