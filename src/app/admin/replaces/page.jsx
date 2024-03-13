'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./Replaces.scss";
import SearchInput from '@/library/input/searchinput/SearchInput';
import { getAllReplacementsByAdmin } from '@/services/features/orderSlice';

const Replaces = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { allReplacesByAdmin } = useSelector((state) => state.order);

    const [searchQuery, setSearchQuery] = React.useState('');

    React.useEffect(() => {
        dispatch(getAllReplacementsByAdmin({}))
    }, [])


    const [columnDefs] = React.useState([
        {
            headerName: 'ID',
            field: 'orderId',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Order ID',
            field: 'orderId',
            minWidth: 150
        },
        {
            headerName: 'Item ID',
            field: 'orderItemId',
            minWidth: 150
        },
        {
            headerName: 'Product Name',
            field: 'prd_name',
            minWidth: 150
        },
        {
            headerName: 'Return Comment',
            field: 'return_comment',
            minWidth: 250,
            cellRenderer: (params) => {
                const comment = params.data?.return_comment ? params.data?.return_comment : params.data?.clr_reason;
                return comment;
            }
        },
        {
            headerName: 'Created At',
            field: 'orderItemCreatedAt',
            minWidth:250,
            cellRenderer: (params) => {
                const date = params.data?.orderItemCreatedAt;
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
        <div className='replaces-wrapper'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Replaced Orders"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
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



            <CustomTable columnDefs={columnDefs} rowData={allReplacesByAdmin?.result}
                // selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />
        </div>
    )
}

export default Replaces