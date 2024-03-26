"use client";
import React, { useState } from 'react';
import './CategoryCard.scss';
import Image from 'next/image';
import PropTypes from 'prop-types';
import CustomTypography from '@/library/typography/CustomTypography';
import Link from 'next/link';

const CategoryCard = ({ title, img, cardWidth, cardHeight, haveTitle, imgPadding, haveGradient, url }) => {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <Link href={url ? url : '#'}>
            <div className='categorycard-wrapper'>
                <div className={haveGradient ? 'categrorycard gradientcard' : 'categrorycard'} style={{
                    minWidth: cardWidth,
                    minHeight: cardHeight,
                    maxWidth: cardWidth,
                    maxHeight: cardHeight,
                    overflow: 'visible'
                }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {
                        haveTitle &&
                        <div className="title">
                            <CustomTypography content={title} color='black' size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                        </div>
                    }

                    <div className='imgcontainer' style={{
                        minWidth: cardWidth,
                        minHeight: cardHeight,
                    }}>
                        <Image src={img}
                            fill={true}
                            objectFit='contain'
                            alt='product'
                        // width={cardWidth} height={cardHeight}
                        />
                    </div>
                </div >
                {
                    haveTitle &&
                    <div className="cardtitle">
                        <CustomTypography content={title} color='black' size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                    </div>
                }
            </div>
        </Link>
    )
}


CategoryCard.propTypes = {
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    cardWidth: PropTypes.string.isRequired,
    cardHeight: PropTypes.string.isRequired,
    imgPadding: PropTypes.string.isRequired,
    haveTitle: PropTypes.bool.isRequired,
};

CategoryCard.defaultProps = {
    title: '',
    img: '',
    cardWidth: 266,
    cardHeight: 266,
    haveTitle: true,
    imgPadding: 0,
};

export default CategoryCard