'use client'
import React, { useEffect, useState } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import CartItem from '@/components/cards/cartitem/CartItem';
import './Cart.scss';
import CustomButton from '@/library/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '@/services/features/cartSlice';
import { BsTruck } from "react-icons/bs";
import { FaStore } from 'react-icons/fa';

const Cart = () => {

    const dispatch = useDispatch();
    const { cartProducts, productQuantityUpdated } = useSelector((state) => state.cart)

    // States
    const [cartItems, setCartItems] = useState([]);
    const [selected, setSelected] = useState('shipping');

    useEffect(() => {
        dispatch(getCartProducts({}));
    }, [productQuantityUpdated])

    return (
        <div className='cart-wrapper'>
            <div className="cart">
                <div className="title">
                    <CustomTypography content="Cart " color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                </div>

                <div className="shipping-tabs">
                    <div className="tabs p-0" >
                        <div
                            onClick={() => setSelected('shipping')}
                            className={selected === 'shipping' ? "cursor-pointer tab tab-active" : "cursor-pointer tab"}
                        >
                            <CustomTypography weight='MEDIUM' content="Shipping (Available) " color={selected === 'shipping' ? "BLACK" : "GRAY-LIGHT"} size="MEDIUM" />
                            <BsTruck color={selected === 'shipping' ? "BLACK" : "#808080"} />
                        </div>
                        <div
                            onClick={() => setSelected('storePickup')}
                            className={selected === 'storePickup' ? "cursor-pointer tab tab-active" : "cursor-pointer tab"}
                        >
                            <CustomTypography weight='MEDIUM' content="Store Pickup (Available) " color={selected === 'storePickup' ? "BLACK" : "GRAY-LIGHT"} size="MEDIUM" />
                            <FaStore color={selected === 'storePickup' ? "BLACK" : "#808080"} />
                        </div>
                    </div>

                    {
                        selected === 'shipping' ?
                            <div className="shipping-details">
                                <CustomTypography weight='SEMI-BOLD' content="Shipping to" color="BLACK" size="MEDIUM" />
                                <CustomTypography weight='SEMI-BOLD' content="Arrives August 4 - August 7" color="BLACK" size="MEDIUM" />
                                <CustomTypography weight='REGULAR' content="(Shipping cost of AED 30 on orders below AED100.)" color="BLACK" size="MEDIUM" />
                            </div>
                            :
                            <div className="shipping-details">
                                <CustomTypography weight='SEMI-BOLD' content="Store pickup, Open 9:00AM - 6:00PM" color="BLACK" size="MEDIUM" />
                                <CustomTypography weight='REGULAR' content="Pickup charge of AED 5 on orders below AED50." color="BLACK" size="MEDIUM" />
                            </div>
                    }

                </div>

                <div className="cartitems">
                    {
                        cartProducts?.result?.cart?.map((item, index) => {
                            return (
                                <CartItem key={index} data={item} />
                            )
                        })
                    }
                </div>
            </div>

            <div className='carttotal-wrapper'>
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


                <div className="cartcoupon">
                    <div className="item">
                     
                    </div>

                    <div className="item">
                        <CustomTypography content="Coupons" color="BLACK" size="MEDIUM" weight="MEDIUM" />
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
        </div>
    )
}

export default Cart