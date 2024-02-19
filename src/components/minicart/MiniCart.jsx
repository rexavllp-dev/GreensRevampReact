"use client"
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect } from 'react'

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import "./MiniCart.scss";
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts } from '@/services/features/cartSlice'
import MiniCartItem from '../cards/minicartitem/MiniCartItem'
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import CustomButton from '@/library/buttons/CustomButton'
import { useRouter } from 'next/navigation'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { IoMdClose } from 'react-icons/io'

const MiniCart = ({ isOpen, setIsOpen, toggleDrawer }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { cartProducts, productQuantityUpdated, productRemovedFromCart } = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(getCartProducts({}));
    }, [productQuantityUpdated, productRemovedFromCart]);



    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
                size={330}
                enableOverlay={true}
                overlayOpacity={0}
                zIndex={3000}
            >
                <div className='minicart h-full'>
                    <Card className="h-full " radius='none'>
                        <CardHeader className="flex justify-between items-center" 
                        // style={{background:'#32893b'}}
                        >
                            <div className="minicart-title">
                                <CustomTypography content='Shopping Cart' size='SUPER-LARGE' weight='SEMI-BOLD' />
                            </div>
                            <div className="minicart-close" onClick={() => setIsOpen(false)}>
                                <IoMdClose size={24}
                                //  color='#FFFFFF' 
                                 />
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className="h-full">
                            {
                                cartProducts?.result?.products?.length > 0 ?
                                    <div className="cartitems h-full">
                                        {
                                            cartProducts?.result?.products?.map((item, index) => {
                                                return (
                                                    <MiniCartItem key={index} data={item} />
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className='h-full flex flex-col items-center justify-center'>
                                        <MdRemoveShoppingCart color='#279540' size={80} />
                                        <CustomTypography content='Your cart is empty' color='BLACK' size='MEDIUM' weight='SEMI-BOLD' />
                                    </div>
                            }


                            {
                                cartProducts?.result?.products?.length > 0 &&
                                <>
                                    <Divider />
                                    <div className='flex flex-col gap-3 mt-3'>
                                        <div className='flex justify-between w-full'>
                                            <CustomTypography content="Subtotal" color="BLACK" size="SMALL" weight="SEMI-BOLD" />
                                            <CustomTypography content={"AED " + cartProducts?.result?.totals?.subTotal} color="GREY" size="SMALL" weight="SEMI-BOLD" />
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <CustomTypography content="Discount" color="BLACK" size="SMALL" weight="SEMI-BOLD" />
                                            <CustomTypography content={"- AED " + cartProducts?.result?.totals?.totalDiscount} color="GREY" size="SMALL" weight="SEMI-BOLD" />
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <CustomTypography content="Shipping" color="BLACK" size="SMALL" weight="SEMI-BOLD" />
                                            <CustomTypography content={"AED " + cartProducts?.result?.totals?.shippingCharge} color="GREY" size="SMALL" weight="SEMI-BOLD" />
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <CustomTypography content="VAT 5%" color="BLACK" size="SMALL" weight="SEMI-BOLD" />
                                            <CustomTypography content={"AED " + cartProducts?.result?.totals?.totalProductVAT} color="GREY" size="SMALL" weight="SEMI-BOLD" />
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <CustomTypography content="Grand Total (Including VAT)" color="BLACK" size="REGULAR" weight="SEMI-BOLD" />
                                            <CustomTypography content={"AED " + cartProducts?.result?.totals?.grandTotal} color="GREY" size="REGULAR" weight="SEMI-BOLD" />
                                        </div>
                                    </div>
                                </>
                            }

                        </CardBody>
                        <Divider />
                        {
                            cartProducts?.result?.products?.length > 0 &&
                            <CardFooter className='flex flex-col gap-3 w '>
                                <div className="flex justify-between  w-full" style={{ marginBottom: "25px" }}>
                                    <CustomButton label='View Cart' fullWidth variant='transparent' onClick={() => {
                                        router.push('/cart')
                                        toggleDrawer()
                                    }} />
                                    {/* <CustomButton label='Checkout' onClick={toggleDrawer} variant='transparent' /> */}
                                </div>
                            </CardFooter>

                        }
                    </Card>

                </div>
            </Drawer>
        </>
    )
}

export default MiniCart