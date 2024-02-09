import CustomTypography from '@/library/typography/CustomTypography'
import './MiniCartItem.scss'
import Image from 'next/image'

export default function MiniCartItem({ data }) {



    return (
        <div className="cart-item">
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
                    <CustomTypography content={data?.quantity + " x " + "AED " + parseInt(data?.price)} color="BLACK" size="SMALL" weight="MEDIUM" />
                    {/* <CustomTypography content="Variant" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="Option" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
                </div>
            </div>
        </div>
    )
}