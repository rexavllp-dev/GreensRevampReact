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

const MiniCart = ({ isOpen, setIsOpen, toggleDrawer }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { cartProducts, productQuantityUpdated, productRemovedFromCart } = useSelector((state) => state.cart)



    useEffect(() => {
        dispatch(getCartProducts({}));
    }, [productQuantityUpdated, productRemovedFromCart])



    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
                size={300}
                enableOverlay={false}
            >
                <div className='minicart h-full'>
                    <Card className="h-full">
                        <CardHeader className="flex gap-3">
                            <div className="minicart-title">
                                <CustomTypography content='Shopping Cart' color='BLACK' size='LARGE' weight='SEMI-BOLD' />
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className="h-full">

                            <div className="cartitems h-full">
                                {
                                    cartProducts?.result?.products?.map((item, index) => {
                                        return (
                                            <MiniCartItem key={index} data={item} />
                                        )
                                    })
                                }
                            </div>
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex justify-between">
                            <CustomButton label='View Cart' variant='primary' onClick={() => {
                                router.push('/cart')
                                toggleDrawer()
                            }} />
                            <CustomButton label='Checkout' onClick={toggleDrawer} variant='transparent' />
                        </CardFooter>
                    </Card>

                </div>
            </Drawer>
        </>
    )
}

export default MiniCart