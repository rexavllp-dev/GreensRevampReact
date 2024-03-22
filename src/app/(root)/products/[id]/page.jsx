"use client"
import React, { useEffect } from 'react'
import ReactStars from "react-rating-stars-component";
import CustomTypography from '@/library/typography/CustomTypography';
import CustomButton from '@/library/buttons/CustomButton';
import CustomSelect from '@/library/select/custom-select/CustomSelect';
import CountButton from '@/library/buttons/countbtn/CountButton';
import './ProductDetails.scss';
import Image from 'next/image';
import ImageGallery from '@/components/imagegallery/ImageGallery';
import { CiHeart } from 'react-icons/ci';
import { MdKeyboardArrowDown, MdOutlineBrandingWatermark } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOptionsByProductId, getAllRelatedProducts, getAllVariantsByProductId, getOptionValues, getProductOptions, getSingleProduct } from '@/services/features/productSlice';
import { useRouter } from 'next/navigation';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomShare from '@/components/share/CustomShare';
import { addProductToCart } from '@/services/features/cartSlice';
import { toast } from 'react-toastify';
import CustomInput from '@/library/input/custominput/CustomInput';
import { createBulkRequest, getBulkDiscountByProduct, getBulkStatus } from '@/services/features/bulkSlice';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import ProductCard from '@/components/cards/productcard/ProductCard';
import { ProductImg } from '../../../../../public/images';
import MiniCart from '@/components/minicart/MiniCart';
import ReviewSection from './components/ReviewSection';
import { addProductToWishlist, removeWishlist } from '@/services/features/wishlistSlice';
import { RiFridgeLine } from 'react-icons/ri';
import { IoIosReturnLeft } from 'react-icons/io';
import { BiCategoryAlt } from "react-icons/bi";
import Badge from '@/components/badges/Badge';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { addNotifyProducts } from '@/services/features/notifyProductSlice';
import Link from 'next/link';
import { getAllReviewsByProductId } from '@/services/features/reviewSlice';


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

