
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

const InventoryTab = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const roles = [
        { label: 'Customer', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Delivery', value: 3 },
    ]

    const [formData, setFormData] = React.useState({
        sku_number: '',
        inve: '',
    })

    const [loading, setLoading] = React.useState(false);

    const handleInputChange = ({ e, country }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }


    const handleSubmit = () => {

    }

    return (
        <div className='inventorytab'>

            <div className="form">

                <div className="stack">

                    <CustomInput name='first_name' type='text'
                        maxLength={100}
                        placeholder='SKU' label={'SKU'}
                    
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.first_name}
                    />

                    <CustomSelect label={'Inventory Management'} data={roles} />
                    <CustomSelect label={'Stock Availablility'} data={roles} />
                </div>

                <div className="stack">
                    <CustomToggleButton label='Show Out of stock on dashbord' value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />
                    <CustomToggleButton label='Back in stock' value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
                    />
                    <CustomToggleButton label='Best Seller' value={formData.status}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, status: value })) }}
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