"use client";
import React from 'react'
import { ProductImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4 } from '../../../../../public/images';
import CategoryCard from '@/components/cards/categorycard/CategoryCard';
import useWindowSize from '@/hooks/useWindowSize';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import CustomTypography from '@/library/typography/CustomTypography';
import './Categories.scss';
import ProductCard from '@/components/cards/productcard/ProductCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCategoriesBySlug } from '@/services/features/categorySlice';

const Categories = () => {

    const itemRef = React.useRef()
    const { width, height } = useWindowSize();
    const isMobileView = width < 767;
    const dispatch = useDispatch();
    const { subcategoriesBySlug } = useSelector(state => state.categories)


    const categories = [
        {
            id: 1,
            title: 'Food Colours',
            img: categoryImg2
        },
        {
            id: 2,
            title: 'Ingredients',
            img: categoryImg1
        },
        {
            id: 3,
            title: 'Baking Supplies',
            img: categoryImg3
        },
        {
            id: 4,
            title: 'Cake Decorations',
            img: categoryImg4
        },
        {
            id: 5,
            title: 'Chocolate',
            img: categoryImg1
        },
        {
            id: 6,
            title: 'Chocolate',
            img: categoryImg2
        },
        {
            id: 7,
            title: 'Chocolate',
            img: categoryImg4
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
        {
            id: 7,
            title: 'CDA Wafer Happy New Year 1x12 Pcs',
            price: 'AED 20',
            previous_price: 'AED 22',
            rating: '4.5',
        },
        {
            id: 8,
            title: 'CDA Wafer Happy New Year 1x12 Pcs',
            price: 'AED 20',
            previous_price: 'AED 22',
            rating: '4.5',
        },

    ]


    React.useEffect(() => {
        dispatch(getSubCategoriesBySlug({ slug: 'ingredients' }));
    }, [])

    /** Decrements or increments scollLeft property to scroll left or right respectively */
    const handleNav = (ref, direction) => {
        if (ref === "itemRef") {
            if (direction === 'left') {
                categoryRef ? categoryRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
            } else {
                categoryRef ? categoryRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
            }
        }
    }

    return (
        <div className="category-wrapper">

            <BreadCrumbs />
            <div className="itemcard-wrapper">
                <div className="header">
                    <CustomTypography content={subcategoriesBySlug?.result?.category?.cat_name} weight="SEMI-BOLD" color="BLACK" size="LARGE" />
                    <div className="scrollbuttons">
                        <CustomIconButton variant={'secondary'} iconColor={'#32893B'} icon={"ArrowLeft"} onClick={() => handleNav('itemRef', 'left')} />
                        <CustomIconButton variant={'primary'} iconColor={'#ffffff'} backgroundColor={'#32893B'} icon={"ArrowRight"} onClick={() => handleNav('itemRef', 'right')} />
                    </div>
                </div>
                <div className="items" ref={itemRef}>
                    {
                        subcategoriesBySlug?.result?.subCategories?.map((category) => (
                            <CategoryCard haveGradient={true} key={category?.id}
                                cardWidth={isMobileView ? 123 : 266} cardHeight={isMobileView ? 123 : 266}
                                title={category?.cat_name}
                                haveTitle={true} img={category?.cat_logo || ''}
                                url={'/products/search/?q=' + category?.cat_name}
                            />
                        ))
                    }
                </div>
            </div>

            {/* <div className="itemcard-wrapper">
                <div className="header">
                    <CustomTypography content="Curated Collections" weight="SEMI-BOLD" color="BLACK" size="LARGE" />
                    <div className="scrollbuttons">
                        <CustomIconButton variant={'secondary'} iconColor={'#32893B'} icon={"ArrowLeft"} onClick={() => handleNav('itemRef', 'left')} />
                        <CustomIconButton variant={'primary'} iconColor={'#ffffff'} backgroundColor={'#32893B'} icon={"ArrowRight"} onClick={() => handleNav('itemRef', 'right')} />
                    </div>
                </div>
                <div className="items" ref={itemRef}>
                    {
                        categories.map((category) => (
                            <CategoryCard haveGradient={true} key={category.id} cardWidth={isMobileView ? 123 : 266} cardHeight={isMobileView ? 123 : 266}
                                title={category.title} haveTitle={true} img={category.img} />
                        ))
                    }
                </div>
            </div> */}

            {
                subcategoriesBySlug?.result?.category?.cat_name ? (
                    <div className="itemcard-wrapper ">
                        <div className="header">
                            <CustomTypography content={"Popular Picks in " + (subcategoriesBySlug?.result?.category?.cat_name || '')} weight="SEMI-BOLD" color="BLACK" size="LARGE" />

                            <div className="scrollbuttons">
                                <CustomIconButton variant={'secondary'}
                                    iconColor={'#32893B'} icon={"ArrowLeft"}
                                    onClick={() => handleNav('recentProductsRef', 'left')}
                                />
                                <CustomIconButton variant={'primary'} iconColor={'#ffffff'}
                                    backgroundColor={'#32893B'} icon={"ArrowRight"}
                                    onClick={() => handleNav('recentProductsRef', 'right')}
                                />
                            </div>

                        </div>
                        <div className="items" ref={itemRef}>
                            {
                                products.map(product => (
                                    <ProductCard key={product.id} title={product.title} price={product.price}
                                        previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                                ))
                            }
                        </div>
                    </div>
                )
                    : <></>
            }

        </div>
    )
}

export default Categories