'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import CustomModal from '@/components/modal/custom-modal/CustomModal';
import CustomButton from '@/library/buttons/CustomButton';
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import React from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { modifyStock } from "@/services/features/productSlice";
import ConfirmationModal from "@/components/modal/confirmation-modal/ConfirmationModal";


const StockUpdateModal = ({ open, handleClose, id, product_qty }) => {
    const dispatch = useDispatch()

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [action, setAction] = React.useState('');
    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        quantity: 0,
        comment: '',
        product_id: id
    })

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        setConfirmationOpen(false);
        onClose(); // Close the main modal
        let data = {
            action: action,
            quantity: formData.quantity,
            comment: formData.comment,
        }

        dispatch(modifyStock({ data, id: formData.product_id })).then((res) => {
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
                        <ModalHeader className="flex flex-col gap-1">Update Stock</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-3'>
                                <CustomInput name='product_quantity' type='text'
                                    maxLength={100}
                                    disabled={true}
                                    placeholder='Product Quantity' label={'Product Quantity'}

                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={product_qty ? product_qty : 0}
                                />
                                <CustomInput name='quantity' type='text'
                                    maxLength={100}
                                    placeholder='Qty' label={'Qty'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.quantity}
                                />
                                <CustomTextarea label={'Description'}
                                    placeholder={'Description'}
                                    name={'comment'} value={formData.comment}
                                    onChange={(e) => { handleInputChange({ e }) }} />
                                <div className='flex gap-3 justify-end'>
                                    <CustomButton label='Add Stock' variant='primary' onClick={() => {
                                        setConfirmationOpen(true); setAction('add')
                                    }} />
                                    <CustomButton label='Reduce Stock' variant='transparent' onClick={() => {
                                        setConfirmationOpen(true); setAction('reduce')
                                    }} />
                                </div>
                                <ConfirmationModal
                                    isOpen={isConfirmationOpen}
                                    onClose={() => setConfirmationOpen(false)}
                                    onConfirm={handleSubmit}
                                    title="Confirmation"
                                    message="Are you sure you want to update stock?"
                                />
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal >

    )
}

export default StockUpdateModal