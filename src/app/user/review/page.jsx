"use client";
import React from 'react'
import { IoIosStar } from 'react-icons/io'
import { IoStarOutline, IoStarSharp } from 'react-icons/io5'
import CustomTypography from '@/library/typography/CustomTypography'
import { Divider, Image, Select, SelectItem } from '@nextui-org/react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import './Review.scss'
import { MdKeyboardArrowLeft } from 'react-icons/md';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getAllReviewsByUser } from '@/services/features/reviewSlice';
import Link from 'next/link';

const MyReviews = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [sortBy, setSortBy] = React.useState('');
    const [filters, setFilters] = React.useState('');
    const { allReviewsByUser } = useSelector((state) => state.reviews)

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

    React.useEffect(() => {
        dispatch(getAllReviewsByUser({}))
    }, [])



    return (
        <div className="review_section">
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'My Reviews'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
            </div>
            <div style={{ width: '200px' }} className='flex gap-3 mt-5'>
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
                allReviewsByUser?.result?.map((review, id) => (
                    <>
                        <div className="reviews mt-3">
                            <div className="product flex gap-4 items-center">
                                <Image radius='none' width={80} height={80} src={review?.image_url} alt='review-img' />
                                <CustomTypography content={review?.prd_name} size='MEDIUM-SMALL' weight='MEDIUM' />
                            </div>
                            <div className="star mb-3">
                                <ReactStars
                                    count={5}
                                    value={review?.rating}
                                    edit={false}
                                    size={20}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <div className='flex gap-3 mb-3'>
                                {
                                    review?.reviewimages?.map((image) => (
                                        <div key={image?.id}>
                                            <Image radius='none' width={80} height={80} src={image?.url} alt='review-img' />
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

                            <Link href={`/products/review/edit/${review?.reviewId}`}>
                                <button className='edit-review-btn mt-2'>
                                    <CustomTypography content={'Edit Review'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                </button>
                            </Link>
                        </div>
                        <Divider className='mt-3 mb-3' />
                    </>
                ))
            }
            <Divider className='mt-3 mb-3' />
        </div>
    )
}

export default MyReviews