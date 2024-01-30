import CustomTypography from '@/library/typography/CustomTypography'
import './CartItem.scss'
import { ProductImg } from '../../../../public/images'
import Image from 'next/image'
import CountButton from '@/library/buttons/countbtn/CountButton'
import CustomButton from '@/library/buttons/CustomButton'

export default function CartItem({ data }) {
    return (
        <div className="cart-item">
            <div className="image-wrapper">
                <div className="image">
                    <Image width={100} height={100} alt="product" src={ProductImg} />
                </div>
                <CountButton  data={data}/>
            </div>
            <div className="details">
                <div className="title">
                    <CustomTypography content={data?.name} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                </div>

                <div className="others">
                    <CustomTypography content={"AED " + data?.price} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                    <CustomTypography content="Variant" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    <CustomTypography content="Option" color="BLACK" size="MEDIUM" weight="REGULAR" />
                </div>

                <div className='btn'>
                    {/* <CustomButton variant='teritary' label='Save for Later'/> */}
                    <button className='save_later_btn'>Save for Later</button>
                    <div className="removebtn" onClick={() => {  }}>
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