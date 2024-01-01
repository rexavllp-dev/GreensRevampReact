import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import CartItem from '@/components/cards/cartitem/CartItem';
import './Cart.scss';
import CustomButton from '@/library/buttons/CustomButton';

const cartItems = [
    {
        id: 1,
        title: 'CDA Wafer Graduation Cap 1x12 Pcs',
        price: 20,
        quantity: 1
    },
    {
        id: 2,
        title: 'CDA Wafer Graduation Cap 1x12 Pcs',
        price: 20,
        quantity: 1
    },
    {
        id: 3,
        title: 'CDA Wafer Graduation Cap 1x12 Pcs',
        price: 20,
        quantity: 1
    }
]

const Cart = () => {
    return (
        <div className='cart-wrapper'>
            <div className="cart">
                <div className="title">
                    <CustomTypography content="Cart (AED100)" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                </div>

                <div className="cartitems">
                    {
                        cartItems.map((item, index) => {
                            return (
                                <CartItem key={index} />
                            )
                        })
                    }
                </div>
                <CartItem />
            </div>

            <div className="carttotal">
                <div className="item">
                    <CustomTypography content="Subtotal (2 items)" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                    <CustomTypography content="AED 100" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                </div>

                <div className="item">
                    <CustomTypography content="Shipping" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                    <CustomTypography content="FREE" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                </div>

                <div className="item">
                    <CustomTypography content="Discount" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                </div>

                <div className="item">
                    <CustomTypography content="Coupon  #FIRSTHI15 " color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="-AED 20" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                </div>
                <div className="item">
                    <CustomTypography content="Reward Points 2000" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="-AED 20" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                </div>

                <div className="item">
                    <div></div>
                    <CustomTypography content="AED 80" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                </div>
                <div className="item">
                    <CustomTypography content="Grand Total (Including VAT)" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                    <CustomTypography content="AED 20" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                </div>

                <div className="btn">
                    <CustomButton fullWidth label='Proceed to Checkout' variant='primary' />
                </div>

            </div>
        </div>
    )
}

export default Cart