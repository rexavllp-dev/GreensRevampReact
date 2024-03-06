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


const EditOptionModal = ({ open, handleClose, editData }) => {
    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(false)
    const [formData, setFormData] = React.useState({
        option_name: ''
    });


    React.useEffect(() => {
        setFormData({
            option_name: editData?.name
        })
    }, [editData]);

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        // setConfirmationOpen(false);
        // onClose(); // Close the main modal

        dispatch(updateOption({
            id: editData?.id,
            data: {
                option_name: formData?.option_name,
            }
        })).then((res) => {
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
                        <ModalHeader className="flex flex-col gap-1">Update Option Name</ModalHeader>
                        <ModalBody>
                            <div className='flex flex-col gap-3'>
                                <CustomInput name='option_name' type='text'
                                    maxLength={100}
                                    placeholder='Option Name' label={'Option Name'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.option_name}
                                />
                                <div className='flex gap-3 justify-end'>
                                    <CustomButton label='Save' variant='primary' onClick={() => {
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

export default EditOptionModal