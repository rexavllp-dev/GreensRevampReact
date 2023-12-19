import React from 'react'
import './CustomCard.scss'
import Image from 'next/image'
import CustomButton from '@/library/buttons/CustomButton'

const CustomCard = ({ title, img, cardHeight, cardWidth, buttonText, haveButton }) => {
    return (
        <div className='homewallcard'>
            <div className="cardimage">
                <p className='title'>{title}</p>
                <div className="btn">
                    <CustomButton label={buttonText} variant='secondary'/>
                </div>
                <Image src={img} width={cardWidth} alt='product' height={cardHeight} />
            </div>
        </div >
    )
}

export default CustomCard