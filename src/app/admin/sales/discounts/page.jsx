'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./Discounts.scss";
import { getAllOrdersByAdmin } from '@/services/features/orderSlice';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { Select, SelectItem } from '@nextui-org/react';
import { getDrivers, getWarehouseUsers } from '@/services/features/userSlice';
import { getAllTransactions } from '@/services/features/paymentSlice';

const Discounts = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { allOrders } = useSelector((state) => state.order);
    const { allTransactions } = useSelector(state => state.payment);

    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        // dispatch(getAllTransactions({}));
    }, [])

    const [columnDefs] = React.useState([
        {
            headerName: 'ID',
            field: 'id',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Order ID',
            field: 'order_id',
            minWidth: 150
        },
        {
            headerName: 'Transaction ID',   
            field: 'stripe_transaction_id',
            minWidth: 150
        },
        {
            headerName: 'Payment Method',
            field: 'payement_method',
            minWidth: 150,
            cellRenderer: (params) => {
                return 'Credit / Debit Cards'
            }
        },
        {
            headerName: 'Created At',
            field: 'created_at',
            minWidth: 250,
            cellRenderer: (params) => {
                const date = params.data?.created_at;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },

    ]);


    const handleRowClick = (data) => {
        router.push(`/admin/orders/${data?.orderId}`)
    }

    return (
        <div className='transactions-wrapper'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Discounts"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput name={'search'} value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="right">

                </div>
            </div>



            <CustomTable columnDefs={columnDefs} rowData={allTransactions?.result}
                // selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />
        </div>
    )
}

export default Discounts