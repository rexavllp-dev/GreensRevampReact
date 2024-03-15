'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./Cancellations.scss";
import { getAllOrdersByAdmin, getCancelledOrders } from '@/services/features/orderSlice';
import SearchInput from '@/library/input/searchinput/SearchInput';

const Cancellations = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { cancelledOrders } = useSelector((state) => state.order);

    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        dispatch(getCancelledOrders({}))
    }, [])


    const [columnDefs] = React.useState([
        {
            headerName: '',
            field: 'cancelOrderId',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Order ID',
            field: 'cancelOrderId',
            minWidth: 150
        },
        {
            headerName: 'Cancel Date & Time',
            field: 'cancelOrderDate',
            minWidth:250,
            cellRenderer: (params) => {
                const date = params.data?.cancelOrderDate;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },
        // {
        //     headerName: 'Product Name',
        //     field: 'ord_customer_phone',
        //     minWidth: 150
        // },
        {
            headerName: 'Reason',
            field: 'clr_reason',
            minWidth: 250,
            cellRenderer: (params) => {
                const reason = params.data?.clr_reason ? params.data?.clr_reason : params.data?.cancel_note;
                return reason;
            }
        },
        {
            headerName: 'Order Date',
            field: 'orderDate',
            minWidth:250,
            cellRenderer: (params) => {
                const date = params.data?.orderDate;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },

    ]);

    const handleRowClick = (data)=>{
        router.push(`/admin/orders/${data?.orderId}`)
    }

    return (
        <div className='cancellations-wrapper'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Cancellations"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
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



            <CustomTable columnDefs={columnDefs} rowData={cancelledOrders?.result}
                // selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />
        </div>
    )
}

export default Cancellations