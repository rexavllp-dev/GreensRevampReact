import CustomTypography from '@/library/typography/CustomTypography'
import './CartItem.scss'
import { ProductImg } from '../../../../public/images'
import Image from 'next/image'
import CountButton from '@/library/buttons/countbtn/CountButton'
import CustomButton from '@/library/buttons/CustomButton'
import { useDispatch } from 'react-redux'
import { deleteProductFromCart, updateProductQuantity } from '@/services/features/cartSlice'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { createSaveForLater } from '@/services/features/productSlice'
import React from 'react'
import Link from 'next/link'
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal'

export default function CartItem({ data }) {

    const dispatch = useDispatch();
    const router = useRouter();

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

    const [count, setCount] = React.useState(data?.quantity);
    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);

    const handleRemoveItemFromCart = (saveForLater) => {
        setConfirmationOpen(false)
        if (saveForLater) {
            dispatch(createSaveForLater({
                data: {
                    product_id: data?.productId
                }
            })).then((res) => {
                if (res.payload?.success) {

                } else {

                }
            }).catch((err) => {
                console.log(err)
            })
        }

        dispatch(deleteProductFromCart({ id: data?.productId })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
            } else {
                toast.error(res.payload?.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    }


    const handleDeleteBtn = () => {
        if (isLoggedIn) {
            setConfirmationOpen(true);
        } else {
            handleRemoveItemFromCart(false);
        }
    }

    const handleSaveForLater = () => {
        if (isLoggedIn) {
            dispatch(createSaveForLater({
                data: {
                    product_id: data?.productId
                }
            })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);

                    dispatch(deleteProductFromCart({ id: data?.productId })).then((res) => {

                    }).catch((err) => {
                        console.log(err)
                    })
                } else {

                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            toast.error('Please login first');
            router.push('/auth/login');
        }
    }

    React.useEffect(() => {
        setCount(data?.quantity)
    }, [data?.quantity])

    const updateCount = (operator) => {
        let newData = {
            productId: data?.productId,
            newQuantity: 1,
            operator: operator
        }
        dispatch(updateProductQuantity({ data: newData })).then((res) => {
            if (res.payload?.success) {
                // toast.success(res.payload?.message);
            } else {
                toast.error(res.payload?.message, {
                    toastId: 'error'
                });
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleUpdateQuantity = (newQuantity) => {
        if (isNaN(parseInt(newQuantity))) {
            toast.error("Invalid new quantity. Please enter a valid number.");
            setCount(data?.quantity);
            return;
        }

        let updatingQuantity = Math.abs(newQuantity - parseInt(data?.quantity));
        let operator;

        if (newQuantity === parseInt(data?.quantity)) {
            console.log("New quantity is the same as the old quantity.");
            return;
        }

        if (newQuantity > parseInt(data?.quantity)) {
            operator = 'add';
        } else {
            operator = 'reduce';
        }

        let newData = {
            productId: data?.productId,
            newQuantity: updatingQuantity,
            operator: operator
        }

        dispatch(updateProductQuantity({ data: newData })).then((res) => {
            if (res.payload?.success) {
                // toast.success(res.payload?.message);
            } else {
                toast.error(res.payload?.message);
                setCount(data?.quantity);
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className="cart-item">
            <div className="image-wrapper">
                <Link href={'/products/' + data?.productId}>
                    <div className="image pb-1 cursor-pointer">
                        <Image width={100} height={100} alt="product" src={data?.image ? data?.image : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'} />
                    </div>
                </Link>
                <div className='countbtn'>
                    <button onClick={() => updateCount('reduce')}>-</button>
                    <input
                        type="text"
                        value={count}
                        // onBlur
                        // min={singleProduct?.data?.product?.min_qty}
                        maxLength={3}
                        onChange={(e) => {
                            const value = e.target.value;
                            setCount(value)
                        }}
                        onBlur={(e) => {
                            const value = e.target.value;
                            handleUpdateQuantity(value);
                        }}
                    />

                    <button onClick={() => updateCount('add')}>+</button>
                </div>
                {/* <CountButton count={data.quantity} updateCount={updateCount} /> */}
            </div>
            <div className="details">

                <Link href={'/products/' + data?.productId}>
                    <div className="title cursor-pointer" >
                        <CustomTypography content={data?.name} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                    </div>
                </Link>

                <Link href={'/products/' + data?.productId}>
                    <div className="others cursor-pointer" >
                        <div className="flex gap-2">
                            {
                                (parseFloat(data?.product_price) > parseFloat(data?.priceVat)) ?
                                    <CustomTypography content={`AED ${parseFloat(data?.product_price)?.toFixed(2)}`}
                                        color="GRAY" size="MEDIUM"
                                        weight="MEDIUM" style={{ textDecoration: 'line-through' }}
                                    />
                                    :
                                    <></>
                            }
                            <CustomTypography content={`AED ${parseFloat(data?.priceVat)?.toFixed(2)}`}
                                color="BLACK" size="MEDIUM" weight="SEMI-BOLD"
                            />
                        </div>
                        {/* <CustomTypography content="Variant" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="Option" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                    </div>
                </Link>

                <div className='btn'>
                    {/* <CustomButton variant='teritary' label='Save for Later'/> */}
                    <button className='save_later_btn'
                        onClick={() => {
                            handleSaveForLater()
                        }}
                    >Save for Later</button>
                    <div className="removebtn" onClick={() => {
                        handleDeleteBtn();
                    }}>
                        <CustomTypography content="Remove"
                            style={{ cursor: 'pointer', borderBottom: '1px solid black' }}
                            color="BLACK" size="MEDIUM"
                            weight="SEMI-BOLD"
                        />
                    </div>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => handleRemoveItemFromCart(false)}
                onConfirm={() => handleRemoveItemFromCart(true)}
                title="Do you want save this product for later?"
                successText="SAVE FOR LATER"
                cancelText="No, thanks!"
                message={data?.name}
            />
        </div>
    )
}