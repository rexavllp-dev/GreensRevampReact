"use client";
import React, { useEffect } from 'react'
import { ProductImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4 } from '../../../../../public/images';
import useWindowSize from '@/hooks/useWindowSize';
import CustomIconButton from '@/library/iconbutton/CustomIconButton';
import CustomTypography from '@/library/typography/CustomTypography';
import ProductCard from '@/components/cards/productcard/ProductCard';
import './Search.scss';
import SearchFilter from '@/components/searchfilter/SearchFilter';
import { CiFilter } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import CustomPagination from '@/components/pagination/CustomPagination';
import NavCard from '@/components/cards/navcard/NavCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsByUser } from '@/services/features/productSlice';
import { useSearchParams } from 'next/navigation';
import CustomSelect from '@/library/select/custom-select/CustomSelect';
import { Select, SelectItem } from '@nextui-org/react';


const Search = () => {

    const searchParams = useSearchParams();
    const recommendedProdRef = React.useRef();
    const { width, height } = useWindowSize();
    const dispatch = useDispatch();
    const isMobileView = width < 767;
    const [showFilter, setShowFilter] = React.useState(false);
    let keyword = searchParams.get('q');

    const [currentPage, setCurrentPage] = React.useState(1);
    const [filters, setFilters] = React.useState([]);
    const [sortBy, setSortBy] = React.useState('featured');
    const [perPage, setPerPage] = React.useState('40');
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(10000);

    const { allProductsByUser, searchQuery } = useSelector((state) => state.products);


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

    const perPageTypes = [
        {
            label: "10", value: "10",
        },
        {
            label: "20", value: "20",
        },
        {
            label: "30", value: "30",
        },
        {
            label: "40", value: "40",
        },
        {
            label: "50", value: "50",
        }
    ]

    const sortOptions = [
        {
            label: 'Price low to high',
            value: 'price_asc'
        },
        {
            label: 'Price high to low',
            value: 'price_desc'
        },
        {
            label: 'Newest',
            value: 'newest'
        },
        {
            label: 'Oldest',
            value: 'oldest'
        },
        {
            label: 'Popularity',
            value: 'featured'
        },
        {
            label: 'Best Sellers',
            value: 'bestsellers'
        }
    ];


    useEffect(() => {
        dispatch(getAllProductsByUser({ page: currentPage, search_query: keyword, filters, sortBy, minPrice, maxPrice, per_page: perPage }));
    }, [currentPage, keyword, sortBy, filters, minPrice, maxPrice, perPage]);


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
                {/* <div className="sort" >
                    <GoSortDesc />
                    <CustomTypography content="Sort" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-SMALL" />
                </div> */}
                <div className="filter" onClick={() => setShowFilter(true)}>
                    <CiFilter />
                    <CustomTypography content="Filter" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-SMALL" />
                </div>
            </div>

            <div className='searchproducts'>
                <div className={showFilter ? "searchfilter" : "searchfilter searchFilter_close"}>
                    <SearchFilter
                        filters={filters}
                        setFilters={setFilters}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        onClose={() => setShowFilter(false)}
                        setMaxPrice={setMaxPrice}
                        setMinPrice={setMinPrice}
                    />
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


                <div className="products-section ">
                    <div className="selectsection">

                        <div style={{ width: '200px' }} className='mr-3'>
                            {/* <CustomSelect label={'Sort By'}
                                value={sortBy} name={'sort_by'}
                                data={sortOptions} onChange={(e) => { handleInputChange({ e }) }}
                            /> */}
                            <Select
                                size={'md'}
                                // label="Sort By"
                                variant='bordered'
                                labelPlacement='outside'
                                className="max-w-xs"
                                selectedKeys={[sortBy]}
                                // onSelectionChange={setSortBy}
                                onChange={(e) => {
                                    if (e.target?.value !== sortBy) {
                                        setSortBy(e.target.value)
                                    }
                                }}
                            >
                                {sortOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div style={{ width: '100px' }}>
                            <Select
                                size={'md'}
                                // label="Per Page"
                                variant='bordered'
                                labelPlacement='outside'
                                className="max-w-xs"
                                selectedKeys={[perPage]}
                                onChange={(e) => {
                                    if (e.target?.value !== perPage) {
                                        setPerPage(e.target.value)
                                    }
                                }}
                            >
                                {perPageTypes.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div
                        className='products-wrapper'
                    >
                        {
                            allProductsByUser?.data?.products?.map(product => (
                                <ProductCard id={product.product_id} key={product.product_id} title={product.prd_name}
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
            </div>

            <div className='pagination-controls'>
                <CustomPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={allProductsByUser?.data?.totalPage} />
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
                            <ProductCard key={product.id} title={product.title} price={product.price} data={product}
                                previous_price={product.previous_price} rating={product.rating} img={ProductImg} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Search