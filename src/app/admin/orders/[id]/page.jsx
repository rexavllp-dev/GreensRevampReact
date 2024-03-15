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
import CustomButton from '@/library/buttons/CustomButton';
import OrderUpdateModal from '@/components/modal/order/update/OrderUpdateModal';
import CancelOrderModal from '@/components/modal/order/update/CancelOrderModal';
import CancelIndividualOrderModal from '@/components/modal/order/update/CancelIndividualOrderModal';

const OrderDetails = ({ params }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { singleOrder } = useSelector((state) => state.order);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
    const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = React.useState(false);
    const [isCancelIndividualOrderModalOpen, setIsCancelIndividualOrderModalOpen] = React.useState(false);
    const [editData, setEditData] = React.useState({});

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

    const handleCancelOrder = () => {
        setIsCancelOrderModalOpen(true);

    }

    const handleShowStatus = (item) => {
        if (item?.op_is_cancel) {
            return 'Cancelled';
        } else if (item?.op_is_return) {
            return 'Returned';
        } else {
            return 'Pending';
        }
    };

    return (
        <div className='order-details-admin'>
            <div className="header mb-3 flex justify-between">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Order' + ' ' + params.id} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="flex items-center gap-5">
                    {
                        (singleOrder?.result && singleOrder?.result[0]?.status_name === 'Canceled') ?
                            <CustomTypography content={'Cancelled'} weight="BOLD" color="RED" size="SUPER-LARGE" />
                            :
                            <CustomButton variant="primary" label='Cancel Order' onClick={() => handleCancelOrder()} />
                    }
                </div>
            </div>

            <CustomTabs tabs={tabs} />

            <Table className='ml-5 mr-5 mt-5' border={true} aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>PRODUCT</TableColumn>
                    <TableColumn>UNIT PRICE</TableColumn>
                    <TableColumn>QUANTITY</TableColumn>
                    <TableColumn>LINE TOTAL</TableColumn>
                    <TableColumn>REFUND TYPE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTION</TableColumn>
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
                                    <TableCell>{item?.refund_type}</TableCell>
                                    <TableCell>{handleShowStatus(item)}</TableCell>
                                    <TableCell className='flex flex-col gap-3'>
                                        <CustomButton variant="primary" label='Cancel Product'
                                            onClick={() => {
                                                setEditData({ ...item })
                                                setIsCancelIndividualOrderModalOpen(true)
                                            }}
                                        />
                                        <CustomButton variant="transparent" label='Update Product'
                                            onClick={() => {
                                                setEditData({ ...item })
                                                setIsUpdateModalOpen(true)
                                            }} />
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }

                </TableBody>
            </Table>

            <OrderUpdateModal open={isUpdateModalOpen} handleClose={() => setIsUpdateModalOpen(false)} editData={editData} />
            <CancelIndividualOrderModal open={isCancelIndividualOrderModalOpen} handleClose={() => setIsCancelIndividualOrderModalOpen(false)} editData={editData} />
            <CancelOrderModal open={isCancelOrderModalOpen} handleClose={() => setIsCancelOrderModalOpen(false)} id={params.id} />
        </div>
    )
}

export default OrderDetails