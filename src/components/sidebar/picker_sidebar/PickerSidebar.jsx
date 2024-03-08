"use client"
import React from 'react'
import './PickerSidebar.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import Link from 'next/link'
import Image from 'next/image'
import { companyLogo } from '../../../../public/images'
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from 'next/navigation'

const PickerSidebar = () => {
    const pathname = usePathname()
    console.log(pathname);

    const sidebarItems = [

      
        {
            id:1,
            name: 'Verified Orders',
            url: '/picker/verified_orders',
        }

    ]
    return (
        <div className='pickersidebar'>
            <div className="sidebar">
                <div className="header">
                    <Link href="/picker">
                        <div className="logo">
                            <Image src={companyLogo} />
                        </div>
                    </Link>
                    <div className="menuicon">
                        <RxHamburgerMenu size={24} />
                    </div>
                </div>

                <div className="sidebaritems">
                    <Link href={'/picker'}>
                        <div className={(pathname === '/picker' || pathname === '/picker/') ? "item active" : "item"} key={1}>
                            <CustomTypography content={'Picker Dashboard'} color={(pathname === '/picker' || pathname === '/picker/') ? 'WHITE' : 'BLACK'}
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

export default PickerSidebar