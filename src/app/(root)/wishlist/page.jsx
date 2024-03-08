'use client'
import React, { useEffect, useState } from 'react'
import CustomTypography from '@/library/typography/CustomTypography';
import { useDispatch, useSelector } from 'react-redux';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import ProductCard from '@/components/cards/productcard/ProductCard';
import { ProductImg } from '../../../../public/images';
import { useRouter } from 'next/navigation';
import { getWishlist, removeWishlist } from '@/services/features/wishlistSlice';
import { TbMoodEmpty } from "react-icons/tb";
import './Wishlist.scss';
import { toast } from 'react-toastify';

const products = [
    {
        id: 1,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 2,
        title: 'CDA Wafer Graduation Cap 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 3,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 4,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 5,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    {
        id: 6,
        title: 'CDA Wafer Happy New Year 1x12 Pcs',
        price: 'AED 20',
        previous_price: 'AED 22',
        rating: '4.5',
    },
    // {
    //     id: 7,
    //     title: 'CDA Wafer Happy New Year 1x12 Pcs',
    //     price: 'AED 20',
    //     previous_price: 'AED 22',
    //     rating: '4.5',
    // },
    // {
    //     id: 8,
    //     title: 'CDA Wafer Happy New Year 1x12 Pcs',
    //     price: 'AED 20',
    //     previous_price: 'AED 22',
    //     rating: '4.5',
    // },

]

const Wishlist = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const recommendedProdRef = React.useRef();
    const { wishlistProducts, isWishlistRemoved } = useSelector((state) => state.wishlist)

    // States
    const [selected, setSelected] = useState('shipping');

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')
    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

    useEffect(() => {
        dispatch(getWishlist({}));
    }, [isWishlistRemoved])

    useEffect(() => {
        console.log(wishlistProducts)
    }, [wishlistProducts])

    const handleNav = (ref, direction) => {
        if (ref === "recommendedProdRef") {
            if (direction === 'left') {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
            } else {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
            }
        }
    }

    const handleRemoveWishlist = (id) => {
        dispatch(removeWishlist({ id })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch(err => console.error(err))
    }

    return (
        <div className='wishlist-container'>
            <div className="title">
                <CustomTypography content="Wishlist" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
            </div>

            {
                wishlistProducts?.result?.allWishlist?.length ?
                    <div
                        className='products-wrapper'
                    >
                        {
                            wishlistProducts?.result?.allWishlist?.map(product => (
                                <ProductCard id={product.product_id} key={product.product_id} title={product.prd_name}
                                    specialPrice={product?.prdPrice[0]?.specialPrice}
                                    normalPrice={product?.prdPrice[0]?.price}
                                    rating={product.rating}
                                    data={product}
                                    haveRemoveBtn={true}
                                    handleRemove={() => handleRemoveWishlist(product?.product_id)}
                                    img={(product?.product_img?.find((img) => img.is_baseimage === true)) ?
                                        (product?.product_img?.find((img) => img.is_baseimage === true)?.url) :
                                        'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
                                    }
                                />
                            ))
                        }
                    </div>
                    :
                    <div className='empty-wishlist flex flex-col items-center justify-center'>
                        <TbMoodEmpty color='#279540' size={80} />
                        <CustomTypography content='Your Wishlist is Empty' color='BLACK' size='MEDIUM' weight='SEMI-BOLD' />
                    </div>
            }



            <div className="itemcard-wrapper">
                <div className="header">
                    <CustomTypography content="Recommended Products with your order" weight="SEMI-BOLD" color="BLACK" size="LARGE" />

                    <div className="scrollbuttons">
                        <CustomIconButton variant={'secondary'}
                            iconColor={'#32893B'} icon={"ArrowLeft"}
                            onClick={() => handleNav('recommendedProdRef', 'left')}
                        />
                        <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                            backgroundColor={'#32893B'} icon={"ArrowRight"}
                            onClick={() => handleNav('recommendedProdRef', 'right')}
                        />
                    </div>

                </div>
                <div className="items" ref={recommendedProdRef}>
                    {
                        products.map(product => (
                            <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Wishlist