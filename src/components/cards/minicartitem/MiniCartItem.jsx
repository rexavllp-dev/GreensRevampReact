import CustomTypography from '@/library/typography/CustomTypography'
import './MiniCartItem.scss'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteProductFromCart, updateProductQuantity } from '@/services/features/cartSlice'
import { toast } from 'react-toastify'
import CountButton from '@/library/buttons/countbtn/CountButton'
import React from 'react'

export default function MiniCartItem({ data }) {
    const dispatch = useDispatch();

    const [count, setCount] = React.useState(data?.quantity);


    React.useEffect(()=>{
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

    const handleUpdateQuantity = (quantity) => {
        let updateQty = isNaN(quantity) ? 0 : quantity;
        // newQuantity = updateQty > 0 ? updateQty : 0

        let newData = {
            productId: data?.productId,
            newQuantity: quantity,
            operator: 'add'
        }

        dispatch(updateProductQuantity({ data: newData }))
    }

    const handleRemoveItemFromCart = () => {
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

    return (
        <div className="mini-cart-item">
            <div className="image-wrapper">
                <div className="image">
                    <Image width={120} height={120} alt="product" src={data?.image ? data?.image : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'} />
                </div>
            </div>
            <div className="details">
                <div className="title">
                    <CustomTypography content={data?.name} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                </div>

                <div className="others">
                    <CustomTypography content={data?.quantity + " x " + "AED " + parseFloat(data?.priceVat?.toFixed(2))} color="BLACK" size="SMALL" weight="MEDIUM" />
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
                onClick={() => handleRemoveItemFromCart()}
                className=' icon cursor-pointer'
                color='#555' onAn />
        </div>
    )
}