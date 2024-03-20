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
import { toast } from 'react-toastify';
import './NotifiedProducts.scss';
import { getNotifiedProducts, removeNotifyProducts } from '@/services/features/notifyProductSlice';

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

const NotifiedProducts = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const recommendedProdRef = React.useRef();
    const { notifyProducts, isNotifyProductsRemoved } = useSelector((state) => state.notifyProducts)


    useEffect(() => {
        dispatch(getNotifiedProducts({}));
    }, [isNotifyProductsRemoved])


    const handleNav = (ref, direction) => {
        if (ref === "recommendedProdRef") {
            if (direction === 'left') {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
            } else {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
            }
        }
    }

    const handleRemoveNotifiedProduct = (id) => {
        dispatch(removeNotifyProducts({ id })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch(err => console.error(err))
    }

    return (
        <div className='notified-products-container'>
            <div className="title">
                <CustomTypography content="Notified Products" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
            </div>

            {
                notifyProducts?.result?.allNotifyProducts?.length ?
                    <div
                        className='products-wrapper'
                    >
                        {
                            notifyProducts?.result?.allNotifyProducts?.map(product => (
                                <ProductCard id={product.product_id} key={product.product_id} title={product.prd_name}
                                    specialPrice={product?.prdPrice[0]?.specialPrice}
                                    normalPrice={product?.prdPrice[0]?.price}
                                    rating={product.rating}
                                    data={product}
                                    haveRemoveBtn={true}
                                    hideNotifyBtn={true}
                                    handleRemove={() => handleRemoveNotifiedProduct(product?.notifyProductsId)}
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
                        <CustomTypography content='Your Notified Products is Empty' color='BLACK' size='MEDIUM' weight='SEMI-BOLD' />
                    </div>
            }



        </div >
    )
}

export default NotifiedProducts