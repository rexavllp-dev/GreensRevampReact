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
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOptionsByProductId, getAllRelatedProducts, getAllVariantsByProductId, getOptionValues, getProductOptions, getSingleProduct } from '@/services/features/productSlice';
import { useRouter } from 'next/navigation';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomShare from '@/components/share/CustomShare';
import { addProductToCart } from '@/services/features/cartSlice';
import { toast } from 'react-toastify';
import CustomInput from '@/library/input/custominput/CustomInput';
import { createBulkRequest, getBulkDiscountByProduct } from '@/services/features/bulkSlice';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import ProductCard from '@/components/cards/productcard/ProductCard';
import { ProductImg } from '../../../../../public/images';


const additionalDetails = [
    {
        id: 1,
        label: 'Dimensions & More Info'
    },
    {
        id: 2,
        label: 'Use & Care'
    },
    {
        id: 3,
        label: 'Shipping & Returns'
    },
    {
        id: 4,
        label: 'Ask a Question (6)'
    },
    {
        id: 5,
        label: 'Reviews (4)'
    },
]

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
    const { bulkDiscountData } = useSelector((state) => state.bulk)
    const [selectedOption, setSelectedOption] = React.useState('');
    const [count, setCount] = React.useState(1);
    const [contactVisible, setContactVisible] = React.useState(false);
    const [formData, setFormData] = React.useState({
        quantity: 0
    })
    const { singleProduct, optionValues, allVariantsByProduct, allOptionsByProduct, productOptions, relatedProducts } = useSelector((state) => state.products)

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    const [isLoggedIn, setIsLoggedIn] = React.useState(token && token !== "" && token !== "undefined")

    const handleInputChange = ({ e }) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const updateCount = (operator) => {
        if (operator === 'add') {
            if (count === 50) {
                setContactVisible(true)
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


    const handleItemClick = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        dispatch(getSingleProduct({ id: params.id }))
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
    }, [])

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
                    </div>

                    <div className='addional_details mt-5'>
                        {additionalDetails.map((item, index) => (
                            <div key={index} className="accordion-item">
                                <div
                                    className={`accordion-header ${expandedIndex === index ? 'expanded' : ''}`}
                                >
                                    <div className="accordianitem">
                                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleItemClick(index)}>
                                            <CustomTypography content={item.label} color="GREY" size="MEDIUM-LARGE" weight="MEDIUM" />
                                            <MdKeyboardArrowDown size={24} className='mt-1' />
                                        </div>
                                    </div>
                                </div>

                                {expandedIndex === index && (
                                    <div className="w-full mb-3">
                                        <CustomTypography content="Lorem ipsum dolor sit amet consectetur. Vel dis fusce tristique donec. Curabitur nulla sit sit feugiat. Sit arcu volutpat augue eget donec non. Pellentesque scelerisque rutrum at mi consectetur gravida consectetur bibendum. Est nec malesuada morbi vulputate vulputate quisque. Ac non tellus lorem elementum lorem. Arcu ullamcorper tempus id gravida a scelerisque parturient mattis nulla. Nulla enim donec ut scelerisque et. Lectus leo elit mi laoreet lorem purus ac fermentum. Mi eget ut ut nunc nibh lacinia volutpat risus. Sed dui eget vitae morbi ornare lobortis. Et quisque viverra sagittis turpis in posuere. Aenean potenti varius lorem morbi tempus sit eget id. Velit sapien egestas urna tincidunt malesuada. Pulvinar et tortor tellus rhoncus suscipit nisl pretium amet ut."
                                            color="GREY" size="MEDIUM-SMALL" weight="REGUALR" />
                                    </div>
                                )}
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

                    <div className="prd_item">
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
                        <CustomTypography content="SKU:" color="GRAY" size="MEDIUM" weight="SEMI-BOLD" />
                        <CustomTypography content={singleProduct?.data?.product?.sku} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />

                        {/* <CustomTypography content="Item Code:" color="GRAY" size="MEDIUM" weight="SEMI-BOLD" />
                    <CustomTypography content="LCU2134" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" /> */}
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
                            productOptions?.result?.map((obj) => (
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
                            ))
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
                                                <tr>
                                                    <td>{item?.start_range}</td>
                                                    <td>{item?.end_range}</td>
                                                    <td>{'AED ' + item?.discounted_price}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </table>
                            </div>

                        </div>
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

                    {
                        singleProduct?.data?.product?.stock_availability === 'Out of stock'
                            ?
                            <div className="outofstock pt-3">
                                <CustomTypography content="Out of Stock" color="DANGER" size="LARGE" weight="SEMI-BOLD" />
                            </div>
                            :
                            <div className="prd_item">
                                <CountButton count={count} updateCount={updateCount} setProductQuantity={setCount} />
                                <div className='iconbtn'>
                                    <CiHeart size={28} color='#E54333' />
                                </div>

                                <CustomButton variant='transparent' label='Buy Now' />
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
                                <CustomTypography content="50 Products limited to a customer" color="DANGER" size="MEDIUM" weight="SEMI-BOLD" />
                                <CustomTypography content="Contact us for a quote on quantity above 50" color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
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


                </div>

            </div>
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
                        relatedProducts?.result?.map(product => (
                            <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>


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
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductDetails