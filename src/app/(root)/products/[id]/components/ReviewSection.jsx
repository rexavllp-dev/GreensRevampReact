"use client";
import React from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoStarOutline, IoStarSharp } from 'react-icons/io5'
import './ReviewSection.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import { Divider, Image, Select, SelectItem } from '@nextui-org/react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';

const ReviewSection = ({ data }) => {

    const [sortBy, setSortBy] = React.useState('');
    const [filters, setFilters] = React.useState('');

    const sortOptions = [
        {
            label: 'Latest',
            value: 'latest'
        },
        {
            label: 'Oldest',
            value: 'oldest'
        }
    ];

    const filterOptions = [
        {
            label: 'All',
            value: 'All'
        }
    ];
    return (
        <div className="review_section">
            <div className="header_section">
                <div className="left">
                    <div className="rating">
                        <CustomTypography content={data?.averageRating} size='SUPER-LARGE' weight='SEMI-BOLD' />
                        <div className="star ml-2">
                            <IoIosStar />
                            <IoIosStar />
                            <IoIosStar />
                            <IoIosStar />
                            <IoStarOutline />
                        </div>
                    </div>
                    <div className="guidlines mt-3">
                        <CustomTypography content='Our Community Guidelines help customers write honest reviews.' size='MEDIUM-SMALL' weight='REGUALR' />
                    </div>
                </div>
                <div className="right">
                    <div className="ratinglist">
                        <div className="item">
                            <CustomTypography content='5' size='MEDIUM-SMALL' weight='REGUALR' />
                            <IoIosStar />
                            <div className="progressbar">
                                <div className='bar' style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        <div className="item">
                            <CustomTypography content='4' size='MEDIUM-SMALL' weight='REGUALR' />
                            <IoIosStar />
                            <div className="progressbar">
                                <div className='bar' style={{ width: '50%' }}></div>
                            </div>
                        </div>
                        <div className="item">
                            <CustomTypography content='3' size='MEDIUM-SMALL' weight='REGUALR' />
                            <IoIosStar />
                            <div className="progressbar">
                                <div className='bar' style={{ width: '30%' }}></div>
                            </div>
                        </div>
                        <div className="item">
                            <CustomTypography content='2' size='MEDIUM-SMALL' weight='REGUALR' />
                            <IoIosStar />
                            <div className="progressbar">
                                <div className='bar' style={{ width: '20%' }}></div>
                            </div>
                        </div>
                        <div className="item">
                            <CustomTypography content='1' size='MEDIUM-SMALL' weight='REGUALR' />
                            <IoIosStar className='ml-1' />
                            <div className="progressbar">
                                <div className='bar' style={{ width: '10%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: '500px' }} className='flex gap-3 mt-5'>
                <Select
                    size={'md'}
                    label="Filters"
                    variant='underlined'
                    // labelPlacement='outside'
                    // placeholder='Filters'
                    className="max-w-xs"
                    selectedKeys={[filters]}
                    // onSelectionChange={setSortBy}
                    onChange={(e) => {
                        if (e.target?.value !== sortBy) {
                            setFilters(e.target.value)
                        }
                    }}
                >
                    {
                        filterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </Select>
                <Select
                    size={'md'}
                    label="Sort By"
                    variant='underlined'
                    // labelPlacement='outside'
                    // placeholder='Sort By'
                    className="max-w-xs"
                    selectedKeys={[sortBy]}
                    // onSelectionChange={setSortBy}
                    onChange={(e) => {
                        if (e.target?.value !== sortBy) {
                            setSortBy(e.target.value)
                        }
                    }}
                >
                    {
                        sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </Select>
            </div>

            {
                data?.reviews?.map((review, id) => (
                    <>
                        <div className="reviews mt-3">
                            <div className="star mb-3">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoStarOutline />
                            </div>
                            <div className='flex gap-3'>
                                {
                                    data?.reviewimages?.map((image) => (
                                        <div>
                                            <Image width={40} height={40} src={image?.url} alt='review-img' />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="title mb-3">
                                <CustomTypography content={review?.heading_review} size='MEDIUM-SMALL' weight='MEDIUM' />
                            </div>
                            <div className="description">
                                <CustomTypography content={review?.review} size='MEDIUM-SMALL' weight='REGUALR' />
                            </div>
                            <div className="username mb-3">
                                <CustomTypography content={'@' + review?.usr_firstname} size='MEDIUM-SMALL' weight='MEDIUM' />
                            </div>
                            <div className="like_dislike mb-3 flex gap-2">
                                <AiOutlineLike color='#32893b' />
                                <AiOutlineDislike color='#32893b' />
                            </div>
                        </div>
                        <Divider className='mt-3 mb-3' />
                    </>
                ))
            }
        </div>
    )
}

export default ReviewSection