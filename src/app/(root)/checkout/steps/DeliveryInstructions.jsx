"use client";
import CustomButton from '@/library/buttons/CustomButton'
import CustomRadioBox from '@/library/radiobox/CustomRadioBox'
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import CustomShippingMethodRadio from '../components/CustomShippingMethodRadio';

const DeliveryInstructions = ({ onSubmit, formData, setFormData }) => {
    const [addressType, setAddressType] = React.useState('home')
    const [deliveryInstructions, setDeliveryInstructions] = React.useState([
        {
            id: 1,
            title: 'Do not ring the bell',
        },
        {
            id: 2,
            title: 'Leave it at my door',
        }
    ])
    return (
        <div className="step">
            {/* <div className="title mb-5">
                <CustomTypography content="3. Payment Method" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
            </div> */}

            <CustomShippingMethodRadio orientation='horizontal' data={deliveryInstructions}
                value={formData.payment_method}
                width={'300px'}
                onChange={(value) => {
                    setFormData((prev) => ({ ...prev, payment_method: value }))
                }}
            />

            <div className="flex justify-end">
                <CustomButton label='Proceed to pay' variant='primary' onClick={() => { onSubmit() }} />
            </div>
        </div>
    )
}

export default DeliveryInstructions