"use client";
import React from 'react'
import './PurchaseHistory.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Select, SelectItem } from '@nextui-org/react'
import { getUserOrders } from '@/services/features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

const sortOptions = [
    {
        label: 'Latest',
        value: 'latest'
    },
    {
        label: 'Oldest',
        value: 'oldest'
    }
];
const PurchaseHistory = () => {

    const dispatch = useDispatch();
    const [sortBy, setSortBy] = React.useState('');
    const [filters, setFilters] = React.useState('');

    const { userOrders } = useSelector((state) => state.order);

    React.useEffect(() => {
        dispatch(getUserOrders({}))
    }, [])

    return (
        <div className='purchase-history'>
            <div className="header">
                <MdKeyboardArrowLeft size={32} />
                <CustomTypography content={'Purchase History'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div style={{ width: '500px' }} className='flex gap-3 mt-5'>
                <Select
                    size={'md'}
                    // label="Sort By"
                    variant='bordered'
                    labelPlacement='outside'
                    placeholder='Filters'
                    className="max-w-xs"
                    selectedKeys={[filters]}
                    // onSelectionChange={setSortBy}
                    onChange={(e) => {
                        if (e.target?.value !== sortBy) {
                            setFilters(e.target.value)
                        }
                    }}
                >
                    {
                        sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </Select>
                <Select
                    size={'md'}
                    // label="Sort By"
                    variant='bordered'
                    labelPlacement='outside'
                    placeholder='Sort By'
                    className="max-w-xs"
                    selectedKeys={[sortBy]}
                    // onSelectionChange={setSortBy}
                    onChange={(e) => {
                        if (e.target?.value !== sortBy) {
                            setSortBy(e.target.value)
                        }
                    }}
                >
                    {
                        sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </Select>
            </div>



            <div className="orderitems">
                {
                    userOrders?.result?.map((item, i) => {
                        return (
                            <div className="orderitem">
                                <div className="orderitem_header">
                                    <div className='underline'>
                                        <CustomTypography content={`Order #${item?.orderId}`} color={'BLACK'} size='MEDIUM' weight='SEMI-BOLD' />
                                    </div>
                                    <span> </span>
                                    <CustomTypography content={'Order is pending'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                    <span> </span>
                                    <CustomTypography content={'22 Items'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                    <span> </span>
                                    <CustomTypography content={`Total AED ${item?.op_line_total}`} color={'BLACK'} size='MEDIUM' weight='MEDIUM' />
                                    <span> </span>
                                    <CustomTypography content={item?.ord_payment_method === 'Credit Card/ Debit Card' ? 'Prepaid' : 'COD'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                </div>

                                <div className="mt-5">
                                    <CustomTypography content={'Status'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                    <div className="flex items-center gap-4">
                                        <CustomTypography content={'Pending'} color={'BLACK'} size='MEDIUM' weight='SEMI-BOLD' />
                                        <CustomTypography content={'Shipped to Home'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                    </div>
                                </div>

                                <div className='item-images flex items-center gap-5'>
                                    {
                                        item?.products?.map((item, i) => {
                                            return (
                                                <div className='item-image'>
                                                    <Image width={48} height={48} alt="product" src={item?.image_url} />
                                                    <span>{item?.op_qty}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <button className='detailsbtn mt-5' >
                                    View Order details
                                </button>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default PurchaseHistory