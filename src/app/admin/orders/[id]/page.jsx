"use client";
import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Card, CardBody, Select, SelectItem, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react'
import { cancelOrder, getAllOrderItems, getOrder, getOrderItem, getUserOrders } from '@/services/features/orderSlice';
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
import OrderItems from './tabs/orderitems/OrderItems';

const OrderDetails = ({ params }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { singleOrder, allOrderItems,
        isOrderQuantityUpdated, isIndividualOrderCanceled,
        isReturnReplaceDriverAssigned } = useSelector((state) => state.order);

    const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = React.useState(false);


    const order = singleOrder?.result ? singleOrder?.result[0] : {};

    React.useEffect(() => {
        dispatch(getOrder({ id: params.id }));
        dispatch(getAllOrderItems({ id: params.id }));
    }, [params.id, isOrderQuantityUpdated, isIndividualOrderCanceled, isReturnReplaceDriverAssigned]);

    const tabs = [
        {
            id: 1,
            label: "Order Items",
            component: <OrderItems orderId={params.id} data={order} allOrderItems={allOrderItems} />
        },
        {
            id: 2,
            label: "Order Information",
            component: <OrderInformation data={order} />
        },
        {
            id: 3,
            label: "Account Information",
            component: <AccountInformation data={order} />
        },
        {
            id: 4,
            label: "Address",
            component: <AddressInformation data={order} />
        },
    ]

    const handleCancelOrder = () => {
        setIsCancelOrderModalOpen(true);

    }



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
                            (
                                (order?.ord_order_status == 1) || (order?.ord_order_status == 2) || (order?.ord_order_status === null)
                                    ?
                                    <CustomButton variant="primary" label='Cancel Order' onClick={() => handleCancelOrder()} />
                                    : <></>
                            )
                    }
                </div>
            </div>

            <CustomTabs tabs={tabs} />


            <CancelOrderModal open={isCancelOrderModalOpen} handleClose={() => setIsCancelOrderModalOpen(false)} id={params.id} />
        </div>
    )
}

export default OrderDetails