"use client";
import React, { useRef } from "react";
import CustomSearch from "@/library/input/searchinput/CustomSearch";
import './SeachDropdown.scss';
import CustomTypography from "@/library/typography/CustomTypography";
import { ProductImg } from "@/assets/images";
import Image from "next/image";
import { CloseIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";

const suggestions = [
    {
        id: 1,
        name: 'Kopykake Ink'
    },
    {
        id: 2,
        name: 'Colour Dust'
    },
    {
        id: 3,
        name: 'Edible Wafer'
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
    const router  = useRouter()

    const [keyword, setKeyword] = React.useState('');
    const [visible, setVisible] = React.useState(false);

    const handleSearch = () => {
        router.push('/products/search', { scroll: true });
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
                    name={'product'} value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder={'Search for a product or SKU'}
                // disabled={true}
                />
            </div>
            {
                visible &&
                <div className="dropdown">
                    <div className="searchinput">
                        <CustomSearch name={'product'} value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            // placeholder={'Search for a product or Item code'}
                            isInput={true}
                            ref={searchRef}
                            fullWidth={true}
                        />
                        <div className="closebtn" onClick={() => setVisible(false)}>
                            <Image src={CloseIcon} />
                        </div>
                    </div>
                    {
                        keyword?.length > 0 ?
                            <div className="results-wrapper">
                                <CustomTypography content='Results' color='BLACK' size='MEDIUM-LARGE' weight='SEMI-BOLD' />

                                <div className="products-container">
                                    {
                                        products?.map((item, index) => (
                                            <div className="product">
                                                <div className="image">
                                                    <Image
                                                        src={item.img}
                                                        alt={item.name}
                                                        width={45}
                                                        height={45}
                                                    />
                                                </div>
                                                <div className="name">
                                                    <CustomTypography content={item.name}
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
                                            <div className="badge" key={item.id}>
                                                <CustomTypography content={item.name} color='BLACK' size='REGULAR' weight='MEDIUM' />
                                            </div>

                                        ))
                                    }
                                </div>

                                <div className="recentsearch">
                                    <CustomTypography content='Recent Searches' color='BLACK' size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                                    <div className="removebtn">
                                        <CustomTypography content='Clear All' color='BLACK' size='REGULAR' weight='REGULAR' />
                                    </div>
                                </div>

                                <div className="recentproducts">
                                    {
                                        products?.map((item, index) => (
                                            <div className="product" key={item.id} onClick={() => { handleSearch(item.id) }}>
                                                <div className="image">
                                                    <Image
                                                        src={item.img}
                                                        alt={'product1'}
                                                        width={45}
                                                        height={45}
                                                    />
                                                </div>
                                                <div className="name">
                                                    <CustomTypography content={item.name}
                                                        color='BLACK' style={{ borderBottom: '1px solid #111', display: 'inline' }}
                                                        size='MEDIUM' weight='MEDIUM' />
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>

                                <CustomTypography content='Related Searches for Starbucks' color='BLACK' size='MEDIUM-LARGE' weight='SEMI-BOLD' />

                                <div className="suggestions">
                                    {
                                        suggestions?.map((item, index) => (
                                            <div className="badge" key={item.id}>
                                                <CustomTypography content={item.name} color='BLACK' size='REGULAR' weight='MEDIUM' />
                                            </div>

                                        ))
                                    }
                                </div>

                            </div>

                    }



                </div>
            }
        </div>
    );
}
