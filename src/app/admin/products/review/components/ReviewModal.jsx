

"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import CustomInput from "@/library/input/custominput/CustomInput";
import CustomTextarea from "@/library/textarea/CustomTextarea";
import ImageUpload from "@/components/imageupload/ImageUpload";
import CustomButton from "@/library/buttons/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import "./ReviewModal.scss";
import CustomToggleButton from "@/library/buttons/togglebutton/CustomToggleButton";
import { toast } from "react-toastify";
import Image from "next/image";
import { updateReview } from "@/services/features/reviewSlice";

export default function ReviewModal({ open, handleClose, editData }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState({
        rating: 0,
        heading_review: '',
        review: '',
        is_approved: false
    })

    const [reviewImages, setReviewImages] = React.useState([]);

    React.useEffect(() => {
        setFormData({
            rating: editData?.rating,
            heading_review: editData?.heading_review,
            review: editData?.review,
            is_approved: editData?.is_approved
        })
    }, [editData]);

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
            rating: formData.rating,
            heading_review: formData.heading_review,
            review: formData.review,
            is_approved: formData.is_approved
        }

        dispatch(updateReview({ data, id: editData?.reviewId })).then((res) => {
            if (res.payload.success) {
                toast.success(res.payload.message);
                handleClose();
            } else {
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Modal
            size={'xl'}
            isOpen={open}
            onClose={() => {
                handleClose();
                // onClose();
            }}
            style={{ zIndex: 2000 }}
        >
            <ModalContent>
                <ModalHeader>Edit Review</ModalHeader>
                <ModalBody>
                    <div className="admin-review-form">
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
                            hideBrowseBtn={true}
                            isProductImg={true}
                            hideDelete={true}
                            name={'prd_additional_img'}
                            handleFileUpload={handleFileUpload}
                            images={editData?.reviewimages}
                            handleDeleteImage={handleDeleteImage}
                            haveUploadSize={true}
                            required={true}
                        />
                        <CustomToggleButton label={'Status'} name={'is_approved'}
                            value={formData.is_approved}
                            onChange={(value) => { setFormData((prev) => ({ ...prev, is_approved: value })) }} />
                        <div className="flex justify-end">
                            <CustomButton label='Update Review' onClick={submitReview} />
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal >
    );
}
