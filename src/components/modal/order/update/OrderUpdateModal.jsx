'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import CustomModal from '@/components/modal/custom-modal/CustomModal';
import CustomButton from '@/library/buttons/CustomButton';
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import React from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { modifyStock, updateOption } from "@/services/features/productSlice";
import { updateOrderQuantity } from "@/services/features/orderSlice";


const OrderUpdateModal = ({ open, handleClose, editData }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = React.useState({
        quantity: ''
    });


    React.useEffect(() => {
        setFormData({
            quantity: editData?.order_op_qty
        })
    }, [editData]);

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        dispatch(updateOrderQuantity({
            data: {
                "orderItemId": editData?.id,
                "opQty": formData?.quantity
            }
        })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
                handleClose();
            } else {
                toast.error(res.payload?.message);
            }
        }).catch((err) => {
            toast.error(err.message);
        })
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
                        <ModalHeader className="flex flex-col gap-1">Update Product Quantity</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-3'>
                                <CustomInput name='quantity' type='text'
                                    maxLength={100}
                                    placeholder='Update Quantity' label={'Update Quantity'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.quantity}
                                />
                                <div className='flex gap-3 justify-end'>
                                    <CustomButton label='Update' variant='primary' onClick={() => {
                                        handleSubmit();
                                    }} />
                                </div>
                                {/* <ConfirmationModal
                                    isOpen={isConfirmationOpen}
                                    onClose={() => setConfirmationOpen(false)}
                                    onConfirm={handleSubmit}
                                    title="Confirmation"
                                    message="Are you sure want rename this option?"
                                /> */}
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal >

    )
}

export default OrderUpdateModal