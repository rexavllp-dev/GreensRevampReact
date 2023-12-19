"use client";

import React, { useState } from 'react'
import './ImageCard.scss'
import Image from 'next/image'
import CustomButton from '@/library/buttons/CustomButton'
import CustomTypography from '@/library/typography/CustomTypography'
import PropTypes from 'prop-types';
import { InstaIconOrg } from '@/assets/icons'

const ImageCard = ({ title, img, cardHeight,
    cardWidth, buttonText, objectFit,
    noRadius,
    haveTitle, haveButton, buttonBottom, haveIcon, icon }) => {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className="imagecard_wrapper" style={{
            height: cardHeight,
            width: cardWidth,
            minWidth: cardWidth,
            minHeight: cardHeight,
            borderRadius: noRadius ? 0 : '6px',
        }}>
            <div className='imagecard'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    height: cardHeight,
                    width: cardWidth,
                    minWidth: cardWidth,
                    minHeight: cardHeight, 
                    borderRadius: noRadius ? 0 : '6px',

                }}>
                <div className={buttonBottom ? "bottomcontent" : "content"} style={
                    {
                        height: cardHeight,
                        width: cardWidth,
                        minWidth: cardWidth,
                        minHeight: cardHeight,
                    }
                }>
                    <>
                        {
                            haveTitle &&
                            <div className='title'>
                                <CustomTypography content={title} color='BLACK' size='LARGE' weight='SEMI-BOLD' />
                            </div>
                        }
                    </>

                    {
                        haveButton &&
                        <div className={buttonBottom ? "bottombtn" : "topbtn"}>
                            <CustomButton label={buttonText} variant='secondary' />
                        </div>
                    }
                </div>

                <Image
                    className='nextimg' src={img}
                    alt='img'

                    fill={true}
                    objectFit={objectFit ? objectFit : 'cover'}
                />
                {haveIcon &&
                    <div className="icon">
                        <Image src={icon} height={31} width={31} alt="icon" />
                    </div>
                }
            </div >
        </div >
    )
}

ImageCard.propTypes = {
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    cardWidth: PropTypes.string.isRequired,
    cardHeight: PropTypes.string.isRequired,
    imgPadding: PropTypes.string.isRequired,
    haveButton: PropTypes.bool.isRequired,
    haveTitle: PropTypes.bool.isRequired,
    haveIcon: PropTypes.bool.isRequired,
};

ImageCard.defaultProps = {
    title: '',
    img: '',
    cardWidth: "266px",
    cardHeight: "266px",
    haveTitle: true,
    haveButton: true,
    imgPadding: 0,
    haveIcon: false,
    icon: InstaIconOrg
};

export default ImageCard