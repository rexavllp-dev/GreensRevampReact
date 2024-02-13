import CustomTypography from '@/library/typography/CustomTypography'
import './MiniCartItem.scss'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteProductFromCart } from '@/services/features/cartSlice'
import { toast } from 'react-toastify'

export default function MiniCartItem({ data }) {
    const dispatch = useDispatch();

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
                    <Image width={40} height={40} alt="product" src={data?.image ? data?.image : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'} />
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
            </div>
            <MdDelete size={40}
                onClick={() => handleRemoveItemFromCart()}
                className=' icon cursor-pointer'
                color='#555' onAn />
        </div>
    )
}