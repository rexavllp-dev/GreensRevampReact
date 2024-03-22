'use client';
import React, { useEffect } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import { getSingleProduct } from '@/services/features/productSlice';
import { IoIosStar } from 'react-icons/io';
import { IoStarOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import './Review.scss';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import ImageUpload from '@/components/imageupload/ImageUpload';
import CustomInput from '@/library/input/custominput/CustomInput';
import ImageGallery from '@/components/imagegallery/ImageGallery';
import CustomButton from '@/library/buttons/CustomButton';
import ReactStars from "react-rating-stars-component";

const ReviewProduct = ({ params }) => {
    const dispatch = useDispatch();

    const { singleProduct } = useSelector((state) => state.products)

    const [formData, setFormData] = React.useState({
        review: '',
        summary: '',
        review: '',
        rating: 0
    })

    const [reviewImages, setReviewImages] = React.useState([]);

    useEffect(() => {
        dispatch(getSingleProduct({ id: params.id }))
    }, [params?.id]);

    useEffect(() => {
       console.log(formData)
    }, [formData]);

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

    }



    return (
        <div className="review_product-wrapper">
            <div className="header">
                <CustomTypography content={"Write a Review"} color="BLACK" size="MEDIUM-LARGE" weight="SEMI-BOLD" />
            </div>
            <div className="review_product">
                <div className="left">
                    <div className="prd_images">
                        <ImageGallery data={singleProduct} />
                    </div>
                </div>
                <div className="right">

                    <div className="prd_details">

                        <div className="prd_item">
                            <CustomTypography content={singleProduct?.data?.product?.prd_name} color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                            {/* <CustomTypography content="CDA Wafer Happy New Year 1x12 Pcs - LCU2134" color="BLACK" size="LARGE" weight="SEMI-BOLD" /> */}
                        </div>

                        <div className="prd_item">
                            {
                                singleProduct?.data?.product?.sku &&
                                <div className='sku_code'>
                                    <CustomTypography content="SKU:" color="GRAY" size="REGULAR " weight="SEMI-BOLD" />
                                    <CustomTypography content={singleProduct?.data?.product?.sku} color="BLACK" size="REGULAR" weight="SEMI-BOLD" />
                                </div>
                            }

                            {
                                singleProduct?.data?.product?.item_code &&
                                <div className='item_code'>
                                    <CustomTypography content="Item Code:" color="GRAY" size="REGULAR" weight="SEMI-BOLD" />
                                    <CustomTypography content={singleProduct?.data?.product?.item_code} color="BLACK" size="REGULAR" weight="SEMI-BOLD" />
                                </div>
                            }
                        </div>
                        <div className="prd_item">
                            {
                                singleProduct?.data?.product?.productPrice[0]?.specialPrice ?
                                    <div className="prd_item">
                                        <CustomTypography content={`AED ${parseFloat(singleProduct?.data?.product?.productPrice[0]?.specialPrice?.toFixed(2))}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                        <CustomTypography content={`AED ${parseFloat(singleProduct?.data?.product?.productPrice[0]?.price?.toFixed(2))}`} color="GRAY" size="MEDIUM" weight="SEMI-BOLD" style={{ textDecoration: 'line-through' }} />
                                        <CustomTypography content="(Inclusive of VAT)" color="GREY" size="MEDIUM" weight="REGULAR" />
                                    </div>
                                    :
                                    <div className="prd_item">
                                        <CustomTypography content={`AED ${parseFloat(singleProduct?.data?.product?.productPrice[0]?.price?.toFixed(2))}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                        <CustomTypography content="(Inclusive of VAT)" color="GREY" size="MEDIUM" weight="REGULAR" />
                                    </div>
                            }
                        </div>
                        <div className="prd_item">
                            {/* <div className="rating">
                                <div className="star ml-2"> */}
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
                                    {/* <IoIosStar />
                                    <IoIosStar />
                                    <IoIosStar />
                                    <IoIosStar />
                                    <IoStarOutline /> */}
                                {/* </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="review-form">
                        <CustomInput name='review' type='text'
                            maxLength={100}
                            placeholder='Heading' label={'Review Heading'}
                            onChange={(e) => { handleInputChange({ e }) }}
                            value={formData.review}
                        />
                        <CustomTextarea label={'Review Summary'}
                            placeholder={'Review Summary'}
                            name={'review_summary'} value={''}
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
                            <CustomButton label='Submit Review' onClick={submitReview} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewProduct