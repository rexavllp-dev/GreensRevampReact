"use client";
import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Card, CardBody, Select, SelectItem, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react'
import { cancelOrder, getOrder, getUserOrders } from '@/services/features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import './OrderDetails.scss'
import OrderInformation from './tabs/orderinfo/OrderInformation';
import AccountInformation from './tabs/accountinfo/AccountInformation';
import AddressInformation from './tabs/addressinfo/AddressInformation';
import CustomTabs from '@/components/customtabs/CustomTabs';

const OrderDetails = ({ params }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { singleOrder } = useSelector((state) => state.order)

    const order = singleOrder?.result ? singleOrder?.result[0] : {};

    React.useEffect(() => {
        dispatch(getOrder({ id: params.id }));
    }, [params.id]);



    const tabs = [
        {
            id: 1,
            label: "Order Information",
            component: <OrderInformation data={order} />
        },
        {
            id: 2,
            label: "Account Information",
            component: <AccountInformation data={order} />
        },
        {
            id: 3,
            label: "Address",
            component: <AddressInformation data={order} />
        },
    ]

    return (
        <div className='order-details-admin'>
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Order' + ' ' + params.id} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="flex items-center gap-5">

                </div>
            </div>

            <CustomTabs tabs={tabs} />

            <Table className='ml-5' aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>PRODUCT</TableColumn>
                    <TableColumn>UNIT PRICE</TableColumn>
                    <TableColumn>QUANTITY</TableColumn>
                    <TableColumn>LINE TOTAL</TableColumn>
                    <TableColumn>REFUND TYPE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                    {
                        order?.orderItems?.map((item, index) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item?.product_name}</TableCell>
                                    <TableCell>{item?.order_op_unit_price}</TableCell>
                                    <TableCell>{item?.order_op_qty}</TableCell>
                                    <TableCell>{item?.order_op_line_total}</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>Active</TableCell>
                                </TableRow>
                            )
                        })
                    }

                </TableBody>
            </Table>

        </div>
    )
}

export default OrderDetails