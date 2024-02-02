'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import CustomModal from '@/components/modal/custom-modal/CustomModal';
import CustomButton from '@/library/buttons/CustomButton';
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import React from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createBulkDiscount, updateBulkDiscount } from "@/services/features/bulkSlice";


const BulkDiscountModal = ({ open, handleClose, id, isUpdate, updateData }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        start_range: 0,
        end_range: 100,
        discounted_price: ''
    })

    React.useEffect(() => {
        if (isUpdate) {
            setFormData({
                start_range: updateData?.start_range,
                end_range: updateData?.end_range,
                discounted_price: updateData?.discounted_price
            })
        }
    }, [updateData])

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        let data = {
            product_id: id,
            start_range: formData?.start_range,
            end_range: formData?.end_range,
            discounted_price: formData?.discounted_price
        }

        if (isUpdate) {
            dispatch(updateBulkDiscount({ data, id: updateData?.id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                    handleClose()
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false)
            })
        } else {
            dispatch(createBulkDiscount({ data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                    handleClose()
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


    return (

        <Modal
            size={'md'}
            isOpen={open}
            onClose={() => {
                handleClose();
                // onClose();
            }}
        >
            <ModalContent>
                {(handleClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create Bulk Discount</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-3'>
                                <CustomInput name='start_range' type='text'
                                    maxLength={100}
                                    placeholder='Min Range' label={'Min Range'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.start_range}
                                />
                                <CustomInput name='end_range' type='text'
                                    maxLength={100}
                                    placeholder='Max Range' label={'Max Range'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.end_range}
                                />
                                <CustomInput name='discounted_price' type='text'
                                    maxLength={100}
                                    placeholder='Price Per Quantity' label={'Price Per Quantity'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.discounted_price}
                                />

                                <div className='flex gap-3 justify-end'>
                                    <CustomButton label='Submit' variant='primary' onClick={() => handleSubmit()} />
                                </div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal >

    )
}

export default BulkDiscountModal