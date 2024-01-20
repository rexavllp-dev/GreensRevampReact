
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

const ImagesTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();

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



    const [loading, setLoading] = React.useState(false);


    const handleSubmit = () => {

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
        const file = files[0];
        const productFormData = new FormData();
        productFormData.append('files', file);
        productFormData.append('isBaseImage', isBaseImage);
        dispatch(uploadProductImage({ data: productFormData, id: id })).then((response) => {
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
                        isProductImg={true}
                        name={'prd_base_img'}
                        handleFileUpload={handleFileUpload}
                        images={[data?.data?.product?.product_img.find((img) => img.is_baseimage === true)]}
                        handleDeleteImage={handleDeleteImage}
                        haveUploadSize={true}
                        required={true}
                    />

                </div>

                <div className="stack">
                    <CustomTypography content='Additional Images' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        isProductImg={true}
                        name={'prd_additional_img'}
                        handleFileUpload={handleFileUpload}
                        images={data?.data?.product?.product_img?.filter(img => img.is_baseimage === false)}
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