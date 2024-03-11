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
import { Divider, Tooltip, useDisclosure } from '@nextui-org/react';
import { getCartProducts, updateCartFlags } from '@/services/features/cartSlice';
import { getStripeUrl } from '@/services/features/paymentSlice';
import InfoIcon from '@/components/customicons/InfoIcon';
import { toast } from 'react-toastify';
import DeliveryInstructions from './steps/DeliveryInstructions';
import { createOrder } from '@/services/features/orderSlice';
import { getAddressByUser } from '@/services/features/userSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { isEmailValid } from '@/utils/helpers/IsEmailValid';

const Checkout = () => {

    const dispatch = useDispatch();
    const router = useRouter();


    const { cartProducts, productQuantityUpdated, productRemovedFromCart, isCartFlagsUpdated } = useSelector((state) => state.cart)
    // const [showNewAddressForm, setShowNewAddressForm] = React.useState(false)
    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')
    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")
    // const [orderItems, setOrderItems] = React.useState([]);
    const searchParams = useSearchParams();
    const shippingMethod = searchParams.get('m');

    const { stripeUrl } = useSelector((state) => state.payment)
    const { userAddress, isUserAddressCreated, isUserAddressUpdated } = useSelector((state) => state.users)

    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = React.useState({
        address_id: "",
        address_title: "",
        customer_name: "",
        customer_email: "",
        customer_phone_country_code: "",
        customer_phone: "",
        flat_villa: "",
        zip_code: "",
        delivery_remark: "",
        is_new_address: false,
        payment_method: "Credit Card/ Debit Card",
        shipping_method: "Shipping",
        contactless_delivery: "",

        address_line_1: "",
        address_line_2: "",
        country_code: "",
        place: "",
        latitude: "",
        longitude: "",
        orderItems: []
    });

    const [errors, setErrors] = React.useState({
        address_title: {
            error: false,
            message: ''
        },
        customer_name: {
            error: false,
            message: ''
        },
        customer_email: {
            error: false,
            message: ''
        },
        customer_phone: {
            error: false,
            message: ''
        },
        address_line_1: {
            error: false,
            message: ''
        },
        address_line_2: {
            error: false,
            message: ''
        },
        zip_code: {
            error: false,
            message: ''
        },
    })



    const validateForm = () => {
        let isValid = true;

        // Validate first name
        if (!formData.customer_name?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                customer_name: { error: true, message: 'Customer name is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                customer_name: { error: false, message: '' }
            }));
        }
        // Validate address line 1
        if (!formData.address_title?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address_title: { error: true, message: 'Address Title is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address_title: { error: false, message: '' }
            }));
        }
        // Validate address line 1
        if (!formData.address_line_1?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address_line_1: { error: true, message: 'Address line 1 is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address_line_1: { error: false, message: '' }
            }));
        }
        // Validate address line 2
        if (!formData.address_line_2?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address_line_2: { error: true, message: 'Address line 2 is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                address_line_2: { error: false, message: '' }
            }));
        }

        // Validate mobile
        if (!formData.customer_phone?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                customer_phone: { error: true, message: 'Mobile number is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                customer_phone: { error: false, message: '' }
            }));
        }

        // Validate zipcode
        if (!formData.zip_code?.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                zip_code: { error: true, message: 'Zip code is required' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                zip_code: { error: false, message: '' }
            }));
        }

        // Validate email
        if (!isEmailValid(formData.customer_email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                customer_email: { error: true, message: 'Enter a valid email address' }
            }));
            isValid = false;
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                customer_email: { error: false, message: '' }
            }));
        }

        return isValid;
    };

    const steps = [
        {
            title: 'Shipping Info', component: <ShippingAddressStep
                errors={errors} setErrors={setErrors}
                userAddress={userAddress}
                formData={formData} setFormData={setFormData}
                // showNewAddressForm={showNewAddressForm} setShowNewAddressForm={setShowNewAddressForm}
                onSubmit={() => {
                    handleCompleteShippingStep();
                }}
            />
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
        //If user is not logged in then redirect to login
        if (!isLoggedIn) {
            router.push('/auth/login');
        }
    }, [isLoggedIn])

    const handleCompleteShippingStep = () => {
        if (formData?.is_new_address) {
            if (validateForm()) {
                setCurrentStep(2);
            } else {
                toast.error("Please fill all required fields");
            }
        } else {
            if (!formData?.address_id) {
                toast.error("Please select address");
            } else {
                setCurrentStep(2);
            }
        }
        // if (formData?.is_new_address) {
        //     if (!formData?.address_title) {
        //         toast.error("Please enter address title")
        //         return
        //     }
        //     if (!formData?.customer_name) {
        //         toast.error("Please enter customer name")
        //         return
        //     }
        //     if (!formData?.customer_email) {
        //         toast.error("Please enter customer email")
        //         return
        //     }
        //     if (!formData?.customer_phone) {
        //         toast.error("Please enter customer phone")
        //         return
        //     }
        //     if (!formData?.address_line_1) {
        //         toast.error("Please enter address line 1")
        //         return
        //     }
        //     if (!formData?.address_line_2) {
        //         toast.error("Please enter address line 2")
        //     }
        //     if (!formData?.zip_code) {
        //         toast.error("Please enter zip code")
        //     }
        //     setCurrentStep(2);
        // } else {
        //     if (!formData?.address_id) {
        //         toast.error("Please select address")
        //         return
        //     }
        //     setCurrentStep(2);
        // }
    }


    useEffect(() => {
        console.log(formData)
    }, [formData])

    useEffect(() => {
        dispatch(getCartProducts({}))?.then((res) => {
            if (res.payload.success) {
                if (!res.payload?.result?.products?.length) {
                    router.push('/cart');
                }
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [productQuantityUpdated, productRemovedFromCart, isCartFlagsUpdated])

    useEffect(() => {
        dispatch(getAddressByUser({}));
    }, [isUserAddressCreated, isUserAddressUpdated])

    useEffect(() => {
        if (userAddress?.result) {
            setFormData((prev) => ({
                ...prev,
                address_id: userAddress?.result[0]?.id
            }))
        }
    }, [userAddress])


    useEffect(() => {
        if (shippingMethod === "storePickup") {
            setFormData((prev) => ({
                ...prev,
                shipping_method: "Store Pickup",
                payment_method: "Credit Card/ Debit Card"
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                shipping_method: "Shipping"
            }))
        }

    }, [shippingMethod])


    useEffect(() => {

        if (stripeUrl) {
            window.open(stripeUrl.url, '_self');
        }

    }, [stripeUrl])

    const handleCreateOrder = () => {
        let orderItems = cartProducts?.result?.products?.map((item) => {
            return {
                product_id: item.productId,
                op_actual_price: item.priceVat,
                op_unit_price: item.priceVat,
                op_qty: item.quantity,
                op_line_total: item.totalPriceWithVat
            }
        })

        const data = {
            address_id: formData?.address_id,
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
                // toast.success(res.payload.message)
                let orderId = res.payload?.result[0]?.id;
                const data = { order_id: orderId };
                if (formData?.payment_method === "Cash on Delivery") {
                    router.push("/checkout/success/?od=" + orderId);
                } else {
                    dispatch(getStripeUrl({ data }));
                }
            } else {
                toast.error(res.payload.message);
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
                    {steps.map((step, index) => {
                        if (currentStep === 3 && (formData?.shipping_method === "Store Pickup")) {
                            return <></>
                        } else {
                            return (
                                <>
                                    <div className="title" key={index} onClick={() => currentStep > (index + 1) && setCurrentStep(index + 1)}>
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
                                                {/* if store pickup is selected delivery instructions step removed */}
                                                {steps[index].component}
                                            </>
                                        )
                                    }
                                </>
                            )
                        }

                    }
                    )}
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

                    {
                        formData?.shipping_method === "Store Pickup" ?
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


                    {
                        formData?.payment_method === "Cash on Delivery" &&
                        <div className="item">
                            <div className="flex items-center gap-2">
                                <CustomTypography content="Cash on Delivery" color="BLACK" size="MEDIUM" weight="MEDIUM" />
                            </div>
                            <CustomTypography content={"AED " + cartProducts?.result?.totals?.codCharge} color="BLACK" size="MEDIUM" weight="MEDIUM" />
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

                </div>

            </div>

        </div>
    )
}

export default Checkout