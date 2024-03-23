'use client';
import React, { useEffect } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import { getSingleProduct } from '@/services/features/productSlice';
import { IoIosStar } from 'react-icons/io';
import { IoStarOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import './EditReview.scss';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import ImageUpload from '@/components/imageupload/ImageUpload';
import CustomInput from '@/library/input/custominput/CustomInput';
import ImageGallery from '@/components/imagegallery/ImageGallery';
import CustomButton from '@/library/buttons/CustomButton';
import ReactStars from "react-rating-stars-component";
import { createReview } from '@/services/features/reviewSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const EditReview = ({ params }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { singleProduct } = useSelector((state) => state.products)

    const [formData, setFormData] = React.useState({
        rating: 1,
        heading_review: '',
        review: '',
    })

    const [reviewImages, setReviewImages] = React.useState([]);

    useEffect(() => {
        dispatch(getSingleProduct({ id: params.id }))
    }, [params?.id]);

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleFileUpload = async (event) => {
        let files = event.target.files;
        const file = files[0];

        // Create a URL for the file
        const fileUrl = URL.createObjectURL(file);

        // Assuming you have a state variable named reviewImages to store file objects
        setReviewImages([...reviewImages, { file: file, url: fileUrl }]);
    }
    const handleDeleteImage = (img) => {
        setReviewImages(reviewImages.filter((item) => item.url !== img.url));

    }

    const submitReview = () => {
        const data = {
            product_id: params.id,
            rating: formData.rating,
            heading_review: formData.heading_review,
            review: formData.review,
        }
        const reviewFormData = new FormData();

        for (let i = 0; i < reviewImages.length; i++) {
            reviewFormData.append('files', reviewImages[i].file);
        }

        reviewFormData.append('data', JSON.stringify(data));

        dispatch(updateReview({ data: reviewFormData })).then((res)=>{
            if(res.payload.success){
                toast.success(res.payload.message);
                router.back()
            }else {
                toast.error(res.payload.message)
            }
        }).catch((err)=>{
            console.log(err);
        })
    }



    return (
        <div className="review_product-wrapper">
            <div className="header">
                <CustomTypography content={"Update Review"} color="BLACK" size="MEDIUM-LARGE" weight="SEMI-BOLD" />
            </div>
            <div className="review_product">
                <div className="right">

                    <div className="prd_details">
                        <div className="prd_item">
                            <div className='rating'>
                                <CustomTypography content='Your rating' size='REGULAR' weight='REGULAR' color='GRAY-DARK' />
                                <ReactStars
                                    classNames={'mb-1'}
                                    count={5}
                                    onChange={(e) => {
                                        setFormData((prev) => ({
                                            ...prev, rating: e
                                        }))
                                    }}
                                    value={formData?.rating}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="review-form">
                        <CustomInput name='heading_review' type='text'
                            maxLength={100}
                            placeholder='Heading' label={'Review Heading'}
                            onChange={(e) => { handleInputChange({ e }) }}
                            value={formData.heading_review}
                        />
                        <CustomTextarea label={'Review Summary'}
                            placeholder={'Review Summary'}
                            name={'review'} value={formData.review}
                            onChange={(e) => { handleInputChange({ e }) }}
                        />
                        <ImageUpload
                            isProductImg={true}
                            name={'prd_additional_img'}
                            handleFileUpload={handleFileUpload}
                            images={reviewImages}
                            handleDeleteImage={handleDeleteImage}
                            haveUploadSize={true}
                            required={true}
                        />
                        <div>
                            <CustomButton label='Update Review' onClick={submitReview} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditReview