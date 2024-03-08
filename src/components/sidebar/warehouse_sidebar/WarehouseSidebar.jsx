"use client"
import React from 'react'
import './WarehouseSidebar.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import Link from 'next/link'
import Image from 'next/image'
import { companyLogo } from '../../../../public/images'
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from 'next/navigation'

const WarehouseSidebar = () => {
    const pathname = usePathname()
    console.log(pathname);

    const sidebarItems = [

      
        {
            id:1,
            name: 'Assigned Orders',
            url: '/warehouse/assigned_orders',
        }

    ]
    return (
        <div className='warehousesidebar'>
            <div className="sidebar">
                <div className="header">
                    <Link href="/warehouse">
                        <div className="logo">
                            <Image src={companyLogo} />
                        </div>
                    </Link>
                    <div className="menuicon">
                        <RxHamburgerMenu size={24} />
                    </div>
                </div>

                <div className="sidebaritems">
                    <Link href={'/warehouse'}>
                        <div className={(pathname === '/warehouse' || pathname === '/warehouse/') ? "item active" : "item"} key={1}>
                            <CustomTypography content={'Warehouse Dashboard'} color={(pathname === '/warehouse' || pathname === '/warehouse/') ? 'WHITE' : 'BLACK'}
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

export default WarehouseSidebar