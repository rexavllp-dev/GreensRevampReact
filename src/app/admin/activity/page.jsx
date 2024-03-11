'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { getActivityLog } from '@/services/features/activitySlice';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./Activity.scss";

const Activity = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { activityLog } = useSelector((state) => state.activity);

    React.useEffect(() => {
        dispatch(getActivityLog({}))
    }, [])


    const [columnDefs] = React.useState([
        {
            headerName: 'Id',
            field: 'id',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Name',
            field: 'usr_name',
            minWidth: 150
        },
        {
            headerName: 'Activity',
            field: 'comment',
            minWidth: 250
        },
        {
            headerName: 'Created At',
            field: 'product_created_at',
            cellRenderer: (params) => {
                const date = params.data?.created_at;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },

    ]);

    const handleRowClick = () => {
        console.log("row clicked")
    }

    return (
        <div className='activity-wrapper'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Activity Log"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>


            <CustomTable columnDefs={columnDefs} rowData={[]}
                // selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />
        </div>
    )
}

export default Activity