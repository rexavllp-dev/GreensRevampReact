'use client'
import React, { useEffect, useState } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import CustomButton from '@/library/buttons/CustomButton';
import GoogleMap from '@/components/maps/GoogleMap';
import { useDispatch, useSelector } from 'react-redux';
import { BsTruck } from "react-icons/bs";
import { FaMinus, FaPlus, FaStore } from 'react-icons/fa';
import './Checkout.scss';
import ShippingAddressStep from './steps/ShippingAddressStep';
import OrderConfirmationStep from './steps/OrderConfirmationStep';
import PaymentMethodStep from './steps/PaymentMethodStep';
import { Divider, Tooltip } from '@nextui-org/react';
import { getCartProducts, updateCartFlags } from '@/services/features/cartSlice';
import { getStripeUrl } from '@/services/features/paymentSlice';
import InfoIcon from '@/components/customicons/InfoIcon';
import { toast } from 'react-toastify';
import DeliveryInstructions from './steps/DeliveryInstructions';
import { createOrder } from '@/services/features/orderSlice';
import { getAddressByUser } from '@/services/features/userSlice';

const Checkout = () => {

    const dispatch = useDispatch();

    const { cartProducts, productQuantityUpdated, productRemovedFromCart, isCartFlagsUpdated } = useSelector((state) => state.cart)
    // const [showNewAddressForm, setShowNewAddressForm] = React.useState(false)
    const [orderItems, setOrderItems] = React.useState([]);

    const { stripeUrl } = useSelector((state) => state.payment)
    const { userAddress } = useSelector((state) => state.users)

    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = React.useState({
        address_title: "",
        customer_name: "",
        customer_email: "",
        customer_phone_country_code: "",
        customer_phone: "",
        flat_villa: "",
        zip_code: "",
        delivery_remark: "",
        is_new_address: false,
        payment_method: "",
        shipping_method: "Shipping",
        contactless_delivery: "",

        address_line_1: "",
        address_line_2: "",
        country_code: "",
        place: "",
        latitude: "",
        longitude: "",
        orderItems: [
            {
                product_id: 1,
                op_actual_price: '',
                op_unit_price: '',
                op_qty: '',
            }
        ]
    })

    const makePayment = () => {

        const data = { order_id: '100' };
        dispatch(getStripeUrl({ data }));
    }


    useEffect(() => {

        if (stripeUrl) {
            window.open(stripeUrl.url, '_self');
        }

    }, [stripeUrl])



    const steps = [
        {
            title: 'Shipping Info', component: <ShippingAddressStep userAddress={userAddress} formData={formData} setFormData={setFormData}
                // showNewAddressForm={showNewAddressForm} setShowNewAddressForm={setShowNewAddressForm}
                onSubmit={() => { setCurrentStep(2) }} />
        },
        {
            title: 'Order Confirmation', component: <OrderConfirmationStep formData={formData} setFormData={setFormData}
                cartProducts={cartProducts}
                onSubmit={() => { setCurrentStep(3) }} />
        },
        {
            title: 'Payment Method', component: <PaymentMethodStep formData={formData} setFormData={setFormData}
                onSubmit={() => { setCurrentStep(4) }} />
        },
        {
            title: 'Delivery Instructions', component: <DeliveryInstructions formData={formData} setFormData={setFormData}
                onSubmit={() => { handleCreateOrder() }} />
        }
    ];


    useEffect(() => {
        dispatch(getCartProducts({}));
    }, [productQuantityUpdated, productRemovedFromCart, isCartFlagsUpdated])

    useEffect(() => {
        dispatch(getAddressByUser({}));
    }, [])


    useEffect(() => {
        dispatch(updateCartFlags({
            data: {
                isStorePickup: (formData?.shipping_method === "Store Pickup") ? true : false,
                isCod: (formData?.payment_method === "Cash on Delivery") ? true : false
            }
        })).then((res) => {
            if (res.payload.success) {

            } else {

            }
        }).catch((err) => {
            console.log(err)
        })
    }, [formData?.shipping_method, formData?.payment_method])



    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleCreateOrder = () => {
        let orderItems = cartProducts?.result?.products?.map((item) => {
            return { product_id: item.productId }
        })

        const data = {
            address_title: formData?.address_title,
            customer_name: formData?.customer_name,
            customer_email: formData?.customer_email,
            customer_phone_country_code: formData?.customer_phone_country_code,
            customer_phone: formData?.customer_phone,
            flat_villa: formData?.flat_villa,
            zip_code: formData?.zip_code,
            delivery_remark: formData?.delivery_remark,
            is_new_address: formData?.is_new_address,
            payment_method: formData?.payment_method,
            shipping_method: formData?.shipping_method,
            contactless_delivery: formData?.contactless_delivery,

            address_line_1: formData?.address_line_1,
            address_line_2: formData?.address_line_2,
            country_code: formData?.country_code,
            place: formData?.place,
            latitude: formData?.latitude,
            longitude: formData?.longitude,

            orderItems: orderItems
        }
        dispatch(createOrder({ data: data })).then((res) => {
            if (res.payload.success) {
                toast.success(res.payload.message)
                let orderId = res.payload?.result[0]?.id;
                const data = { order_id: orderId };
                dispatch(getStripeUrl({ data }));
            } else {
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    return (
        <div className='checkout-wrapper'>
            <div className="checkout">
                <div className="checkoutsteps">

                    {/* {renderStep()} */}

                    {/* <div> */}
                    {steps.map((step, index) => (
                        <>
                            <div className="title" key={index} onClick={() => setCurrentStep(index + 1)}>
                                <CustomTypography content={index + 1 + '.' + step.title}
                                    color={index === (currentStep - 1) ? "BLACK" : "GRAY-LIGHT"}
                                    size="LARGE" weight="SEMI-BOLD"
                                />
                            </div>
                            {
                                index !== (currentStep - 1) &&
                                <Divider className='mt-4 mb-4' />
                            }
                            {index < steps.length - 1 && <div className="divider"></div>}
                            {
                                (index === (currentStep - 1)) && (
                                    <>
                                        {steps[index].component}
                                    </>
                                )
                            }
                        </>
                    ))}
                    {/* </div> */}
                </div>

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


                    <div className="item">
                        <div className="flex items-center gap-2">
                            <CustomTypography content="Shipping" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                            <Tooltip
                                content={"If product price is less than AED 100, shipping charge is AED 30. Otherwise shipping is free(* T&C apply)."}
                            // placement='right-end'

                            // classNames={{
                            //     base: [
                            //         // arrow color
                            //         "before:bg-neutral-400 dark:before:bg-white",
                            //     ],
                            //     content: [
                            //         "py-2 px-4 shadow-xl",
                            //         "text-black bg-gradient-to-br from-white to-neutral-400",
                            //     ],
                            // }}
                            >
                                <div className="infoicon">
                                    <InfoIcon />
                                </div>
                            </Tooltip>
                        </div>
                        {
                            parseInt(cartProducts?.result?.totals?.shippingCharge) == 0 ?
                                <div className='flex items-center gap-2'>
                                    <CustomTypography content="30" color="GRAY" size="MEDIUM" weight="MEDIUM" style={{ textDecoration: 'line-through' }} />
                                    <CustomTypography content="Free" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                                </div>
                                :
                                <CustomTypography content={"AED " + cartProducts?.result?.totals?.shippingCharge} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                        }
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

                </div>

            </div>
        </div>
    )
}

export default Checkout