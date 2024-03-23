import CustomTypography from '@/library/typography/CustomTypography'
import './MiniCartItem.scss'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteProductFromCart, updateProductQuantity } from '@/services/features/cartSlice'
import { toast } from 'react-toastify'
import CountButton from '@/library/buttons/countbtn/CountButton'
import React from 'react'
import { useRouter } from 'next/navigation'
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal'
import { createSaveForLater } from '@/services/features/productSlice'

export default function MiniCartItem({ data }) {
    const dispatch = useDispatch();
    const router = useRouter();

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

    const [count, setCount] = React.useState(data?.quantity);
    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);


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
            console.log(err)
        })
    }

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

    return (
        <div className="mini-cart-item">
            <div className="image-wrapper">
                <div className="image cursor-pointer" onClick={() => router.push('/products/' + data?.productId)}>
                    <Image width={120} height={120} alt="product" src={data?.image ? data?.image : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'} />
                </div>
            </div>
            <div className="details">
                <div className="title cursor-pointer" onClick={() => router.push('/products/' + data?.productId)}>
                    <CustomTypography content={data?.name} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                </div>

                <div className="others flex mb-1 cursor-pointer" onClick={() => router.push('/products/' + data?.productId)}>
                    {/* <CustomTypography
                    content={data?.quantity + " x " + "AED " + parseFloat(data?.priceVat?.toFixed(2))} 
                    style={{
                        textDecoration:'line-through'
                    }}
                    color="BLACK" size="SMALL" weight="MEDIUM" /> */}
                    <CustomTypography content={data?.quantity + " x "} color="BLACK" size="SMALL" weight="MEDIUM" />
                    {
                        (parseFloat(data?.product_price) > parseFloat(data?.priceVat)) ?
                            <CustomTypography content={`AED ${parseFloat(data?.product_price)?.toFixed(2)}`}
                                color="GRAY"
                                size="SMALL" weight="MEDIUM"
                                style={{ textDecoration: 'line-through' }}
                            />
                            :
                            <></>
                    }
                    <CustomTypography content={"AED " + parseFloat(data?.priceVat?.toFixed(2))} color="BLACK" size="SMALL" weight="MEDIUM" />
                    {/* <CustomTypography content="Variant" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="Option" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                </div>

                <div className='mini-countbtn'>
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
                    // onChange={(e) => {
                    //     const value = e.target.value;
                    //     // Check if the value is a valid number, within the range, and not exceeding the maximum length
                    //     if (!isNaN(value) && value >= 0) {
                    //         setCount(isNaN(parseInt(value)) ? '' : parseInt(value)); // Update count state
                    //     }
                    // }}
                    />

                    <button onClick={() => updateCount('add')}>+</button>
                </div>

                {/* <CountButton count={data.quantity} updateCount={updateCount} /> */}
            </div>
            <MdDelete size={40}
                onClick={() => handleDeleteBtn()}
                className=' icon cursor-pointer'
                color='#555' onAn />

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