const ProductDetails = ({ params }) => {

    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const dispatch = useDispatch()
    const router = useRouter()
    const relatedProdRef = React.useRef();
    const { bulkDiscountData } = useSelector((state) => state.bulk);
    const [selectedOption, setSelectedOption] = React.useState('');
    const [count, setCount] = React.useState(1);
    const [contactVisible, setContactVisible] = React.useState(false);
    const [formData, setFormData] = React.useState({
        quantity: 0
    })


    const [additionalDetails, setAdditionalDetails] = React.useState([
        {
            id: 1,
            label: 'Dimensions & More Info',
            data: ''
        },
        {
            id: 2,
            label: 'Use & Care',
            data: ''
        },
        {
            id: 3,
            label: 'Shipping & Returns',
            data: ''
        },
        {
            id: 4,
            label: 'Ask a Question (6)',
            data: ''
        },
        {
            id: 5,
            label: 'Reviews (4)',
            data: ''
        },
    ]);
    const { singleProduct, optionValues,
        allVariantsByProduct, 
        allOptionsByProduct, productOptions,
        relatedProducts } = useSelector((state) => state.products)
        
    const { bulkStatusData } = useSelector((state) => state.bulk)
    const { allReviewsByProduct } = useSelector((state) => state.reviews)
    const { isWishlistRemoved, isProductAddedToWishlist } = useSelector((state) => state.wishlist)


    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

    const handleInputChange = ({ e }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleItemClick = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        dispatch(getSingleProduct({ id: params.id }))
    }, [params, isWishlistRemoved, isProductAddedToWishlist]);

    useEffect(() => {
        dispatch(getAllOptionsByProductId({ id: params.id }))
        dispatch(getProductOptions({ id: params.id }))
        dispatch(getAllVariantsByProductId({ id: params.id }))
        dispatch(getBulkDiscountByProduct({ id: params.id }))
    }, [params]);

    useEffect(() => {
        dispatch(getOptionValues({ id: allOptionsByProduct?.[0]?.id }))
    }, [params]);

    useEffect(() => {
        if (productOptions?.result) {
            setSelectedOption(JSON.stringify(productOptions?.result[0]?.innerItems.find((option) => option.product_id == params.id)?.product_id))
        }
    }, [productOptions, params.id])


    useEffect(() => {
        dispatch(getAllRelatedProducts({ id: params.id }))
        dispatch(getBulkStatus({ id: params.id }))
        dispatch(getAllReviewsByProductId({ id: params.id }))
    }, [])

    useEffect(() => {
        setAdditionalDetails([
            {
                id: 1,
                label: 'Dimensions & More Info',
                data: singleProduct?.data?.product?.dimensions_and_more_info
            },
            {
                id: 2,
                label: 'Use & Care',
                data: singleProduct?.data?.product?.use_and_care
            },
            {
                id: 3,
                label: 'Shipping & Returns',
                data: singleProduct?.data?.product?.shipping_and_returns
            },
            {
                id: 4,
                label: 'Ask a Question (6)',
                data: 'Ask question'
            },
            {
                id: 5,
                label: 'Reviews (4)',
                data: 'Reviews'
            },
        ])


        // if (!isNaN(parseInt(singleProduct?.data?.product?.min_qty))) {
        //     setCount(singleProduct?.data?.product?.min_qty)
        // }

    }, [singleProduct])

    // Add to cart
    const handleAddToCart = () => {
        const productData = {
            productId: params.id,
            quantity: count,
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


    const handleRequestBulk = () => {
        if (isLoggedIn) {
            dispatch(createBulkRequest({ data: { productId: params.id, quantity: formData?.quantity } })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            router.push('/auth/login')
        }
    }

    /** Decrements or increments scollLeft property to scroll left or right respectively */
    const handleNav = (ref, direction) => {
        if (ref === "relatedProdRef") {
            if (direction === 'left') {
                relatedProdRef ? relatedProdRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
            } else {
                relatedProdRef ? relatedProdRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
            }
        }
    }

    // const isOutStock = () => {
    //     if (singleProduct?.data?.product?.stock_availability === 'Out of stock') {
    //         return true
    //     } else if (singleProduct?.data?.product?.inventory_management === 'true' || singleProduct?.data?.product?.inventory_management === true) {
    //         if (parseInt(singleProduct?.data?.product?.product_quantity) === 0) {
    //             return true;
    //         }
    //         return false
    //     } else {
    //         return false
    //     }
    // }

    const isOutStock = () => {
        if (singleProduct?.data?.product?.stock_availability === 'Out of stock') {
            return true
        } else if (singleProduct?.data?.product?.inventory_management === 'true' || singleProduct?.data?.product?.inventory_management === true) {
            if (parseInt(singleProduct?.data?.product?.product_quantity) === 0) {
                return true;
            }
            return false
        }
        else if (singleProduct?.data?.product?.product_inventory_id === null || singleProduct?.data?.product?.product_inventory_id === undefined) {
            return true;
        } else {
            return false
        }
    }

    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp);

        const options = {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        };

        const formattedDate = date.toLocaleDateString('en-US', options);
        const year = date.getFullYear();

        return `${formattedDate}`;
    };


    const isBulkApproved = bulkStatusData?.result?.approved_status === "Accept";
    const maxQty = isBulkApproved ? parseInt(bulkStatusData?.result?.quantity) : parseInt(singleProduct?.data?.product?.max_qty)


    const updateCount = (operator) => {

        if (operator === 'add') {
            if (count === maxQty) {
                if (!isBulkApproved) {
                    setContactVisible(true)
                }
            } else {
                setCount((prevCount) => prevCount + 1);
            }
        } else {
            setContactVisible(false)
            if (count > 1) {
                setCount((prevCount) => prevCount - 1);
            }
        }
    }

    const handleWishlist = () => {
        if (isLoggedIn) {
            if (singleProduct?.data?.product?.wishlist_id) {
                dispatch(removeWishlist({ id: params.id })).then((res) => {
                    if (res.payload?.success) {
                        toast.success(res.payload?.message)
                    } else {
                        toast.error(res.payload?.message)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                dispatch(addProductToWishlist({ data: { product_id: params.id } })).then((res) => {
                    if (res.payload?.success) {
                        toast.success(res.payload?.message)
                    } else {
                        toast.error(res.payload?.message)
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        } else {
            router.push('/auth/login')
        }
    }


    // Add notify product
    const handleNotifyProduct = () => {
        const productData = {
            product_id: params.id
        }
        dispatch(addNotifyProducts({ data: productData })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
            } else {
                toast.error(res.payload?.message);
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div className='product_details_wrapper'>
            <div className='product_details'>
                <div className="prd_images-wrapper">
                    <div className='pl-3 pb-5'>
                        <BreadCrumbs />
                    </div>
                    <div className="prd_images">
                        <ImageGallery data={singleProduct} />
                    </div>
                    <div className="prd_description mt-3">
                        <CustomTypography content="Description" color="GREY" size="LARGE" weight="SEMI-BOLD" />
                        <CustomTypography content={singleProduct?.data?.product?.prd_description}
                            color="GREY" size="MEDIUM-SMALL" weight="REGUALR"
                        />

                        {
                            singleProduct?.data?.product?.prd_expiry_date &&
                            <>
                                <CustomTypography content="Expiry Date" color="GREY" size="REGULAR" weight="SEMI-BOLD" />
                                <CustomTypography content={convertTimestampToDate(singleProduct?.data?.product?.prd_expiry_date)}
                                    color="GREY" size="MEDIUM-SMALL" weight="REGUALR"
                                />
                            </>
                        }

                        {
                            singleProduct?.data?.product?.ein_code &&
                            <>
                                <CustomTypography content="EIN Code" color="GREY" size="REGULAR" weight="SEMI-BOLD" />
                                <CustomTypography content={singleProduct?.data?.product?.ein_code}
                                    color="GREY" size="MEDIUM-SMALL" weight="REGUALR"
                                />
                            </>
                        }
                    </div>

                    <div className='addional_details mt-5'>
                        {additionalDetails.map((item, index) => item.data && (
                            <div key={index} className="accordion-item" >
                                <div
                                    className={`accordion-header ${expandedIndex === index ? 'expanded' : ''}`}
                                >
                                    <div className="accordianitem">
                                        <div className="flex items-center w-full justify-between cursor-pointer" >
                                            <div className='flex items-center gap-3'>
                                                <CustomTypography content={item.label} color="GREY" size="MEDIUM-LARGE" weight="MEDIUM" />
                                                {(index === 4) && (
                                                    <Link href={'/products/review/' + params.id}>
                                                        <button className="create-review-btn">Create Review</button>
                                                    </Link>
                                                )}
                                            </div>
                                            <div className="cursor-pointer" onClick={() => handleItemClick(index)}>
                                                <MdKeyboardArrowDown size={24} className='mt-1' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    ((expandedIndex === index) && (index === 4)) ?
                                        (
                                            <div className="w-full reviews_section">
                                                <ReviewSection data={allReviewsByProduct?.result} />

                                            </div>
                                        )
                                        :
                                        (expandedIndex === index) &&
                                        (
                                            <div className="w-full mb-3">
                                                <CustomTypography content={item?.data}
                                                    color="GREY" size="MEDIUM-SMALL" weight="REGUALR"
                                                />
                                            </div>
                                        )
                                }
                            </div>
                        ))}
                    </div>
                </div>

                <div className="prd_details">

                    <div className="share  pt-4">
                        <CustomShare />
                    </div>

                    <div className="prd_item">
                        <CustomTypography content={singleProduct?.data?.product?.prd_name} color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                        {/* <CustomTypography content="CDA Wafer Happy New Year 1x12 Pcs - LCU2134" color="BLACK" size="LARGE" weight="SEMI-BOLD" /> */}
                    </div>

                    <div className="prd_item items-center">
                        <ReactStars
                            classNames={'mb-1'}
                            count={5}
                            onChange={(e) => {
                            }}
                            value={4}
                            size={24}
                            activeColor="#ffd700"
                        />
                        <CustomTypography content="4 reviews" color="BLACK" size="MEDIUM-SMALL" weight="REGULAR" />
                    </div>

                    <div className="prd_item">
                        {
                            singleProduct?.data?.product?.sku &&
                            <div className='sku_code'>
                                <CustomTypography content="SKU:" color="GRAY" size="MEDIUM" weight="SEMI-BOLD" />
                                <CustomTypography content={singleProduct?.data?.product?.sku} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                            </div>
                        }

                        {
                            singleProduct?.data?.product?.item_code &&
                            <div className='item_code'>
                                <CustomTypography content="Item Code:" color="GRAY" size="MEDIUM" weight="SEMI-BOLD" />
                                <CustomTypography content={singleProduct?.data?.product?.item_code} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                            </div>
                        }
                    </div>

                    {
                        allVariantsByProduct?.result?.length > 0 &&
                        <div className="prd_variant">
                            <CustomTypography content="Variants" color="BLACK" size="MEDIUM" weight="REGULAR" />
                            <div className="item">
                                {
                                    allVariantsByProduct?.result?.map((obj) => {
                                        if (obj.product_img[0]?.url) {
                                            return (
                                                <div className="variantimg" key={obj.id} onClick={() => {
                                                    router.push('/products/' + obj.variant_id, { scroll: true })
                                                }}>

                                                    <Image src={obj.product_img[0]?.url}
                                                        width={42} height={42} alt="product" />
                                                    {/* <Image src='https://s3-alpha-sig.figma.com/img/83f1/f1aa/47babafeb1fa2ad5a9e6d4ad6a1fa7c6?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B7AQ6H~eFtpLSY5zTJnv9wu2ZfRGGISN0bl6z4TtqUXEYBlLml2fGrgDPsvqut8gVaoEa6nAqkUQe~xu6swKQO8ohOGquwuWsMLOiVgc0EvQOF6wCBHP~ZQ6WUGqNAbBI1gm9HJWRZAjsVoAerLxMS64n7PF7NQ4TKkgqEgwbyIX8UqeO7TE36XIgK6bb12rymXEPY7AFvpeZLQaEKmBKTVRb81v6ECeLhT1pApInPCVKcXDQlV3k-IsMuPM5zClYqBxCzJarcuJ2WYDbByPCrYhSH9pXCEhI2WMyl5xbj5ux9t0Zzh-POVu~sy6WdO4IOBwry9ZVtWKqtg8pCNhTQ__'
                                            width={42} height={42} alt="product" /> */}
                                                </div>
                                            )
                                        } else return null;
                                    }

                                    )
                                }
                            </div>
                        </div>
                    }

                    <div className="prd_option">
                        {
                            productOptions?.result?.map((obj) => {
                                return (
                                    <CustomSelect label={obj?.option_name}
                                        value={selectedOption}
                                        optionLabel={'option_label'}
                                        optionValue={'product_id'}
                                        data={obj.innerItems} name={'prd_options'}
                                        onChange={(e) => {
                                            // handleInputChange({ e })
                                            setSelectedOption(JSON.stringify(e.target.value))
                                            router.push('/products/' + e.target.value, { scroll: true });
                                        }}
                                    />
                                )
                            })
                        }

                    </div>

                    {
                        bulkDiscountData?.result?.length > 0 &&
                        <div className="bulkprice-section">
                            <CustomTypography content="Bulk Price" color="BLACK" size="MEDIUM" weight="REGULAR" />

                            <div className="bulktable">
                                <table >
                                    <tr>
                                        <th>Min Qty</th>
                                        <th>Max Qty</th>
                                        <th>Per piece</th>
                                    </tr>

                                    {
                                        bulkDiscountData?.result?.map((item, index) => {
                                            return (
                                                <tr key={index} className='bulkrow' style={{ cursor: 'pointer' }} onClick={() => { setCount(parseInt(item?.start_range)) }}>
                                                    <td>{item?.start_range}</td>
                                                    <td>{item?.end_range}</td>
                                                    <td>{'AED ' + item?.bulkpricewithvat?.toFixed(2)}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </table>
                            </div>

                        </div>
                    }

                    {singleProduct?.data?.product?.best_seller ?
                        <div className='flex'>
                            <Badge color={'best-seller'}
                                label={'Best Seller'}
                            />
                        </div>
                        :
                        <></>
                    }

                    {
                        singleProduct?.data?.product?.productPrice[0]?.specialPrice ?
                            <div className="prd_item">
                                <CustomTypography content={`AED ${parseFloat(singleProduct?.data?.product?.productPrice[0]?.specialPrice?.toFixed(2))}`} color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                                <CustomTypography content={`AED ${parseFloat(singleProduct?.data?.product?.productPrice[0]?.price?.toFixed(2))}`} color="GRAY" size="LARGE" weight="SEMI-BOLD" style={{ textDecoration: 'line-through' }} />
                                <CustomTypography content="(Inclusive of VAT)" color="GREY" size="MEDIUM" weight="REGULAR" />
                            </div>
                            :
                            <div className="prd_item">
                                <CustomTypography content={`AED ${parseFloat(singleProduct?.data?.product?.productPrice[0]?.price?.toFixed(2))}`} color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                                <CustomTypography content="(Inclusive of VAT)" color="GREY" size="MEDIUM" weight="REGULAR" />
                            </div>
                    }
                    {/* {
                        parseInt(singleProduct?.data?.product?.min_qty) > 1 &&
                        (
                            <CustomTypography content={`Minimum Order Quantity: ${parseInt(singleProduct?.data?.product?.min_qty)}`} color="GREY" size="MEDIUM" weight="REGULAR" />
                        )
                    } */}

                    {
                        isOutStock()
                            ?
                            <div className="outofstock pt-3">
                                <CustomTypography content="Out of Stock" color="DANGER" size="LARGE" weight="SEMI-BOLD" />

                                <div className="mt-3 flex gap-3">
                                    <div className='iconbtn' onClick={() => handleWishlist()}>
                                        {
                                            singleProduct?.data?.product?.wishlist_id ? <AiFillHeart size={28} color='#E54333' /> : <AiOutlineHeart size={28} color='#E54333' />
                                        }
                                        {/* <CiHeart size={28} color='#E54333' /> */}
                                    </div>
                                    <CustomButton variant='transparent' label='Notify me' onClick={() => {
                                        handleNotifyProduct()
                                    }} />
                                </div>
                            </div>
                            :
                            <div className="prd_item items-center">

                                <div className='countbtn'>
                                    <button onClick={() => updateCount('reduce')}>-</button>
                                    <input
                                        type="text"
                                        value={count}
                                        // min={singleProduct?.data?.product?.min_qty}
                                        maxLength={3}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            // Check if the value is a valid number, within the range, and not exceeding the maximum length
                                            if (!isNaN(value) && value >= 0 && value <= maxQty) {
                                                setCount(isNaN(parseInt(value)) ? '' : parseInt(value)); // Update count state
                                            }
                                        }}
                                    />

                                    <button onClick={() => updateCount('add')}>+</button>
                                </div>

                                <div className='iconbtn' onClick={() => handleWishlist()}>
                                    {
                                        singleProduct?.data?.product?.wishlist_id ? <AiFillHeart size={28} color='#E54333' /> : <AiOutlineHeart size={28} color='#E54333' />
                                    }
                                    {/* <CiHeart size={28} color='#E54333' /> */}
                                </div>

                                <CustomButton variant='transparent' label='Buy Now' onClick={() => {
                                    router.push('/cart')
                                }} />
                                <CustomButton
                                    variant='primary'
                                    label='Add to Cart'
                                    onClick={() => {
                                        handleAddToCart()
                                    }}
                                />

                            </div>
                    }


                    {
                        contactVisible &&
                        <div className="contactus">
                            <div className='flex flex-col gap-2 mb-2'>
                                <CustomTypography content={singleProduct?.data?.product?.max_qty + " Products limited to a customer"} color="DANGER" size="MEDIUM" weight="SEMI-BOLD" />
                                <CustomTypography content={"Contact us for a quote on quantity above " + singleProduct?.data?.product?.max_qty} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                            </div>

                            <div className="flex gap-3 items-center">
                                {
                                    isLoggedIn &&
                                    <CustomInput type={'text'} label="" name="quantity"
                                        placeholder={"Enter Quantity"}
                                        value={formData?.quantity}
                                        onChange={(e) => handleInputChange({ e })}
                                    />
                                }
                                <CustomButton label={isLoggedIn ? 'Submit' : 'Login to Submit'} onClick={handleRequestBulk} variant='transparent' />
                            </div>
                        </div>
                    }

                    <div className="additional-info-container">
                        <div className="flex flex-col gap-2">
                            <div className='flex gap-2 items-center'>
                                <RiFridgeLine className='mt-1' />
                                <CustomTypography content={<><span>Storage Type: </span>{singleProduct?.data?.product?.prd_storage_type}</>} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <IoIosReturnLeft className='mt-1' />
                                <CustomTypography content={<><span>Return Type: </span> {singleProduct?.data?.product?.prd_return_type} </>} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <MdOutlineBrandingWatermark className='mt-1' />
                                <CustomTypography content={<><span>Brand: </span> {singleProduct?.data?.product?.brd_name} </>} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <BiCategoryAlt className='mt-1' />
                                <CustomTypography content={<><span>Category: </span> {singleProduct?.data?.product?.cat_name} </>} color="BLACK" size="MEDIUM" weight="MEDIUM" />
                            </div>
                        </div>
                    </div>

                </div>


            </div>

            {
                relatedProducts?.result?.relatedProducts?.length > 0 &&
                <div className="itemcard-wrapper ">
                    <div className="header">
                        <CustomTypography content="Related Products" weight="SEMI-BOLD" color="BLACK" size="LARGE" />

                        <div className="scrollbuttons">
                            <CustomIconButton variant={'secondary'}
                                iconColor={'#32893B'} icon={"ArrowLeft"}
                                onClick={() => handleNav('relatedProdRef', 'left')}
                            />
                            <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                                backgroundColor={'#32893B'} icon={"ArrowRight"}
                                onClick={() => handleNav('relatedProdRef', 'right')}
                            />
                        </div>

                    </div>
                    <div className="items" ref={relatedProdRef}>
                        {
                            relatedProducts?.result?.relatedProducts?.map(product => (
                                <ProductCard id={product.productId} key={product.product_id} title={product.prd_name}
                                    specialPrice={product?.prdPrice[0]?.specialPrice}
                                    normalPrice={product?.prdPrice[0]?.price}
                                    rating={product.rating}
                                    data={product}
                                    img={(product?.product_img?.find((img) => img.is_baseimage === true)) ?
                                        (product?.product_img?.find((img) => img.is_baseimage === true)?.url) :
                                        'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
                                    }
                                />
                            ))
                        }
                    </div>
                </div>
            }

            <div className="itemcard-wrapper ">
                <div className="header">
                    <CustomTypography content="Recommendations based on your interests" weight="SEMI-BOLD" color="BLACK" size="LARGE" />

                    <div className="scrollbuttons">
                        <CustomIconButton variant={'secondary'}
                            iconColor={'#32893B'} icon={"ArrowLeft"}
                            onClick={() => handleNav('relatedProdRef', 'left')}
                        />
                        <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                            backgroundColor={'#32893B'} icon={"ArrowRight"}
                            onClick={() => handleNav('relatedProdRef', 'right')}
                        />
                    </div>

                </div>
                <div className="items" ref={relatedProdRef}>
                    {
                        products.map(product => (
                            <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductDetails