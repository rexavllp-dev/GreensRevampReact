"use client";
import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { Card, CardBody, Chip, Select, SelectItem, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from '@nextui-org/react'
import { convertDate } from '@/utils/helpers/convertDate'
import CancelIndividualOrderModal from '@/components/modal/order/update/CancelIndividualOrderModal';
import OrderUpdateModal from '@/components/modal/order/update/OrderUpdateModal';
import CustomButton from '@/library/buttons/CustomButton';
import ReturnReplaceDriverModal from '@/components/modal/order/update/ReturnReplaceDriverModal';


const OrderItems = ({ data, allOrderItems, orderId }) => {

    const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
    const [isCancelIndividualOrderModalOpen, setIsCancelIndividualOrderModalOpen] = React.useState(false);
    const [isReturnReplaceDriverModalOpen, setIsReturnReplaceDriverModalOpen] = React.useState(false);
    const [editData, setEditData] = React.useState({});
    const [isReturn, setIsReturn] = React.useState(false);
    const [orderItemId, setOrderItemId] = React.useState('');

    const handleShowStatus = (item) => {
        if (data?.status_name === 'Canceled') {
            return <Chip color={"danger"} variant="dot">Order Cancelled</Chip>
        }
        else if (item?.op_is_cancel) {
            return <Chip color={"danger"} variant="dot">Item Cancelled</Chip>
        } else if (item?.op_is_return) {
            return <Chip color={"danger"} variant="dot">Item Returned</Chip>
        }
        if (data?.ord_order_status == 5) {

            if (item?.replaceId != null) {
                if (item?.replace_status_name === null || item?.replace_status_name === "Pending") {
                    return <Chip color={"warning"} variant="dot">Replace Request Pending</Chip>
                } else if (item?.replace_status_name === "Approved") {
                    //accepted replace request
                    return <Chip color={"success"} variant="dot">Replace Request Accepted</Chip>
                } else if (item?.replace_status_name === "Rejected") {
                    //rejected replace request
                    return <Chip color={"danger"} variant="dot">Replace Request Rejected</Chip>
                } else if (item?.replace_status_name === "Replaced") {
                    return <Chip color={"success"} variant="dot">Replaced</Chip>
                }

            } else if (item?.returnId != null) {

                if (item?.return_status_name === null || item?.return_status_name === "Pending") {
                    return <Chip color={"warning"} variant="dot">Return Request Pending</Chip>
                } else if (item?.return_status_name === "Approved") {
                    //accepted return request
                    return <Chip color={"success"} variant="dot">Return Request Accepted</Chip>
                } else if (item?.return_status_name === "Rejected") {
                    //rejected return request
                    return <Chip color={"danger"} variant="dot">Return Request Rejected</Chip>
                } else if (item?.return_status_name === "Returned") {
                    return <Chip color={"success"} variant="dot">Return</Chip>
                }
            } else {
                return <Chip color={"success"} variant="dot">Completed</Chip>
            }
        };

        if (data?.ord_order_status == 1) {
            return <Chip color={"success"} variant="dot">Pending</Chip>
        }

    };

    const renderActionButton = (item) => {
        if (data?.status_name === 'Canceled') {
            return ''
        }
        if (data?.ord_order_status == 1 || data?.ord_order_status == 2 || data?.ord_order_status === null) {
            return (
                <>
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
                </>
            )
        }
        if (data?.ord_order_status == 5) {

            if (item?.replaceId != null) {
                if (item?.replace_status_name === null || item?.replace_status_name === "Pending") {
                    return (
                        <>
                            <CustomButton variant="primary" label='Assign Driver'
                                onClick={() => {
                                    setIsReturn(false);
                                    setOrderItemId(item?.itemId);
                                    setIsReturnReplaceDriverModalOpen(true);
                                }}
                            />
                            <CustomButton variant="transparent" label='Reject Request'
                                onClick={() => {
                                    // setIsUpdateModalOpen(true)
                                }} />
                        </>
                    )
                } else if (item?.replace_status_name === "Approved") {
                    //accepted replace request
                    return ""
                } else if (item?.replace_status_name === "Rejected") {
                    //rejected replace request
                    return ""
                } else if (item?.replace_status_name === "Replaced") {
                    return ""
                }

            } else if (item?.returnId != null) {

                if (item?.return_status_name === null || item?.return_status_name === "Pending") {
                    return (
                        <>
                            <CustomButton variant="primary" label='Assign Driver'
                                onClick={() => {
                                    setIsReturn(true);
                                    setOrderItemId(item?.itemId);
                                    setIsReturnReplaceDriverModalOpen(true)
                                }}
                            />
                            <CustomButton variant="transparent" label='Reject Request'
                                onClick={() => {

                                    // setIsUpdateModalOpen(true)
                                }} />
                        </>
                    )
                } else if (item?.return_status_name === "Approved") {
                    //accepted return request
                    return ""
                } else if (item?.return_status_name === "Rejected") {
                    //rejected return request
                    return ""
                } else if (item?.return_status_name === "Returned") {
                    //returned item
                    return ""
                }
            }
        };
    };
    return (
        <Card >
            <CardBody>
                <Table className='' border={false} aria-label="Example static collection table">
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
                            allOrderItems?.result?.map((item, index) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item?.prd_name}</TableCell>
                                        <TableCell>{item?.op_unit_price}</TableCell>
                                        <TableCell>{item?.op_qty}</TableCell>
                                        <TableCell>{item?.op_line_total}</TableCell>
                                        <TableCell>{item?.refund_type}</TableCell>
                                        <TableCell>{handleShowStatus(item)}</TableCell>
                                        <TableCell className='flex flex-col gap-3'>
                                            {
                                                renderActionButton(item)
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
                <OrderUpdateModal open={isUpdateModalOpen}
                    handleClose={() => setIsUpdateModalOpen(false)} editData={editData}
                />

                <CancelIndividualOrderModal open={isCancelIndividualOrderModalOpen}
                    handleClose={() => setIsCancelIndividualOrderModalOpen(false)} editData={editData}
                />

                <ReturnReplaceDriverModal open={isReturnReplaceDriverModalOpen}
                    handleClose={() => setIsReturnReplaceDriverModalOpen(false)}
                    isReturn={isReturn} orderId={orderId}
                    orderItemId={orderItemId}
                />

            </CardBody>
        </Card>
    )
}

export default OrderItems