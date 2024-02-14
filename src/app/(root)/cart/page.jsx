'use client'
import React, { useEffect, useState } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import CartItem from '@/components/cards/cartitem/CartItem';
import './Cart.scss';
import CustomButton from '@/library/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts } from '@/services/features/cartSlice';
import { BsTruck } from "react-icons/bs";
import { FaMinus, FaPlus, FaStore } from 'react-icons/fa';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import ProductCard from '@/components/cards/productcard/ProductCard';
import { ProductImg } from '../../../../public/images';
import { MdRemoveShoppingCart } from 'react-icons/md';

const products = [
    {
        id: 1,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 2,
        title: 'CDA Wafer Graduation Cap 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 3,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 4,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 5,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 6,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    // {
    //     id: 7,
    //     title: 'CDA Wafer Happy New Year 1x12 Pcs',
    //     price: 'AED 20',
    //     previous_price: 'AED 22',
    //     rating: '4.5',
    // },
    // {
    //     id: 8,
    //     title: 'CDA Wafer Happy New Year 1x12 Pcs',
    //     price: 'AED 20',
    //     previous_price: 'AED 22',
    //     rating: '4.5',
    // },

]

const Cart = () => {

    const dispatch = useDispatch();
    const { cartProducts, productQuantityUpdated, productRemovedFromCart } = useSelector((state) => state.cart)

    // States
    const [selected, setSelected] = useState('shipping');
    const recommendedProdRef = React.useRef();

    useEffect(() => {
        dispatch(getCartProducts({}));
    }, [productQuantityUpdated, productRemovedFromCart])

    const handleNav = (ref, direction) => {
        if (ref === "recommendedProdRef") {
            if (direction === 'left') {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
            } else {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
            }
        }
    }

    return (
        <div className='cart-container'>
            <div className='cart-wrapper'>
                <div className="cart">
                    <div className="title">
                        <CustomTypography content="Cart " color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                    </div>

                    {
                        cartProducts?.result?.products?.length > 0 ?
                            <>
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
                                        cartProducts?.result?.products?.map((item, index) => {
                                            return (
                                                <CartItem key={index} data={item} />
                                            )
                                        })
                                    }
                                </div>
                            </>
                            :
                            <div className='empty-cart flex flex-col items-center justify-center'>
                                <MdRemoveShoppingCart color='#279540' size={80} />
                                <CustomTypography content='Your cart is empty' color='BLACK' size='MEDIUM' weight='SEMI-BOLD' />
                            </div>
                    }

                </div>

                {
                    cartProducts?.result?.products?.length > 0 ?
                        <div className='carttotal-wrapper'>
                            <div className="carttotal">
                                <div className="item">
                                    <CustomTypography content={`Subtotal ${cartProducts?.result?.totals?.totalProductCount} items`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                    <CustomTypography content={"AED " + cartProducts?.result?.totals?.subTotal} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                </div>

                                <div className="item">
                                    <CustomTypography content="Discount" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                    <CustomTypography content={"-AED " + cartProducts?.result?.totals?.totalDiscount} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                </div>

                                <div className="item">
                                    <CustomTypography content="Shipping" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                    <CustomTypography content={"AED " + cartProducts?.result?.totals?.shippingCharge} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                </div>

                              

                                {/* <div className="item">
                        <CustomTypography content="Coupon  #FIRSTHI15 " color="BLACK" size="MEDIUM" weight="REGULAR" />
                        <CustomTypography content="-AED 20" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                    </div>
                    <div className="item">
                        <CustomTypography content="Reward Points 2000" color="BLACK" size="MEDIUM" weight="REGULAR" />
                        <CustomTypography content="-AED 20" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                </div> */}

                                <div className="item">
                                    <CustomTypography content="VAT 5%" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                    <CustomTypography content={"AED " + cartProducts?.result?.totals?.totalProductVAT} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                </div>
                                <div className="item">
                                    <CustomTypography content="Grand Total (Including VAT)" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                    <CustomTypography content={"AED " + cartProducts?.result?.totals?.grandTotal} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                </div>

                                <div className="btn">
                                    <CustomButton fullWidth label='Proceed to Checkout' variant='primary' />
                                </div>

                            </div>


                            <div className="cartcoupon">
                                <div className="item">
                                    <div className="giftcard-input">
                                        <input type="text" placeholder='Gift Card Code' />
                                    </div>
                                    <button className="applybtn">
                                        <CustomTypography content="Apply" color="WHITE" size="MEDIUM" weight="MEDIUM" />
                                    </button>
                                </div>

                                <div className="item">
                                    <CustomTypography content="Coupons" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                </div>

                                <div className="item">
                                    <div className='flex gap-4'>
                                        <CustomTypography content="#FIRSTHI15 " color="BLACK" size="MEDIUM" weight="REGULAR" />
                                        <CustomTypography content="Applied" color="gray-light" size="MEDIUM" weight="REGULAR" />
                                    </div>
                                    <button className='txtbtn'>
                                        Remove
                                    </button>
                                </div>
                                <div className="item">
                                    <div className='flex gap-4'>
                                        <CustomTypography content="#GIFT20 " color="BLACK" size="MEDIUM" weight="REGULAR" />
                                        {/* <CustomTypography content="Applied" color="gray-light" size="MEDIUM" weight="REGULAR" /> */}
                                    </div>
                                    <button className='txtbtn'>
                                        Apply
                                    </button>
                                </div>
                                <div className="item">
                                    <div className='flex gap-4'>
                                        <CustomTypography content="#REFUND20 " color="BLACK" size="MEDIUM" weight="REGULAR" />
                                        {/* <CustomTypography content="Applied" color="gray-light" size="MEDIUM" weight="REGULAR" /> */}
                                    </div>
                                    <button className='txtbtn'>
                                        Apply
                                    </button>
                                </div>


                                <div className="item">
                                    <CustomTypography content="Reward Points (2057)" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                </div>
                                <div className="item">
                                    <div className='flex gap-1 items-center'>
                                        <div className='rwd-btn'>
                                            <FaMinus color='#32893b' stroke-width="0.5" />
                                        </div>
                                        <input className='rwd-input' value={0} type="text" />
                                        <div className='rwd-btn mr-3'>
                                            <FaPlus color='#32893b' />
                                        </div>
                                        <CustomTypography content="(-20AED)" color="gray-light" size="MEDIUM" weight="REGULAR" />
                                    </div>

                                    <button className='txtbtn'>
                                        Apply
                                    </button>
                                </div>

                            </div>


                        </div>
                        :
                        <></>
                }
            </div>
            <div className="itemcard-wrapper">
                <div className="header">
                    <CustomTypography content="Products Saved for later" weight="SEMI-BOLD" color="BLACK" size="LARGE" />

                    <div className="scrollbuttons">
                        <CustomIconButton variant={'secondary'}
                            iconColor={'#32893B'} icon={"ArrowLeft"}
                            onClick={() => handleNav('recommendedProdRef', 'left')}
                        />
                        <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                            backgroundColor={'#32893B'} icon={"ArrowRight"}
                            onClick={() => handleNav('recommendedProdRef', 'right')}
                        />
                    </div>

                </div>
                <div className="items" ref={recommendedProdRef}>
                    {
                        products.map(product => (
                            <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>
            <div className="itemcard-wrapper">
                <div className="header">
                    <CustomTypography content="Add products from your wishlist" weight="SEMI-BOLD" color="BLACK" size="LARGE" />

                    <div className="scrollbuttons">
                        <CustomIconButton variant={'secondary'}
                            iconColor={'#32893B'} icon={"ArrowLeft"}
                            onClick={() => handleNav('recommendedProdRef', 'left')}
                        />
                        <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                            backgroundColor={'#32893B'} icon={"ArrowRight"}
                            onClick={() => handleNav('recommendedProdRef', 'right')}
                        />
                    </div>

                </div>
                <div className="items" ref={recommendedProdRef}>
                    {
                        products.map(product => (
                            <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>
            <div className="itemcard-wrapper">
                <div className="header">
                    <CustomTypography content="Recommended Products with your order" weight="SEMI-BOLD" color="BLACK" size="LARGE" />

                    <div className="scrollbuttons">
                        <CustomIconButton variant={'secondary'}
                            iconColor={'#32893B'} icon={"ArrowLeft"}
                            onClick={() => handleNav('recommendedProdRef', 'left')}
                        />
                        <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                            backgroundColor={'#32893B'} icon={"ArrowRight"}
                            onClick={() => handleNav('recommendedProdRef', 'right')}
                        />
                    </div>

                </div>
                <div className="items" ref={recommendedProdRef}>
                    {
                        products.map(product => (
                            <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Cart