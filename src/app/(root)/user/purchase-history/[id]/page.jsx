"use client";
import React from 'react'
import './OrderDetails.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Select, SelectItem } from '@nextui-org/react'
import { getOrder, getUserOrders } from '@/services/features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiDownload } from 'react-icons/fi';

const OrderDetails = ({ params }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { singleOrder } = useSelector((state) => state.order)

    React.useEffect(() => {
        dispatch(getOrder({ id: params.id }));
    }, [params.id]);

    return (
        <div className='orderdetails'>
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Order' + ' ' + params.id} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="flex items-center gap-5">
                    <div className='statusbadge' >
                        <CustomTypography content={"Status"} color="BLACK" size="REGULAR" weight="SEMI-BOLD" />
                    </div>
                    <div className='flex gap-2 cursor-pointer'>
                        <FiDownload size={20} />
                        <CustomTypography content={"Invoice"}
                            style={{ textDecoration: "underline", display: 'inline' }}
                            color='BLACK'
                            size='MEDIUM' weight='SEMI-BOLD' />
                    </div>
                </div>
            </div>


            <div className="orderitems">
                {
                    singleOrder?.result?.map((item, i) => {
                        return (
                            <div className="orderitem">
                                <div className="flex items-center gap-3">
                                    <div className="image">
                                        <Image width={100} height={100}
                                            alt="product"
                                            src={item?.image_url ? item?.image_url : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'}
                                        />
                                    </div>
                                    <div className="details">
                                        <div className="title mb-2 flex gap-4 items-center">
                                            <CustomTypography content={item?.prd_name}
                                                color='BLACK'
                                                size='MEDIUM' weight='SEMI-BOLD' />
                                            <div className='statusbadge' >
                                                <CustomTypography content={"Status"} color="BLACK" size="REGULAR" weight="SEMI-BOLD" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <CustomTypography content={`AED ${parseFloat(item?.op_line_total)?.toFixed(2)}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                            <CustomTypography content={"Quantity - " + item?.op_qty} color="BLACK" size="MEDIUM" weight="REGULAR" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className='detailsbtn mt-5' >
                                        Return
                                    </button>
                                    <button className='detailsbtn mt-5' >
                                        Replace
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default OrderDetails