"use client";
import CustomButton from '@/library/buttons/CustomButton'
import CustomRadioBox from '@/library/radiobox/CustomRadioBox'
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import CustomShippingMethodRadio from '../components/CustomShippingMethodRadio';

const PaymentMethodStep = ({ onSubmit, formData, setFormData }) => {


    const [addressType, setAddressType] = React.useState('home')
    const [paymentMethods, setPaymentMethods] = React.useState([
        {
            id: 1,
            title: 'Credit Card/ Debit Card',
            desc: '',
            disabled: false
        },
        {
            id: 2,
            title: 'Cash on Delivery',
            desc: 'Cash on Delivery has a service charge of AED 15.',
            disabled: formData?.shipping_method === 'Shipping' ? false : true
        }
    ])

    const handleUpdatePaymentMethod = (value) => {
        if (value === "Cash on Delivery") {
            setFormData((prev) => ({ ...prev, contactless_delivery: 'Do not ring the bell' }))
        }
        setFormData((prev) => ({ ...prev, payment_method: value }))
    }
    return (
        <div className="step">
            {/* <div className="title mb-5">
                <CustomTypography content="3. Payment Method" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
            </div> */}

            <CustomShippingMethodRadio orientation='vertical' data={paymentMethods}
                value={formData.payment_method}
                width={'800px'}
                onChange={(value) => {
                    handleUpdatePaymentMethod(value);

                }}
            />

            <div className="flex justify-end">
                <CustomButton label='Continue' variant='primary' onClick={() => { onSubmit() }} />
            </div>
        </div>
    )
}

export default PaymentMethodStep