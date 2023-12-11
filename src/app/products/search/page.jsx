"use client";
import React from 'react'
import { ProductImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4 } from '@/assets/images';
import CategoryCard from '@/components/cards/categorycard/CategoryCard';
import useWindowSize from '@/hooks/useWindowSize';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import CustomTypography from '@/library/typography/CustomTypography';
import ProductCard from '@/components/cards/productcard/ProductCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import './Search.scss';
import SearchFilter from '@/components/searchfilter/SearchFilter';
import Image from 'next/image';
import { CiFilter } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import CustomPagination from '@/components/pagination/CustomPagination';
import NavCard from '@/components/cards/navcard/NavCard';


const Search = () => {

    const recommendedProdRef = React.useRef()
    const { width, height } = useWindowSize();
    const isMobileView = width < 767;
    const [showFilter, setShowFilter] = React.useState(false);


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

    const browsemore = [
        {
            id: 1,
            title: 'Edible Ink'
        },
        {
            id: 2,
            title: 'Wafer Sheets'
        },
        {
            id: 3,
            title: 'Frosting Sheets'
        },
        {
            id: 4,
            title: 'Powder'
        }

    ]


    /** Decrements or increments scollLeft property to scroll left or right respectively */
    const handleNav = (ref, direction) => {
        if (ref === "recommendedProdRef") {
            if (direction === 'left') {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: -600, behavior: 'smooth' }) : null;
            } else {
                recommendedProdRef ? recommendedProdRef.current.scrollBy({ left: 600, behavior: 'smooth' }) : null;
            }
        }
    }

    return (
        <div className="searchproducts-wrapper">

            {/* <BreadCrumbs /> */}
            <div className="filterbtn">
                <div className="sort" >
                    <GoSortDesc />
                    <CustomTypography content="Sort" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-SMALL" />
                </div>
                <div className="filter" onClick={() => setShowFilter(true)}>
                    <CiFilter />
                    <CustomTypography content="Filter" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-SMALL" />
                </div>
            </div>

            <div className='searchproducts'>
                <div className={showFilter ? "searchfilter" : "searchfilter searchFilter_close"}>
                    <SearchFilter onClose={() => setShowFilter(false)} />
                </div>
                {/* <div className="searchproducts-container">
                    <div className="items">
                        {
                            products.map(product => (
                                <ProductCard key={product.id} title={product.title} price={product.price}
                                    previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                            ))
                        }
                    </div>
                </div> */}

                <div
                    className='products-wrapper'
                >
                    {
                        products.map(product => (
                            <ProductCard key={product.id} title={product.title} price={product.price}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>

            <div className='pagination-controls'>
                <CustomPagination />
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
                            <CategoryCard key={category.id} cardWidth={isMobileView ? 123 : 266} cardHeight={isMobileView ? 123 : 266}
                                title={category.title} haveTitle={true} img={category.img} />
                        ))
                    }
                </div>
            </div> */}

            <div className="browsemore-wrapper">

                <CustomTypography content="Browse categories in Edible Prints" weight="SEMI-BOLD" color="BLACK" size="LARGE" />
                <div className="browsemore">
                    {
                        browsemore.map((obj, i) => (
                            <NavCard key={i} title={obj.title} />
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
                            <ProductCard key={product.id} title={product.title} price={product.price}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Search