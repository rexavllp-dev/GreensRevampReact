import CustomTypography from '@/library/typography/CustomTypography'
import './CartItem.scss'

export default function CartItem() {
    return (
        <div className="cart-item">
            <div className="image">
                <Image src={productImage} />
            </div>
            <CustomTypography content="CDA Wafer Graduation Cap 1x12 Pcs" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
            <CustomTypography content="AED 20" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
            <CustomTypography content="Variant" color="BLACK" size="MEDIUM" weight="REGULAR" />
            <CustomTypography content="Option" color="BLACK" size="MEDIUM" weight="REGULAR" />
        </div>
    )
}