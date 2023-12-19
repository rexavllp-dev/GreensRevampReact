import React from 'react'
import "./NavCard.scss"
import { categoryImg1 } from '@/assets/images'
import { MdKeyboardArrowRight } from "react-icons/md";
import CustomTypography from '@/library/typography/CustomTypography';
import Image from 'next/image';

const NavCard = ({
    title
}) => {
    return (
        <div className='navcard-wrapper'>
            <div className="navcard">
                <div className="header">
                    <CustomTypography content={title} weight="MEDIUM" color="BLACK" size="MEDIUM" />
                    <div style={{ width: '42px', height: '42px', display:'flex', alignItems:'center' }}>
                        <MdKeyboardArrowRight size={24} stroke='1' />
                    </div>
                </div>

                <div style={{ borderRadius: '50%', width: '42px', height: '42px', overflow: 'hidden', position: 'relative' }}>
                    <Image src={categoryImg1} layout="fill" objectFit="cover" alt="category" />
                </div>
            </div>
        </div >
    )
}

export default NavCard