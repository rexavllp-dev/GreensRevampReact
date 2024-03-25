import ImageUpload from '@/components/imageupload/ImageUpload';
import CustomButton from '@/library/buttons/CustomButton';
import CustomTypography from '@/library/typography/CustomTypography';
import { uploadBrandImage } from '@/services/features/brandSlice';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const ImagesTab = ({ id, data }) => {

    const router = useRouter()

    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()


    const handleFileUpload = async (event) => {
        let files = null;
        files = event.target.files;
        const file = files[0];
        let brandFormData = new FormData();
        if (event.target.name === 'brd_logo') {
            brandFormData.append('brd_logo', file);
        } else if (event.target.name === 'brd_banner') {
            brandFormData.append('brd_banner', file);
        }
        dispatch(uploadBrandImage({ data: brandFormData, id: id })).then((response) => {
            if (response.payload?.success) {
                toast.success(response.payload?.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteImage = (img) => {


    }

    const handleSubmit = (type) => {

    }



    return (
        <div className='brandstab'>
            <div className='flex gap-5'>
                <div className="stack mb-3">

                    <CustomTypography content='Logo' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'brd_logo'}
                        isProductImg={true}
                        handleFileUpload={handleFileUpload}
                        images={[{ url: data?.result?.brd_logo }]}
                        handleDeleteImage={handleDeleteImage}
                    />

                </div>

                <div className="stack">
                    <CustomTypography content='Banner Image' color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <ImageUpload
                        name={'brd_banner'}
                        isProductImg={true}
                        handleFileUpload={handleFileUpload}
                        images={[{ url: data?.result?.brd_banner }]}
                        handleDeleteImage={handleDeleteImage}
                    />
                </div>
            </div>
            <div className="flex justify-end mt-3">
                <CustomButton label='Save Changes' onClick={() => handleSubmit()} />
            </div>
        </div>
    )
}


export default ImagesTab