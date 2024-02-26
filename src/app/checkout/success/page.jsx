"use client";
import React from 'react';
import "./OrderSuccess.scss";
import CustomTypography from '@/library/typography/CustomTypography';
import CustomButton from '@/library/buttons/CustomButton';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOrder } from '@/services/features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { payComplete } from '@/services/features/paymentSlice';
import { toast } from 'react-toastify';

const OrderSuccess = () => {

  const searchParams = useSearchParams()
  const orderId = searchParams.get('od');
  const router = useRouter();
  const dispatch = useDispatch()
  const { singleOrder, } = useSelector((state) => state.order)
  const { isPayCompleted } = useSelector((state) => state.payment)

  React.useEffect(() => {
    dispatch(getOrder({ id: orderId }))
  }, [orderId]);

  React.useEffect(() => {
    if (singleOrder?.result) {

      const sessionId = singleOrder?.result[0]?.session_id;
      if (sessionId && !isPayCompleted) {
        const data = {
          stripe_session_id: sessionId,
          order_id: orderId
        }
        dispatch(payComplete({ data })).then((res) => {
          if (res.payload?.success) {
            // toast.success("Payment completed successfully", {
            //   toastId: 'success1',
            // });
            console.log("Payment completed successfully")
          } else {
            // toast.error(res.payload?.message);
          }
        }).catch(err => console.log(err));
      }
    }
  }, [singleOrder, isPayCompleted])

  return (
    <div className="order_confirmation">
      <div className="header">
        <CustomTypography content={`Your order #${singleOrder?.result ? singleOrder?.result[0]?.id : ''} has been placed!`} size='LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
        <CustomTypography content='A confirmation email has been sent to your email' size='MEDIUM-LARGE' color='PURE-BLACK' weight='REGULAR' />
      </div>
      <div className="address">
        <CustomTypography content='Shipping Address' size='MEDIUM-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
        <CustomTypography content={singleOrder?.result ? singleOrder?.result[0]?.address_line_1 : ''} size='MEDIUM-LARGE' color='PURE-BLACK' weight='REGULAR' />
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

export default OrderSuccess