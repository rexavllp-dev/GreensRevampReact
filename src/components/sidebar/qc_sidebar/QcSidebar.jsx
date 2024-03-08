"use client"
import React from 'react'
import './QcSidebar.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import Link from 'next/link'
import Image from 'next/image'
import { companyLogo } from '../../../../public/images'
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from 'next/navigation'

const QcSidebar = () => {
    const pathname = usePathname()
    console.log(pathname);

    const sidebarItems = [

        {
            id: 2,
            name: 'Assigned Orders',
            url: '/qc/assigned_orders',
        },

        
   

    ]
    return (
        <div className='qcsidebar'>
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
                    <Link href={'/qc'}>
                        <div className={(pathname === '/qc' || pathname === '/qc/') ? "item active" : "item"} key={1}>
                            <CustomTypography content={'Qc Dashboard'} color={(pathname === '/admin' || pathname === '/admin/') ? 'WHITE' : 'BLACK'}
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

export default QcSidebar