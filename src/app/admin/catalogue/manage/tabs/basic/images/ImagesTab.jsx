
'use client';
import React, { useEffect } from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './ImagesTab.scss'
import ImageUpload from '@/components/imageupload/ImageUpload';
import { deleteProductImage, uploadProductImage } from '@/services/features/productSlice';

const ImagesTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();



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

    const handleDeleteImage = (img) => {
        dispatch(deleteProductImage({ id: img.id })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
            }else{
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err)
        })
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
                {/* <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} /> */}
            </div>

        </div>
    )
}

export default ImagesTab