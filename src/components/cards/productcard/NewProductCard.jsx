// import Image from 'next/image';
import React from 'react';
import './NewProductCard.scss';
import CustomTypography from '@/library/typography/CustomTypography';
import { StarIcon, heartIconBlack } from '../../../../public/icons';
import { useLanguage } from '@/providers/LanguageProvider';
import { useRouter } from 'next/navigation';
import { addProductToCart } from '@/services/features/cartSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Badge from '@/components/badges/Badge';
import { addProductToWishlist, removeWishlist } from '@/services/features/wishlistSlice';
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { Image } from '@nextui-org/react';

const NewProductCard = ({ img, title, specialPrice, normalPrice, rating, id, data, haveRemoveBtn, handleRemove }) => {

    const { getTranslation } = useLanguage();
    const router = useRouter();
    const dispatch = useDispatch();

    // Add to cart
    const handleAddToCart = () => {

        const productData = {
            productId: id,
            quantity: 1,
        }

        dispatch(addProductToCart({ data: productData })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
            } else {
                toast.error(res.payload?.message);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const isOutStock = () => {
        if (data?.stock_availability === 'Out of stock') {
            return true
        } else if (data?.inventory_management === 'true' || data?.inventory_management === true) {
            if (parseInt(data?.product_quantity) === 0) {
                return true;
            }
            return false
        }
        else if (data?.product_inventory_id === null || data?.product_inventory_id === undefined) {
            return true;
        } else {
            return false
        }
    }

    const handleAddToWishlist = (id) => {
        dispatch(addProductToWishlist({ data: { product_id: id } })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleRemoveFromWishlist = (id) => {
        dispatch(removeWishlist({ id })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch(err => console.error(err))
    }
    return (
        <div className='newproductcard'>
            <div className="cardimage ">
                {/* <Image src={productImage} /> */}
                {/* <Image src={img}
                    fill objectFit='cover'
                    alt='img'
                //  width={173} height={173} 
                /> */}

                <Image
                    isZoomed
                    // width={240}
                    alt="NextUI Fruit Image with Zoom"
                    src={img}
                />

            </div>

            <div className="productdetails">
                <div className='cursor-pointer' onClick={() => router.push('/products/' + id)}>
                    <CustomTypography content={title} weight='REGULAR' color='BLACK' size='MEDIUM' />
                </div>
            </div>
        </div>
    )
}

export default NewProductCard