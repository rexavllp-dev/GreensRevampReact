import ImageUpload from '@/components/imageupload/ImageUpload';
import CustomButton from '@/library/buttons/CustomButton';
import CustomTypography from '@/library/typography/CustomTypography';
import { uploadCategoryImage, deleteCategoryImage } from '@/services/features/categorySlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


const ImageTab = ({id, data}) => {



    const router = useRouter()

    const [loading, setLoading]     = React.useState(false)
    const [catlogo, setCatLogo]     = React.useState(null)
    const [catbanner, setCatBanner] = React.useState(null)

    const dispatch = useDispatch()

    useEffect(() => {

      setCatLogo(null);
      setCatBanner(null);
      
      if(data.cat_logo){
        setCatLogo(data.cat_logo);
      }
      if(data.cat_banner){
        setCatBanner(data.cat_banner);
      }

    }, []);


    const handleFileUpload = async (event) => {
        let files = null;
        files = event.target.files;
        const file = files[0];
        let categoryFormData = new FormData();
        if (event.target.name === 'cat_logo') {
            categoryFormData.append('cat_logo', file);
        } else if (event.target.name === 'cat_banner') {
            categoryFormData.append('cat_banner', file);
        }
        dispatch(uploadCategoryImage({ data: categoryFormData, id: id })).then((response) => {
            if (response.payload?.success) {

                setCatLogo(response.payload?.result?.cat_logo);
                setCatBanner(response.payload?.result?.cat_banner);
                toast.success(response.payload?.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteImage = (type, img) => {
        
        dispatch(deleteCategoryImage({ id: id, type:type })).then((response) => {
            if (response.payload?.success) {

                setCatLogo(response.payload?.result?.cat_logo);
                setCatBanner(response.payload?.result?.cat_banner);
                toast.success(response.payload?.message);
            }
        }).catch((err) => {
            console.log(err);
        })

    }

    const handleSubmit = (type) => {

    }



    return (
        <div className='brandstab'>
            <div className="stack mb-3">

                <CustomTypography content='Logo' color="BLACK" size="MEDIUM" weight="REGULAR" />
                <ImageUpload
                    isProductImg={true}
                    name={'cat_logo'}
                    handleFileUpload={handleFileUpload}
                    images={[{url:catlogo}]}
                    handleDeleteImage={(img) => handleDeleteImage('cat_logo', img)}
                    haveUploadSize={true}
                    uploadSize={{
                        "width": '1920',
                        "height": '1080'
                    }}
                />

            </div>

            <div className="stack">
                <CustomTypography content='Banner Image' color="BLACK" size="MEDIUM" weight="REGULAR" />
                <ImageUpload
                    isProductImg={true}
                    name={'cat_banner'}
                    handleFileUpload={handleFileUpload}
                    images={[{url:catbanner}]}
                    handleDeleteImage={(img) => handleDeleteImage('cat_banner', img)}
                    haveUploadSize={true}
                    uploadSize={{
                        "width": '1920',
                        "height": '1080'
                    }}
                />
            </div>
        </div>
    )
}


export default ImageTab