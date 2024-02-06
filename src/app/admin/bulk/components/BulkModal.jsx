'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import CustomButton from '@/library/buttons/CustomButton';
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import React from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createBulkDiscount, updateBulkDiscount } from "@/services/features/bulkSlice";
import CustomSelect from "@/library/select/custom-select/CustomSelect";


const BulkModal = ({ open, handleClose, id, isUpdate, updateData }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        usr_firstname: '',
        usr_email: '',
        quantity: '',

    })

    const approvalStatuses = [
        {
            label: 'Approved',
            value: 'approve'
        },
        {
            label: 'Pending',
            value: 'pending'
        },
        {
            label: 'Rejected',
            value: 'reject'
        }
    ]

    React.useEffect(() => {
        if (isUpdate) {
            setFormData({
                usr_firstname: updateData?.usr_firstname,
                usr_email: updateData?.usr_email,
                quantity: updateData?.quantity,
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
            bulk_id: id,
            newQuantity: formData.quantity,
            newStatus: formData.status
        }

            dispatch(updateBulkRequest({ data, id: updateData?.id })).then((res) => {
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
                        <ModalHeader className="flex flex-col gap-1">Update Bulk Request</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-3'>
                                <CustomInput name='usr_firstname' type='text'
                                    maxLength={100}
                                    placeholder='First Name' label={'First Name'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.usr_firstname}
                                />
                                <CustomInput name='usr_email' type='text'
                                    maxLength={100}
                                    placeholder='Email Addresss' label={'Email Addresss'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.usr_email}
                                />
                                <CustomInput name='quantity' type='text'
                                    maxLength={100}
                                    placeholder='Quantity' label={'Quantity'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.quantity}
                                />
                                <CustomSelect label={'Approval Status'} 
                                    value={formData.approved_status}
                                    data={approvalStatuses} name={'approved_status'}
                                    onChange={(e) => { handleInputChange({ e }) }}
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

export default BulkModal