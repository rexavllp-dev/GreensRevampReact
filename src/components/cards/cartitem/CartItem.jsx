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

export default function CartItem({ data }) {

    const dispatch = useDispatch();
    const router = useRouter();

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

    const [count, setCount] = React.useState(data?.quantity);

    const handleRemoveItemFromCart = (prdId) => {
        dispatch(deleteProductFromCart({ id: prdId })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message, {
                    toastId: 'success1',
                });
            } else {
                toast.error(res.payload?.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSaveForLater = () => {

        if (isLoggedIn) {
            dispatch(createSaveForLater({
                data: {
                    product_id: data?.productId
                }
            })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message, {
                        toastId: 'success1',
                    });
                    handleRemoveItemFromCart(data?.productId);
                } else {
                    toast.error(res.payload?.message);
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
        dispatch(updateProductQuantity({ data: newData }))
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
            console.log(err)
        })
    }


    return (
        <div className="cart-item">
            <div className="image-wrapper">
                <div className="image pb-1 cursor-pointer" onClick={() => router.push('/products/' + data?.productId)}>
                    <Image width={100} height={100} alt="product" src={data?.image ? data?.image : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'} />
                </div>
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
                <div className="title cursor-pointer" onClick={() => router.push('/products/' + data?.productId)}>
                    <CustomTypography content={data?.name} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                </div>

                <div className="others cursor-pointer" onClick={() => router.push('/products/' + data?.productId)}>
                    <div className="flex gap-2">
                        <CustomTypography content={`AED ${parseFloat(data?.product_price)?.toFixed(2)}`}
                            color="GRAY" size="MEDIUM"
                            weight="MEDIUM" style={{ textDecoration: 'line-through' }}
                        />
                        <CustomTypography content={`AED ${parseFloat(data?.priceVat)?.toFixed(2)}`}
                            color="BLACK" size="MEDIUM" weight="SEMI-BOLD"
                        />
                    </div>
                    {/* <CustomTypography content="Variant" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="Option" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                </div>

                <div className='btn'>
                    {/* <CustomButton variant='teritary' label='Save for Later'/> */}
                    <button className='save_later_btn'
                        onClick={() => {
                            handleSaveForLater()
                        }}
                    >Save for Later</button>
                    <div className="removebtn" onClick={() => {
                        handleRemoveItemFromCart(data?.productId)
                    }}>
                        <CustomTypography content="Remove"
                            style={{ cursor: 'pointer', borderBottom: '1px solid black' }}
                            color="BLACK" size="MEDIUM"
                            weight="SEMI-BOLD"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}