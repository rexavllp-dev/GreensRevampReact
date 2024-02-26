"use client";
import React from 'react';
import "./OrderFailed.scss";
import CustomTypography from '@/library/typography/CustomTypography';
import CustomButton from '@/library/buttons/CustomButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOrder } from '@/services/features/orderSlice';
import { useDispatch } from 'react-redux';
import { getStripeUrl } from '@/services/features/paymentSlice';
import { toast } from 'react-toastify';

const OrderFailed = () => {

  const searchParams = useSearchParams()
  const orderId = searchParams.get('od');
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
  }, [])

  const handleRetry = () => {
    const data = { order_id: orderId };
    dispatch(getStripeUrl({ data })).then((res) => {
      if (res?.payload?.success) {
        let stripeUrl = res?.payload?.url;
        window.open(stripeUrl, '_self');
      }else {
        toast.error(res?.payload?.message);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="order_confirmation">
      <div className="header">
        <CustomTypography content='Order Failed!' size='LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
        <CustomTypography content='An error occurred during the processing of your order.' size='MEDIUM-LARGE' color='PURE-BLACK' weight='REGULAR' />
      </div>
      <CustomButton variant='transparent' label='Try again?' onClick={() => { handleRetry() }} />
    </div>
  )
}

export default OrderFailed