import CustomTypography from '@/library/typography/CustomTypography'
import './CartItem.scss'
import { ProductImg } from '../../../../public/images'
import Image from 'next/image'
import CountButton from '@/library/buttons/countbtn/CountButton'
import CustomButton from '@/library/buttons/CustomButton'
import { useDispatch } from 'react-redux'
import { deleteProductFromCart, updateProductQuantity } from '@/services/features/cartSlice'
import { toast } from 'react-toastify'

export default function CartItem({ data }) {

    const dispatch = useDispatch();

    const updateCount = (operator) => {
        const newData = {
            productId: data?.productId,
            // newQuantity: parseInt(data?.quantity) + 1,
            operator: operator
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
        <div className="cart-item">
            <div className="image-wrapper">
                <div className="image pb-1">
                    <Image width={100} height={100} alt="product" src={data?.image ? data?.image : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'} />
                </div>
                <CountButton count={data.quantity} updateCount={updateCount} />
            </div>
            <div className="details">
                <div className="title">
                    <CustomTypography content={data?.name} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                </div>

                <div className="others">
                    <CustomTypography content={`AED ${parseFloat(data?.priceVat?.toFixed(2))}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                    {/* <CustomTypography content="Variant" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="Option" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                </div>

                <div className='btn'>
                    {/* <CustomButton variant='teritary' label='Save for Later'/> */}
                    <button className='save_later_btn'>Save for Later</button>
                    <div className="removebtn" onClick={() => {
                        handleRemoveItemFromCart()
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