'use client';
import React, { useEffect } from 'react';
import { MdKeyboardArrowRight, MdPrint } from 'react-icons/md';
import './OrderCard.scss';
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import CustomButton from '@/library/buttons/CustomButton';


export default function OrderCard({ order_dat, open_modal, open_driver_modal, action_label }) {
    const router = useRouter()

    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);


    return (
        <div className="ordercard">
            <div className="header">
                <CustomTypography content={'OID #'+order_dat.orderId} weight="MEDIUM" color="BLACK" size="MEDIUM-LARGE" />
    
            </div>
            <div class="break"></div>
            <div className="footer">
            
               <div className='info'>
                   <h4><b>Date</b> : {order_dat.order_date}</h4>
                   <h4><b>Time</b> : {order_dat.order_time}</h4>
                   <h4><b>Delivery</b> : {order_dat.ord_shipping_method}</h4>
                   <h4><b>Item Collected By</b> : {order_dat.acceptedusername}</h4>
                   <h4><b>Delivery By</b> : {order_dat.deliveryusername}</h4>
                   <h4><b>Flat/ Villa</b> : {order_dat.flat_villa}</h4>
               </div>

            </div>
            <div class="break"></div>
            <div className="btn">
                <div>
                        <CustomButton label={action_label} onClick={() => open_driver_modal(order_dat.orderId)}></CustomButton>
                </div>
                <div>
                        <CustomButton label="Details" variant='transparent' onClick={() => open_modal(order_dat)}></CustomButton>
                </div>
            </div>
        </div>
    )
}