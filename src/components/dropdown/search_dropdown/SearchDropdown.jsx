"use client";
import React, { useEffect, useRef } from "react";
import CustomSearch from "@/library/input/searchinput/CustomSearch";
import './SeachDropdown.scss';
import CustomTypography from "@/library/typography/CustomTypography";
import { ProductImg } from "../../../../public/images";
import Image from "next/image";
import { CloseIcon } from "../../../../public/icons";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/providers/LanguageProvider";
import { getAllProducts, setSearchQuery } from "@/services/features/productSlice";
import { useDispatch, useSelector } from "react-redux";

const suggestions = [
    {
        id: 1,
        name: 'Cake'
    },
    {
        id: 2,
        name: 'Chips'
    },
    {
        id: 3,
        name: 'Cookies'
    },
    {
        id: 4,
        name: 'Caramel Cold Glaze'
    },
    {
        id: 5,
        name: 'Silpain Mat'
    }

]

const products = [
    {
        id: 1,
        name: 'CDA Wafer Graduation Cap 1x12 Pcs',
        img: ProductImg
    },
    {
        id: 2,
        name: 'CDA Wafer Graduation Cap 1x12 Pcs',
        img: ProductImg
    },
    {
        id: 3,
        name: 'CDA Wafer Graduation Cap 1x12 Pcs',
        img: ProductImg
    },
    {
        id: 4,
        name: 'CDA Wafer Graduation Cap 1x12 Pcs',
        img: ProductImg
    },
]
export default function SearchDropdown() {
    const searchRef = useRef();
    const router = useRouter();
    const dispatch = useDispatch();

    const { getTranslation } = useLanguage();
    const { allProducts, searchQuery } = useSelector(state => state.products);

    // const [searchQuery, dispatch(setSearchQuery] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const [recentSearches, setRecentSearches] = React.useState([]);

    useEffect(() => {
        // Load recent searches from localStorage on component mount
        const storedSearches = typeof window !== "undefined" && window.localStorage.getItem('recentSearches');
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);

    useEffect(() => {
        if (recentSearches.length > 0) {
            // Save recent searches to localStorage whenever it changes
            typeof window !== "undefined" && window.localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
    }, [recentSearches]);

    React.useEffect(() => {
        if (searchQuery?.length > 2) {
            dispatch(getAllProducts({ search_query: searchQuery }))
        }
    }, [searchQuery])

    const handleSearch = () => {
        if (!searchQuery) {
            return;
        }
        router.push(`/products/search/?q=${searchQuery}`, { scroll: true });
        setVisible(false);
    }

    const onKeyUp = (e) => {
        if (!searchQuery) {
            return;
        }
        if (e.key === 'Enter') {
            router.push(`/products/search/?q=${searchQuery}`, { scroll: true });
            // this.search(); 
            setVisible(false);
        }
    }


    const handleClearSearches = () => {
        window.localStorage.removeItem('recentSearches')
        setRecentSearches([]);
    }




    return (
        <div className="search-dropdown" onBlur={(e) => {
            if (e.currentTarget.contains(e.relatedTarget)) {
                return;
            }
            setVisible(false)
        }} tabIndex={1}>
            <div onClick={() => {
                setVisible(true);
                searchRef?.current?.focus();
            }}>
                <CustomSearch
                    name={'product'} value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    placeholder={getTranslation('home_search_placeholder')}
                // disabled={true}
                />
            </div>
            {
                visible &&
                <div className="dropdown">
                    <div className="searchinput">
                        <CustomSearch name={'product'} value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            // placeholder={'Search for a product or Item code'}
                            onKeyUp={onKeyUp}
                            onSearchClick={handleSearch}
                            isInput={true}
                            ref={searchRef}
                            fullWidth={true}
                        />
                        <div className="closebtn" onClick={() => setVisible(false)}>
                            <Image src={CloseIcon} alt="close" />
                        </div>
                    </div>
                    {
                        searchQuery?.length > 0 ?
                            <div className="results-wrapper">
                                <CustomTypography content='Results' color='BLACK' size='MEDIUM-LARGE' weight='SEMI-BOLD' />

                                <div className="products-container">
                                    {
                                        allProducts?.data?.products?.map((item, index) => (
                                            <div className="product" onClick={() => {
                                                // Assuming the recentSearches is an array of objects with a product_id property
                                                const isProductAlreadyIncluded = recentSearches.some(search => search.product_id === item.product_id);
                                                if (!isProductAlreadyIncluded) {
                                                    // Add new search term to recent searches list
                                                    setRecentSearches(prevSearches => ([...prevSearches, item]));
                                                }
                                                router.push(`/products/${item.product_id}`, { scroll: true });
                                                setVisible(false)
                                            }
                                            }>
                                                <div className="image">
                                                    {/* {
                                                        item?.product_img?.find((img) => img.is_baseimage === true) && */}
                                                    <Image
                                                        src={(item?.product_img?.find((img) => img.is_baseimage === true)) ?
                                                            (item?.product_img?.find((img) => img.is_baseimage === true)?.url) :
                                                            'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'}
                                                        alt={item?.prd_name}
                                                        width={37}
                                                        height={37}
                                                    />
                                                    {/* } */}

                                                </div>
                                                <div className="name">
                                                    <CustomTypography content={item.prd_name}
                                                        color='BLACK' style={{ borderBottom: '1px solid #111', display: 'inline' }}
                                                        size='MEDIUM' weight='MEDIUM' />
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                            :
                            <div className="suggestion_wrapper">
                                <CustomTypography content='Trending Searches' color='BLACK' size='MEDIUM-LARGE' weight='SEMI-BOLD' />

                                <div className="suggestions">
                                    {
                                        suggestions?.map((item, index) => (
                                            <div className="badge" key={item.id} onClick={() => {
                                                dispatch(setSearchQuery(item.name))
                                            }}>
                                                <CustomTypography content={item.name} color='BLACK' size='REGULAR' weight='MEDIUM' />
                                            </div>

                                        ))
                                    }
                                </div>

                                {
                                    recentSearches?.length > 0 &&
                                    <>
                                        <div className="recentsearch">
                                            <CustomTypography content='Recent Searches' color='BLACK' size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                                            <div className="removebtn" onClick={() => handleClearSearches()}>
                                                <CustomTypography content='Clear All' color='BLACK' size='REGULAR' weight='REGULAR' />
                                            </div>
                                        </div>

                                        <div className="recentproducts">
                                            {
                                                recentSearches?.map((item, index) => (
                                                    <div className="product" onClick={() => {
                                                        router.push(`/products/${item.product_id}`, { scroll: true });
                                                        setVisible(false);
                                                    }}>
                                                        <div className="image">
                                                            {
                                                                item?.product_img[0]?.url &&
                                                                <Image
                                                                    src={(item?.product_img?.find((img) => img.is_baseimage === true)) ?
                                                                        (item?.product_img?.find((img) => img.is_baseimage === true)?.url) :
                                                                        'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'}
                                                                    alt={item?.prd_name}
                                                                    width={37}
                                                                    height={37}
                                                                />

                                                            }
                                                        </div>
                                                        <div className="name">
                                                            <CustomTypography content={item.prd_name}
                                                                color='BLACK' style={{ borderBottom: '1px solid #111', display: 'inline' }}
                                                                size='MEDIUM' weight='MEDIUM' />
                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </>
                                }


                                {/* <CustomTypography content='Related Searches for Starbucks' color='BLACK' size='MEDIUM-LARGE' weight='SEMI-BOLD' />

                                <div className="suggestions">
                                    {
                                        suggestions?.map((item, index) => (
                                            <div className="badge" key={item.id}>
                                                <CustomTypography content={item.name} color='BLACK' size='REGULAR' weight='MEDIUM' />
                                            </div>

                                        ))
                                    }
                                </div> */}

                            </div>

                    }



                </div>
            }
        </div>
    );
}
