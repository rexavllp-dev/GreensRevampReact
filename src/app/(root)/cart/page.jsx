'use client'
import React, { useEffect, useState } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import CartItem from '@/components/cards/cartitem/CartItem';
import './Cart.scss';
import CustomButton from '@/library/buttons/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getCartProducts, updateCartFlags } from '@/services/features/cartSlice';
import { BsTruck } from "react-icons/bs";
import { FaMinus, FaPlus, FaStore } from 'react-icons/fa';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import ProductCard from '@/components/cards/productcard/ProductCard';
import { ProductImg } from '../../../../public/images';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { getSaveForLater, removeSaveForLaterProduct } from '@/services/features/productSlice';
import { Tooltip } from '@nextui-org/react';
import InfoIcon from '@/components/customicons/InfoIcon';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getWishlist } from '@/services/features/wishlistSlice';

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
    const router = useRouter();
    const recommendedProdRef = React.useRef();
    const { cartProducts, productQuantityUpdated, productRemovedFromCart, isCartFlagsUpdated } = useSelector((state) => state.cart)
    const { saveForLater, isSaveForLaterCreated, isSaveForLaterRemoved } = useSelector((state) => state.products)
    const { isWishlistRemoved, isProductAddedToWishlist, wishlistProducts } = useSelector((state) => state.wishlist)

    // States
    const [selected, setSelected] = useState('shipping');

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')
    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

    useEffect(() => {
        dispatch(getWishlist({}));
    }, [isWishlistRemoved, isProductAddedToWishlist])

    useEffect(() => {
        dispatch(getCartProducts({}));
    }, [productQuantityUpdated, productRemovedFromCart, isCartFlagsUpdated])

    useEffect(() => {
        dispatch(getSaveForLater({}));
    }, [isSaveForLaterCreated, isSaveForLaterRemoved, isWishlistRemoved, isProductAddedToWishlist])


    // useEffect(() => {

    //     dispatch(updateCartFlags({
    //         data: {
    //             isStorePickup: (formData?.shipping_method === "Store Pickup") ? true : false,
    //         }
    //     })).then((res) => {
    //         if (res.payload.success) {

    //         } else {

    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     })

    // }, [formData?.shipping_method])


    useEffect(() => {

        if (cartProducts?.result?.isStorePickup) {
            setSelected('storePickup');
        } else {
            setSelected('shipping');
        }

    }, [cartProducts?.result?.isStorePickup])

    const handleChangeSelected = (value) => {
        setSelected(value)
        dispatch(updateCartFlags({
            data: {
                isStorePickup: (value === 'storePickup') ? true : false,
            }
        })).then((res) => {
            if (res.payload.success) {

            } else {

            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleNav = (ref, direction) => {
        if (ref === "recommendedProdRef") {
            if (direction === 'left') {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
            } else {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
            }
        }
    }

    const handleCheckout = () => {
        if (isLoggedIn) {
            if (cartProducts?.result?.isStorePickup) {
                router.push('/checkout?m=storePickup')
            } else {
                router.push('/checkout?m=shipping')
            }
        } else {
            router.push('/auth/login')
        }
    }

    const handleRemoveSaveForLater = (id) => {
        dispatch(removeSaveForLaterProduct({ id })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch(err => console.log(err));
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
                                            onClick={() => {
                                                handleChangeSelected('shipping');
                                            }}
                                            className={selected === 'shipping' ? "cursor-pointer tab tab-active" : "cursor-pointer tab"}
                                        >
                                            <CustomTypography weight='MEDIUM' content="Shipping (Available) " color={selected === 'shipping' ? "BLACK" : "GRAY-LIGHT"} size="MEDIUM" />
                                            <BsTruck color={selected === 'shipping' ? "BLACK" : "#808080"} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                handleChangeSelected('storePickup');
                                            }}
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
                                                <CustomTypography weight='REGULAR' content="Pickup charge of AED 10 on orders below AED 50." color="BLACK" size="MEDIUM" />
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

                                {
                                    parseFloat(cartProducts?.result?.totals?.totalDiscount) > 0 &&
                                    <div className="item">
                                        <CustomTypography content="Discount" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                        <CustomTypography content={"-AED " + cartProducts?.result?.totals?.totalDiscount} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                    </div>
                                }

                                {/* <div className="flex items-center gap-2">
                                        <CustomTypography content="Shipping" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                        <Tooltip
                                            content={"If product price is less than AED 100, shipping charge is AED 30. Otherwise shipping is free(* T&C apply)."}
                                            placement='right-end'

                                            classNames={{
                                                base: [
                                                    // arrow color
                                                    "before:bg-neutral-400 dark:before:bg-white",
                                                ],
                                                content: [
                                                    "py-2 px-4 shadow-xl",
                                                    "text-black bg-gradient-to-br from-white to-neutral-400",
                                                ],
                                            }}
                                        >
                                            <div className="infoicon">
                                                <InfoIcon />
                                            </div>
                                        </Tooltip>
                                    </div> */}
                                {/* {
                                        parseInt(cartProducts?.result?.totals?.shippingCharge) == 0 ?
                                            <div className='flex items-center gap-2'>
                                                <CustomTypography content="30" color="GRAY" size="MEDIUM" weight="MEDIUM" style={{ textDecoration: 'line-through' }} />
                                                <CustomTypography content="Free" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                            </div>
                                            :
                                            <CustomTypography content={"AED " + cartProducts?.result?.totals?.shippingCharge} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                    } */}


                                {
                                    selected === "storePickup" ?
                                        <div className="item">
                                            <div className="flex items-center gap-2">
                                                <CustomTypography content="Store Pickup" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                                <Tooltip
                                                    content={"If product price is less than AED 50, store pickup charge is AED 10. Otherwise store pickup is free(* T&C apply)."}
                                                >
                                                    <div className="infoicon">
                                                        <InfoIcon />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            {
                                                parseInt(cartProducts?.result?.totals?.storePickupCharge) == 0 ?
                                                    <div className='flex items-center gap-2'>
                                                        <CustomTypography content="AED 10" color="GRAY" size="MEDIUM" weight="MEDIUM" style={{ textDecoration: 'line-through' }} />
                                                        <CustomTypography content="Free" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                                    </div>
                                                    :
                                                    <CustomTypography content={"AED " + cartProducts?.result?.totals?.storePickupCharge} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                            }
                                        </div>
                                        :
                                        <div className="item">
                                            <div className="flex items-center gap-2">
                                                <CustomTypography content="Shipping" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                                <Tooltip
                                                    content={"If product price is less than AED 100, shipping charge is AED 30. Otherwise shipping is free(* T&C apply)."}
                                                >
                                                    <div className="infoicon">
                                                        <InfoIcon />
                                                    </div>
                                                </Tooltip>
                                            </div>
                                            {
                                                parseInt(cartProducts?.result?.totals?.shippingCharge) == 0 ?
                                                    <div className='flex items-center gap-2'>
                                                        <CustomTypography content="AED 30" color="GRAY" size="MEDIUM" weight="MEDIUM" style={{ textDecoration: 'line-through' }} />
                                                        <CustomTypography content="Free" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                                    </div>
                                                    :
                                                    <CustomTypography content={"AED " + cartProducts?.result?.totals?.shippingCharge} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                            }
                                        </div>
                                }



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

                                    <Link href={isLoggedIn ? (cartProducts?.result?.isStorePickup ? '/checkout?m=storePickup' : '/checkout?m=shipping') : '/auth/login'}>
                                        <CustomButton fullWidth label='Proceed to Checkout' variant='primary' />
                                    </Link>
                                </div>

                            </div>


                            <div className="cartcoupon">
                                <div className="item">
                                    <div className="giftcard-input">
                                        <input type="text" placeholder='Gift Card Code/ Coupon Code' />
                                    </div>
                                    <button className="applybtn">
                                        <CustomTypography content="Apply" color="WHITE" size="MEDIUM" weight="MEDIUM" />
                                    </button>
                                </div>
                            </div>


                        </div>
                        :
                        <></>
                }
            </div>
            {
                (saveForLater?.result?.savedProducts?.length > 0) &&
                <div className="itemcard-wrapper">
                    <div className="header ">
                        <div className="flex gap-2">
                            <CustomTypography content="Products Saved for later" weight="SEMI-BOLD" color="BLACK" size="LARGE" />
                            {
                                saveForLater?.saveForLaterCount ?
                                    <CustomTypography content={`(${saveForLater?.saveForLaterCount})`} color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                                    : null
                            }
                        </div>

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
                            saveForLater?.result?.savedProducts?.map(product => (
                                // <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                //     previous_price={product.previous_price} rating={product.rating} img={ProductImg} />

                                <ProductCard id={product.product_id} key={product.product_id} title={product.prd_name}
                                    specialPrice={product?.prdPrice[0]?.specialPrice}
                                    normalPrice={product?.prdPrice[0]?.price}
                                    rating={product.rating}
                                    data={product}
                                    isSaveForLater={true}
                                    haveRemoveBtn={true}
                                    handleRemove={() => handleRemoveSaveForLater(product?.save_for_later_id)}
                                    img={(product?.product_img?.find((img) => img.is_baseimage === true)) ?
                                        (product?.product_img?.find((img) => img.is_baseimage === true)?.url) :
                                        'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
                                    }
                                />
                            ))
                        }
                    </div>
                </div>
            }

            {
                wishlistProducts?.result?.allWishlist?.length ?
                    <div className="itemcard-wrapper">
                        <div className="header">
                            <div className="flex gap-2">
                                <CustomTypography content="Add products from your wishlist" weight="SEMI-BOLD" color="BLACK" size="LARGE" />
                                {
                                    wishlistProducts?.wishlistCount ?
                                        <CustomTypography content={`(${wishlistProducts?.wishlistCount})`} color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                                        : null
                                }
                            </div>

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
                                wishlistProducts?.result?.allWishlist?.map(product => (
                                    <ProductCard id={product.product_id} key={product.product_id} title={product.prd_name}
                                        specialPrice={product?.prdPrice[0]?.specialPrice}
                                        normalPrice={product?.prdPrice[0]?.price}
                                        rating={product.rating}
                                        wishlistLabel={'wishlistId'}
                                        data={product}
                                        img={(product?.product_img?.find((img) => img.is_baseimage === true)) ?
                                            (product?.product_img?.find((img) => img.is_baseimage === true)?.url) :
                                            'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
                                        }
                                    />
                                ))
                            }
                        </div>
                    </div>
                    :
                    <></>
            }
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