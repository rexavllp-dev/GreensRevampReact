
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

const InventoryTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();

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
        minimum_quantity: '',
        max_order: '',
        show_out_of_stock_on_dashboard: false,
        back_in_stock: false,
        best_seller: false,
        product_id: ''
    })

    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (data?.data?.product?.product_inventory_id) {
            setFormData((prev) => ({
                sku: data?.data?.product?.sku,
                stock_availability: data?.data?.product?.stock_availability,
                inventory_management: JSON.stringify(data?.data?.product?.inventory_management),
                product_quantity: data?.data?.product?.product_quantity || 0,
                minimum_quantity: data?.data?.product?.minimum_quantity,
                max_order: data?.data?.product?.max_order,
                show_out_of_stock_on_dashboard: data?.data?.product?.show_out_of_stock_on_dashboard,
                back_in_stock: data?.data?.product?.back_in_stock,
                best_seller: data?.data?.product?.best_seller,
                product_id: id,
            }))

        }
    }, [data])

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = () => {
        setLoading(true);
        console.log('clikced')

        const newData = {
            sku: formData.sku,
            stock_availability: formData.stock_availability,
            inventory_management: JSON.parse(formData.inventory_management),
            product_quantity: formData.product_quantity,
            minimum_quantity: formData.minimum_quantity,
            max_order: formData.max_order,
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

            <div className="form">

                <div className="stack">

                    <CustomInput name='sku' type='text'
                        maxLength={100}
                        placeholder='SKU' label={'SKU'}

                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.sku}
                    />

                    <CustomSelect label={'Inventory Management'}
                        value={formData.inventory_management} name={'inventory_management'}
                        data={trackInventory} onChange={(e) => { handleInputChange({ e }) }}
                    />
                    {
                        formData?.inventory_management === 'true' &&
                        <>
                            <CustomInput name='product_quantity' type='text'
                                maxLength={100}
                                placeholder='Quantity' label={'Quantity'}

                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.product_quantity}
                            />
                            <CustomInput name='minimum_quantity' type='text'
                                maxLength={100}
                                placeholder='Minimum Qty' label={'Minimum Qty'}

                                onChange={(e) => { handleInputChange({ e }) }}
                                value={formData.minimum_quantity}
                            />
                        </>
                    }
                    <CustomInput name='max_order' type='text'
                        maxLength={100}
                        placeholder='Maximum Order' label={'Maximum Order'}

                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.max_order}
                    />
                    <CustomSelect label={'Stock Availablility'}
                        value={formData.stock_availability} name={'stock_availability'}
                        data={stockAvailibility}
                        onChange={(e) => { handleInputChange({ e }) }}
                    />
                </div>

                <div className="stack">
                    <CustomToggleButton label='Show Out of stock on dashbord' value={formData.show_out_of_stock_on_dashboard}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, show_out_of_stock_on_dashboard: value })) }}
                    />
                    <CustomToggleButton label='Back in stock' value={formData.back_in_stock}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, back_in_stock: value })) }}
                    />
                    <CustomToggleButton label='Best Seller' value={formData.best_seller}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, best_seller: value })) }}
                    />
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div>


        </div>
    )
}

export default InventoryTab