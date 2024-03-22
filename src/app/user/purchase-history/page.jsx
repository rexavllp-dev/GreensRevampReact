"use client";
import React from 'react'
import './PurchaseHistory.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Select, SelectItem } from '@nextui-org/react'
import { getUserOrders } from '@/services/features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const sortOptions = [
    {
        label: 'Latest',
        value: 'newest'
    },
    {
        label: 'Oldest',
        value: 'oldest'
    }
];

const filterOptions = [
    {
        label: 'All',
        value: 'All'
    },
    {
        label: 'Completed',
        value: 'Completed'
    },
    {
        label: 'Pending',
        value: 'Pending'
    },
    {
        label: 'In Progress',
        value: 'In Progress'
    },
    {
        label: 'Cancel Request',
        value: 'Cancel Request'
    },
    {
        label: 'Cancelled',
        value: 'Cancelled'
    },
    {
        label: 'Return request',
        value: 'Return request'
    },
    {
        label: 'Returned',
        value: 'Returned'
    },
    {
        label: 'Failed',
        value: 'Failed'
    },
];
const PurchaseHistory = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [sortBy, setSortBy] = React.useState('newest');
    const [filters, setFilters] = React.useState('');

    const { userOrders } = useSelector((state) => state.order);

    React.useEffect(() => {
        dispatch(getUserOrders({ sort: sortBy, filters: filters }))
    }, [sortBy, filters]);

    return (
        <div className='purchase-history'>
            <div className="header">
                <div className="cursor-pointer" onClick={() => router.back()}>
                    <MdKeyboardArrowLeft size={32} />
                </div>
                <CustomTypography content={'Purchase History'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div style={{ width: '500px' }} className='flex gap-3 mt-5'>
                <Select
                    size={'md'}
                    label="Filters"
                    variant='underlined'
                    // labelPlacement='outside'
                    // placeholder='Filters'
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
                        filterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </Select>
                <Select
                    size={'md'}
                    label="Sort By"
                    variant='underlined'
                    // labelPlacement='outside'
                    // placeholder='Sort By'
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
                                    <CustomTypography content={item?.op_is_cancel ? 'Cancelled' : 'Order is pending'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                    <span> </span>
                                    <CustomTypography content={item?.productTotalQty + ' Items'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                    <span> </span>
                                    <CustomTypography content={`Total AED ${item?.ord_grand_total}`} color={'BLACK'} size='MEDIUM' weight='MEDIUM' />
                                    <span> </span>
                                    <CustomTypography content={item?.ord_payment_method === 'Credit Card/ Debit Card' ? 'Prepaid' : 'COD'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                </div>

                                <div className="mt-5 flex items-start gap-4">
                                    <div>
                                        <CustomTypography content={'Status'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                        {
                                            item?.op_is_cancel ?
                                                <CustomTypography content={'Cancelled'} color={'BLACK'} size='MEDIUM' weight='SEMI-BOLD' />
                                                :
                                                <CustomTypography content={'Pending'} color={'BLACK'} size='MEDIUM' weight='SEMI-BOLD' />
                                        }
                                    </div>
                                    {
                                        item?.ord_shipping_method === 'Shipping' ?
                                            <div className="">
                                                <CustomTypography content={'Shipping to ' + item?.address_line_1} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                            </div>
                                            :
                                            <div>
                                                <CustomTypography content={'Self Collect'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                            </div>
                                    }
                                </div>

                                <div className='item-images flex items-center gap-5'>
                                    {
                                        item?.products?.map((item, i) => {
                                            return (
                                                <div className='item-image'>
                                                    <Image width={48} height={48} alt="product"
                                                        src={item?.image_url ?
                                                            item?.image_url :
                                                            'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'}
                                                    />
                                                    <span>{item?.op_qty}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>

                                <button className='detailsbtn mt-5' onClick={() => router.push(`/user/purchase-history/${item?.orderId}`)}>
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