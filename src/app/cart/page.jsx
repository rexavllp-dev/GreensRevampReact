import React from 'react'
import './Cart.scss';
import CustomTypography from '@/library/typography/CustomTypography';

const Cart = () => {
    return (
        <div className='cart-wrapper'>
            <h1>Cart</h1>
            <CustomTypography content="Cart (AED100)" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
        </div>
    )
}

export default Cart