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
import { getCartProducts } from '@/services/features/cartSlice';
import InfoIcon from '@/components/customicons/InfoIcon';

const Checkout = () => {

    const dispatch = useDispatch();

    const { cartProducts, productQuantityUpdated, productRemovedFromCart } = useSelector((state) => state.cart)

    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = React.useState({
        customer_name: "",
        customer_email: "",
        customer_phone_country_code: "",
        customer_phone: "",
        address_line: "",
        flat_villa: "",
        zip_code: "",
        note: "",
        payment_method: "",
        shipping_method: "Shipping",
        contactless_delivery: ""
    })

    const steps = [
        {
            title: 'Shipping Info', component: <ShippingAddressStep formData={formData} setFormData={setFormData}
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
        }
    ];


    useEffect(() => {
        dispatch(getCartProducts({}));
    }, [productQuantityUpdated, productRemovedFromCart])

    


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