"use client"
import React from 'react'
import './AdminSidebar.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import Link from 'next/link'
import Image from 'next/image'
import { companyLogo } from '../../../../public/images'
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from 'next/navigation'

const AdminSidebar = () => {
    const pathname = usePathname()
    console.log(pathname);

    const sidebarItems = [

        {
            id: 2,
            name: 'Products',
            url: '/admin/products',
        },
        {
            id: 3,
            name: 'Sales',
            url: '/admin/sales',
        },
        {
            id: 4,
            name: 'Tracking',
            url: '/admin/tracking',
        },
        {
            id: 5,
            name: 'Cancellations',
            url: '/admin/cancellations',
        },
        {
            id: 6,
            name: 'Returns',
            url: '/admin/returns',
        },
        {
            id: 7,
            name: 'Replaces',
            url: '/admin/replaces',
        },
        {
            id: 8,
            name: 'Coupons',
            url: '/admin/coupons',
        },
        {
            id: 9,
            name: 'Giftcards',
            url: '/admin/giftcards',
        },
        {
            id: 10,
            name: 'Advanced',
            url: '/admin/advanced',
        },
        {
            id: 11,
            name: 'Catalogue',
            url: '/admin/catalogue',
        },
        {
            id: 12,
            name: 'Recipes',
            url: '/admin/recipes',
        }

    ]
    return (
        <div className='adminsidebar'>
            <div className="sidebar">
                <div className="header">
                    <Link href="/admin">
                        <div className="logo">
                            <Image src={companyLogo} />
                        </div>
                    </Link>
                    <div className="menuicon">
                        <RxHamburgerMenu size={24} />
                    </div>
                </div>

                <div className="sidebaritems">
                    <Link href={'/admin'}>
                        <div className={(pathname === '/admin' || pathname === '/admin/') ? "item active" : "item"} key={1}>
                            <CustomTypography content={'Dashboard'} color={(pathname === '/admin' || pathname === '/admin/') ? 'WHITE' : 'BLACK'}
                                size='MEDIUM-SMALL' weight='MEDIUM'
                            />
                        </div>
                    </Link>
                    {sidebarItems.map((item) => {
                        return (
                            <Link href={item.url}>
                                <div className={pathname.includes(item.url) ? "item active" : "item"} key={item.id}>
                                    <CustomTypography content={item.name} color={pathname.includes(item.url) ? 'WHITE' : 'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                </div>
                            </Link>
                        )
                    })}

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

export default AdminSidebar