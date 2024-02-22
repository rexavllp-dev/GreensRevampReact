"use client";
import CustomButton from '@/library/buttons/CustomButton'
import CustomRadioBox from '@/library/radiobox/CustomRadioBox'
import CustomTypography from '@/library/typography/CustomTypography'
import React from 'react'
import CustomShippingMethodRadio from '../components/CustomShippingMethodRadio';

const PaymentMethodStep = ({ onSubmit, formData, setFormData, makePayment }) => {

    
    const [addressType, setAddressType] = React.useState('home')
    const [paymentMethods, setPaymentMethods] = React.useState([
        {
            id: 1,
            title: 'Credit Card/ Debit Card',
            disabled: false
        },
        {
            id: 2,
            title: 'Cash on Delivery',
            disabled: formData?.shipping_method === 'Shipping' ? false : true
        }
    ])
    return (
        <div className="step">
            {/* <div className="title mb-5">
                <CustomTypography content="3. Payment Method" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
            </div> */}

            <CustomShippingMethodRadio orientation='horizontal' data={paymentMethods}
                value={formData.payment_method}
                width={'200px'}
                onChange={(value) => {
                    setFormData((prev) => ({ ...prev, payment_method: value }))
                }}
            />

            <div className="flex justify-end">
                <CustomButton label='Continue' variant='primary' onClick={() => { onSubmit() }} />
            </div>
        </div>
    )
}

export default PaymentMethodStep