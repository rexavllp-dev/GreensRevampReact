'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import CustomModal from '@/components/modal/custom-modal/CustomModal';
import CustomButton from '@/library/buttons/CustomButton';
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { modifyStock, updateOption } from "@/services/features/productSlice";
import { createReason, updateReason } from "@/services/features/orderSlice";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import CustomToggleButton from "@/library/buttons/togglebutton/CustomToggleButton";


const CreateReasonModal = ({ open, handleClose, editData }) => {
    const dispatch = useDispatch()

    const [formData, setFormData] = React.useState({
        clr_reason: '',
        clr_status: true,
        reason_type: ''
    });

    const reasonTypes = [
        {
            id: 1,
            label: 'Return',
            value: 'return'
        },
        {
            id: 2,
            label: 'Replace',
            value: 'replace'
        },
        {
            id: 3,
            label: 'Cancel',
            value: 'cancel'
        },
        {
            id: 4,
            label: 'Other',
            value: 'other'
        }
    ]

    useEffect(() => {
        if (editData) {
            setFormData({
                clr_reason: editData?.clr_reason,
                clr_status: editData?.clr_status,
                reason_type: editData?.reason_type
            })
        }
    }, [editData]);

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        if (editData?.id) {
            dispatch(updateReason({
                data: formData,
                id: id
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
        } else {
            dispatch(createReason({
                data: formData
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
                        <ModalHeader className="flex flex-col gap-1">Create New Reason</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-3'>
                                <CustomTextarea label={'Reason'}
                                    placeholder={'Reason'}
                                    name={'clr_reason'} value={formData.clr_reason}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                />

                                <CustomSelect label={'Reason Type'} value={formData.reason_type}
                                    data={reasonTypes} name={'reason_type'} onChange={(e) => { handleInputChange({ e }) }}
                                />
                                <CustomToggleButton label='Product Status' value={formData.clr_status}
                                    onChange={(value) => { setFormData((prev) => ({ ...prev, clr_status: value })) }}
                                />

                                <div className='flex gap-3 justify-end'>
                                    <CustomButton label='Create' variant='primary' onClick={() => {
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

export default CreateReasonModal