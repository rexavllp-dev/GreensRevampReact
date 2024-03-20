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
import { cancelIndividualOrder, updateOrderQuantity } from "@/services/features/orderSlice";


const CancelIndividualOrderModal = ({ open, handleClose, editData }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = React.useState({
        cancel_note: ''
    });

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        dispatch(cancelIndividualOrder({
            data: {
                order_id: editData?.itemId,
                cancel_note: formData?.cancel_note,
            }
        })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
                handleClose();
            } else {
                toast.error(res.payload?.message)
            }
        }).catch((err) => {
            console.log(err);
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
                        <ModalHeader className="flex flex-col gap-1">Cancel Product</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-3'>
                                <CustomTextarea label={'Cancel Note'}
                                    placeholder={'Cancel Note'}
                                    name={'cancel_note'} value={formData.cancel_note}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                />
                                <div className='flex gap-3 justify-end'>
                                    <CustomButton label='Submit' variant='primary' onClick={() => {
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

export default CancelIndividualOrderModal