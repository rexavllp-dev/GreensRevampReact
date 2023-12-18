"use client";
import React from 'react'
import "./Navbar.scss"
import { companyLogo, companyLogoMobile } from '@/assets/images'
import Image from "next/image"
import { cartIcon, heartIcon, menuIcon, userIcon } from '@/assets/icons'
import Toolbar from './toolbar/Toolbar'
import CustomSearch from '@/library/input/searchinput/CustomSearch'
import CountryDropdown from '../dropdown/country_dropdown/CountryDropdown'
import CustomTypography from '@/library/typography/CustomTypography'
import SearchDropdown from '../dropdown/search_dropdown/SearchDropdown';
import MainSidebar from '../sidebar/main_sidebar/MainSidebar';
import Link from 'next/link';
import { useLanguage } from '@/providers/LanguageProvider';


const Navbar = () => {

    const { language, switchLanguage, getTranslation } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const handleSwitchLanguage = ()=>{
        if(language === 'ar'){
            switchLanguage('en');
        }else if(language === 'en'){
            switchLanguage('ar');
        }
    }

    return (
        <>
            <div className='navbar-wrapper'>
                <div className="navbar">
                    <div className="left">
                        <Link href="/">
                            <div className="logo">
                                <Image src={companyLogo} />
                            </div>
                        </Link>
                        <div className="drawerbtn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Image src={menuIcon} />
                            {/* <p className='drawerbtn-label'>Categories</p> */}
                        </div>
                    </div>
                    <div className='center_section'>
                        <SearchDropdown />
                    </div>

                    <div className="right">
                        <div className="navitems">
                            <div className="item country">
                                <CountryDropdown />
                            </div>

                            <div className="item">
                                <div className="icon">
                                    <Image src={heartIcon} />
                                </div>
                                {/* <p className='item-label'>Wishlist</p> */}
                            </div>

                            <Link href={'/auth/login'}>
                                <div className="item">
                                    <div className="icon">
                                        <Image src={userIcon} />
                                    </div>
                                    <p className='item-label'>{getTranslation('signin')}</p>
                                </div>
                            </Link>

                            <div className="item">
                                <Link href="/cart">
                                    <div className="icon">
                                        <Image src={cartIcon} />
                                    </div>
                                </Link>
                                {/* <p className='item-label'>Cart</p> */}
                            </div>




                            <div className={language === 'ar' ? "item pb-2 lang" : "item lang"}
                            onClick={handleSwitchLanguage}>
                                {language === 'ar' ?
                                    <p className="ar">
                                        عربي
                                    </p>
                                    :
                                    <p className="en">
                                        English
                                    </p>
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <div className="navbarmobile">
                    <div className="top">
                        <div className="left">

                            <div className="drawerbtn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <Image src={menuIcon} />
                            </div>
                        </div>
                        <div className='center'>
                            <Link href="/">
                                <div className="logo">
                                    <Image src={companyLogoMobile} />
                                </div>
                            </Link>
                        </div>
                        <div className="right">
                            <div className="navitems">
                                {/* <div className="item">
                                    <CountryDropdown />
                                </div>
                                <div className="item">
                                    <Image src={heartIcon} />
                                    <p className='item-label'>Wishlist</p>
                                </div> */}
                                <div className="item">
                                    <Link href={'auth/login'}>
                                        <Image src={userIcon} />
                                    </Link>
                                    {/* <p className='item-label'>Sign In</p> */}
                                </div>
                                <div className="item">
                                    <Link href="/cart">
                                        <Image src={cartIcon} />
                                    </Link>
                                    {/* <p className='item-label'>Cart</p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bottom">
                        <SearchDropdown />
                    </div>
                </div>

            </div>
            <Toolbar />
            <MainSidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}
            // routeModule={'categories'}
            />
        </>
    )
}

export default Navbar