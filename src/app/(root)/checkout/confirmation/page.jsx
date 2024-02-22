"use client";
import React from 'react';
import "./OrderConfirmation.scss";
import CustomTypography from '@/library/typography/CustomTypography';
import CustomButton from '@/library/buttons/CustomButton';
import { useRouter } from 'next/navigation';

const OrderConfirmation = () => {
  const router = useRouter();
  return (
    <div className="order_confirmation">
      <div className="header">
        <CustomTypography content='Your order #384432 has been placed!' size='LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
        <CustomTypography content='A confirmation email has been sent to your email' size='MEDIUM-LARGE' color='PURE-BLACK' weight='REGULAR' />
      </div>
      <div className="address">
        <CustomTypography content='Shipping Address' size='MEDIUM-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
        <CustomTypography content='Lorem ipsum dolor sit amet consectetur adipiscing elit' size='MEDIUM-LARGE' color='PURE-BLACK' weight='REGULAR' />
      </div>
      <div className="delivery">
        <CustomTypography content='Estimated Delivery' size='MEDIUM-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
        <CustomTypography content='Sep 10 - Sep 17' size='MEDIUM-LARGE' color='PURE-BLACK' weight='REGULAR' />
      </div>
      <div className="coins">
        <CustomTypography content='Your 100 coins are on the way' size='MEDIUM-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
        <CustomTypography content='Redeem them on your next purchase with us.' size='MEDIUM-LARGE' color='PURE-BLACK' weight='REGULAR' />
      </div>

      <CustomButton variant='transparent' label='Continue Shopping' onClick={() => { router.push('/') }} />
    </div>
  )
}

export default OrderConfirmation