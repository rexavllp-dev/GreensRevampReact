"use client"
import React from 'react'
import './UserSidebar.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

//react icons
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { RiHistoryLine } from 'react-icons/ri';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdCardGiftcard } from 'react-icons/md';
import { FaLeaf } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { RiAccountCircleLine } from 'react-icons/ri';
import { RiNotificationLine } from 'react-icons/ri';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { RiFileTextLine } from 'react-icons/ri';
import { PiSignOutBold } from "react-icons/pi";
import { logout } from '@/services/features/authSlice'
import { useDispatch, useSelector } from 'react-redux'

const UserSidebar = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { isLoggedIn, authCount } = useSelector(state => state.auth)
    const [user, setUser] = React.useState(typeof window !== "undefined" && window.localStorage.getItem('user') && (window.localStorage.getItem('user') !== 'undefined') && JSON.parse(window.localStorage.getItem('user')))


    const sidebarItems = [
        // {
        //     id: 1,
        //     name: 'Dashboard',
        //     url: '/user',
        //     icon: <MdOutlineSpaceDashboard />
        // },
        {
            id: 2,
            name: 'Purchase History',
            url: '/user/purchase-history',
            icon: <RiHistoryLine />
        },
        {
            id: 3,
            name: 'Wishlist',
            url: '/wishlist',
            icon: <AiOutlineHeart />
        },
        {
            id: 4,
            name: 'Gift Cards',
            url: '/giftcards',
            icon: <MdCardGiftcard />
        },
        {
            id: 5,
            name: 'Greens Rewards',
            url: '/rewards',
            icon: <FaLeaf />
        },
        {
            id: 6,
            name: 'Addresses',
            url: '/addresses',
            icon: <IoLocationOutline />
        },
        {
            id: 7,
            name: 'Account Information',
            url: '/account',
            icon: <RiAccountCircleLine />
        },
        {
            id: 8,
            name: 'Communication & Privacy',
            url: '/privacy',
            icon: <RiNotificationLine />
        },
        {
            id: 9,
            name: 'Privacy Policy',
            url: '/policy',
            icon: <AiOutlineSafetyCertificate />
        },
        {
            id: 10,
            name: 'Help Center',
            url: '/help',
            icon: <RiQuestionnaireLine />
        },
        {
            id: 11,
            name: 'Terms of use',
            url: '/terms',
            icon: <RiFileTextLine />
        },
    ];

    React.useEffect(() => {
        setUser(typeof window !== "undefined" && window.localStorage.getItem('user') && (window.localStorage.getItem('user') !== 'undefined') && JSON.parse(window.localStorage.getItem('user')));
    }, [isLoggedIn, authCount])


    return (
        <div className='adminsidebar'>
            <div className="sidebar">
                <div className="header">
                    {
                        user ?
                            <CustomTypography content={`Hi, ${user?.usr_firstname}`} color={'BLACK'} size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                            :
                            <></>
                    }
                </div>

                <div className="sidebaritems">
                    <div className={(pathname === '/user' || pathname === '/user/') ? "item active" : "item"} key={1}>
                        <MdOutlineSpaceDashboard />
                        <Link href={"/user"}>
                            {/* <div className={pathname.includes(item.url) ? "item active" : "item"} key={item.id}> */}
                            <CustomTypography content={"Dashboard"} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            {/* </div> */}
                        </Link>
                    </div>
                    {sidebarItems.map((item) => {
                        return (
                            <div className={pathname.includes(item.url) ? "item active" : "item"} key={item.id}>
                                {item.icon}
                                <Link href={item.url}>
                                    {/* <div className={pathname.includes(item.url) ? "item active" : "item"} key={item.id}> */}
                                    <CustomTypography content={item.name} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                    {/* </div> */}
                                </Link>
                            </div>
                        )
                    })}
                    <div className={"item mt-4 cursor-pointer"}>
                        {<PiSignOutBold />}
                        <div onClick={() => dispatch(logout())}>
                            {/* <div className={pathname.includes(item.url) ? "item active" : "item"} key={item.id}> */}
                            <CustomTypography content={"Sign Out"} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        </div>
                    </div>

                    {/* {sidebarItems.map((item) => (
                        <Link href={item.url} key={item.id}>
                            <div className={pathname.startsWith(item.url) ? "item active" : "item"}>
                                <CustomTypography content={item.name} color={pathname.startsWith(item.url) ? 'WHITE' : 'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            </div>
                        </Link>
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default UserSidebar