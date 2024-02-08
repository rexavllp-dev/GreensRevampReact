
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomButton from '@/library/buttons/CustomButton'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './PriceTab.scss'
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import { createPrice, updatePrice } from '@/services/features/productSlice';
import { FaRegEdit } from 'react-icons/fa';
import { useDisclosure } from '@nextui-org/react';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal';

const PriceTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [isDisabled, setIsDisabled] = React.useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false)

    const priceTypes = [
        { label: 'Percentage', value: "percentage" },
        { label: 'Fixed', value: 'fixed' },
    ]

    const [formData, setFormData] = React.useState({
        product_price: 0,
        special_price: 0,
        special_price_type: '',
        special_price_start: '',
        special_price_end: '',
        product_id: id,
        prd_status: false,
        prd_dashboard_status: false,
        is_discount: false
    })

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (data?.data?.product?.product_price) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [data?.data?.product?.product_price])

    useEffect(() => {
        if (data?.data?.product?.product_price) {
            setFormData((prev) => ({
                product_price: data?.data?.product?.product_price,
                special_price: data?.data?.product?.special_price,
                special_price_type: data?.data?.product?.special_price_type,
                special_price_start: new Date(data?.data?.product?.special_price_start),
                special_price_end: new Date(data?.data?.product?.special_price_end),
                prd_status: data?.data?.product?.prd_status,
                prd_dashboard_status: data?.data?.product?.prd_dashboard_status,
                is_discount: data?.data?.product?.is_discount,
                product_id: id
            }))

        }
    }, [data])

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        setConfirmationOpen(false);
        onClose();
        setLoading(true);
        let data = {}
        if (formData?.is_discount) {
            data = {
                product_price: formData?.product_price,
                special_price: formData?.special_price,
                special_price_type: formData?.special_price_type,
                special_price_start: formData?.special_price_start,
                special_price_end: formData?.special_price_end,
                product_id: id,
                prd_status: formData?.prd_status,
                prd_dashboard_status: formData?.prd_dashboard_status,
                is_discount: formData?.is_discount,
                product_id: formData?.product_id
            }
        } else {
            data = {
                product_price: formData?.product_price,
                prd_status: formData?.prd_status,
                prd_dashboard_status: formData?.prd_dashboard_status,
                is_discount: formData?.is_discount,
                product_id: formData?.product_id
            }
        }
        if (data?.data?.product?.product_price) {
            dispatch(updatePrice({ data: data, id: id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            })
        } else {
            dispatch(createPrice({ data: data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            })
        }
    }

    return (
        <div className='pricetab'>
            {
                data?.data?.product?.product_price ?
                    <div className="editbtn ">
                        <div className="btn" onClick={() => { setIsDisabled(!isDisabled) }}>
                            <FaRegEdit size={20} />
                        </div>
                    </div>
                    : <></>
            }

            <div className="form">
                <div className="stack">

                    <CustomInput name='product_price' type='text'
                        maxLength={100}
                        placeholder='Price' label={'Price'}
                        // isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.product_price}
                        disabled={isDisabled}
                    // isInvalid={errors.product_price.error}
                    // errMsg={errors.product_price.message}
                    />
                    <CustomToggleButton label='Discount?' value={formData.is_discount}
                        okText={'Yes'} cancelText={'No'} disabled={isDisabled}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, is_discount: value })) }}
                    />

                    {
                        formData.is_discount &&
                        <>
                            <CustomSelect label={'Discount Type'} value={formData.special_price_type} data={priceTypes} name={'special_price_type'}
                                onChange={(e) => { handleInputChange({ e }) }}
                                disabled={isDisabled}
                            />

                            <CustomInput
                                name='special_price'
                                type='text'
                                maxLength={100}
                                placeholder='Discount'
                                label={'Discount'}
                                // isRequired={true}
                                disabled={isDisabled}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.special_price}
                            // isInvalid={errors.special_price.error}
                            // errMsg={errors.special_price.message}
                            />

                        </>
                    }



                </div>

                <div className="stack">
                    {
                        formData.is_discount &&
                        <>
                            <CustomCalendar
                                name={'special_price_start'}
                                label='Discount Start Date'
                                value={formData.special_price_start}
                                // isInvalid={errors.special_price_start.error}
                                // errMsg={errors.special_price_start.message}
                                disabled={isDisabled}
                                onChange={(date) => {
                                    setFormData((prevData) => ({ ...prevData, special_price_start: date }));
                                    // setErrors((prevErrors) => ({ ...prevErrors, special_price_start: { error: false, message: '' } }));
                                }}
                                isRequired={true}
                            />
                            <CustomCalendar
                                name={'special_price_end'}
                                label='Discount End Date'
                                value={formData.special_price_end}
                                disabled={isDisabled}
                                // isInvalid={errors.special_price_end.error}
                                // errMsg={errors.special_price_end.message}
                                onChange={(date) => {
                                    setFormData((prevData) => ({ ...prevData, special_price_end: date }));
                                    // setErrors((prevErrors) => ({ ...prevErrors, special_price_end: { error: false, message: '' } }));
                                }}
                                isRequired={true}
                            />
                        </>
                    }
                    <CustomToggleButton label='Product Status' value={formData.prd_status}
                        disabled={isDisabled}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, prd_status: value })) }}
                    />
                    <CustomToggleButton label='Dashboard Status' value={formData.prd_dashboard_status}
                        disabled={isDisabled}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, prd_dashboard_status: value })) }}
                    />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={() => setConfirmationOpen(true)} />
            </div>
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={handleSubmit}
                title="Confirmation"
                message="Are you sure you want to save changes?"
            />
        </div>
    )
}

export default PriceTab