
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import './InventoryTab.scss'
import { createInventory, updateInventory } from '@/services/features/inventorySlice';
import StockUpdateModal from './components/StockUpdateModal';
import { FaRegEdit } from 'react-icons/fa';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal';
import { useDisclosure } from '@nextui-org/react';

const InventoryTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

    const trackInventory = [
        {
            label: "Don't Track Inventory", value: 'false',
        },
        {
            label: "Track Inventory", value: 'true',
        },
    ]

    const stockAvailibility = [
        {
            label: "In Stock", value: 'In stock',
        },
        {
            label: "Out of Stock", value: 'Out of stock',
        },
    ]

    const [formData, setFormData] = React.useState({
        sku: '',
        stock_availability: 'In stock',
        inventory_management: false,
        product_quantity: 0,
        min_qty: 1,
        max_qty: 50,
        show_out_of_stock_on_dashboard: false,
        back_in_stock: false,
        best_seller: false,
        product_id: ''
    })

    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false)
    const [isDisabled, setIsDisabled] = React.useState(true);

    useEffect(() => {
        if (data?.data?.product?.product_inventory_id) {
            setFormData((prev) => ({
                sku: data?.data?.product?.sku,
                stock_availability: data?.data?.product?.stock_availability,
                inventory_management: JSON.stringify(data?.data?.product?.inventory_management),
                product_quantity: data?.data?.product?.product_quantity || 0,
                min_qty: data?.data?.product?.min_qty,
                max_qty: data?.data?.product?.max_qty,
                show_out_of_stock_on_dashboard: data?.data?.product?.show_out_of_stock_on_dashboard,
                back_in_stock: data?.data?.product?.back_in_stock,
                best_seller: data?.data?.product?.best_seller,
                product_id: id,
            }))

        }
    }, [data])

    useEffect(() => {
        if (data?.data?.product?.product_inventory_id) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [data?.data?.product?.product_inventory_id])

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        setConfirmationOpen(false);
        onClose();
        setLoading(true);

        const newData = {
            sku: formData.sku,
            stock_availability: formData.stock_availability,
            inventory_management: JSON.parse(formData.inventory_management),
            product_quantity: formData.product_quantity,
            min_qty: formData.min_qty,
            max_qty: formData.max_qty,
            show_out_of_stock_on_dashboard: formData.show_out_of_stock_on_dashboard,
            back_in_stock: formData.back_in_stock,
            best_seller: formData.best_seller,
            product_id: id
        }

        if (data?.data?.product?.product_inventory_id) {
            dispatch(updateInventory({ data: newData, id: id })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false)
            })
        } else {
            dispatch(createInventory({ data: newData })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
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
        <div className='inventorytab'>
           {
                data?.data?.product?.product_inventory_id ?
                    <div className="editbtn ">
                        <div className="btn" onClick={() => { setIsDisabled(!isDisabled) }}>
                            <FaRegEdit size={20} />
                        </div>
                    </div>
                    : <></>
            }

            <div className="form">

                <div className="stack">

                    <CustomInput name='sku' type='text'
                        maxLength={100}
                        placeholder='SKU' label={'SKU'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.sku}
                        disabled={isDisabled}
                    />

                    <CustomSelect label={'Inventory Management'}
                        value={formData.inventory_management} name={'inventory_management'}
                        data={trackInventory} onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />
                    {
                        formData?.inventory_management === 'true' &&
                        <>
                            <CustomInput name='product_quantity' type='text'
                                maxLength={100}
                                placeholder='Quantity' label={'Quantity'}
                                disabled={true}
                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.product_quantity}
                            />
                            {
                                data?.data?.product?.product_inventory_id == null ?
                                    <div className="warningmsg">
                                        <CustomTypography
                                            content='Note:By default, product quantity is updated to zero on addition of a new product.Please update the product to increase quantity.'
                                            size='SMALL'
                                            weight='REGULAR'
                                        />
                                    </div>
                                    :
                                    <></>
                            }
                            <CustomButton label='Update Stock'
                                disabled={data?.data?.product?.product_inventory_id == null}
                                onClick={() => setOpen(true)} />
                        </>
                    }
                    <CustomInput name='min_qty' type='text'
                        maxLength={100}
                        placeholder='Minimum Qty' label={'Minimum Qty'}
                        disabled={isDisabled}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.min_qty}
                    />
                    <CustomInput name='max_qty' type='text'
                        maxLength={100}
                        placeholder='Maximum Qty' label={'Maximum Qty'}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.max_qty}
                        disabled={isDisabled}
                    />
                    <CustomSelect label={'Stock Availablility'}
                        value={formData.stock_availability} name={'stock_availability'}
                        data={stockAvailibility}
                        onChange={(e) => { handleInputChange({ e }) }}
                        disabled={isDisabled}
                    />
                </div>

                <div className="stack">
                    <CustomToggleButton label='Show out of stock on dashboard' value={formData.show_out_of_stock_on_dashboard}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, show_out_of_stock_on_dashboard: value })) }}
                        disabled={isDisabled}
                    />
                    <CustomToggleButton label='Back in stock' value={formData.back_in_stock}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, back_in_stock: value })) }}
                        disabled={isDisabled}
                    />
                    <CustomToggleButton label='Best Seller' value={formData.best_seller}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, best_seller: value })) }}
                        disabled={isDisabled}
                    />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={() => setConfirmationOpen(true)} />
            </div>

            <StockUpdateModal open={open} handleClose={() => setOpen(false)} product_qty={formData.product_quantity} id={id} />

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

export default InventoryTab