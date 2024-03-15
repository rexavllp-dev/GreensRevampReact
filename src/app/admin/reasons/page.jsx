'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./Reasons.scss";
import SearchInput from '@/library/input/searchinput/SearchInput';
import { deleteReason, getAllReasons, getAllReplacementsByAdmin } from '@/services/features/orderSlice';
import CreateReasonModal from '@/components/modal/reasons/CreateReasonModal';
import CustomButton from '@/library/buttons/CustomButton';
import { Chip, Select, SelectItem } from '@nextui-org/react';
import { toast } from 'react-toastify';

const Reasons = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { allReasons, isUpdatedReason, isDeletedReason, isCreatedReason } = useSelector((state) => state.order);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [createReasonModalOpen, setCreateReasonModalOpen] = React.useState(false);
    const [type, setType] = React.useState('');

    React.useEffect(() => {
        dispatch(getAllReasons({ type }));
    }, [isUpdatedReason, isDeletedReason, isCreatedReason])

    const reasonTypes = [
        {
            id: 1,
            label: 'Return',
            value: 'return'
        },
        {
            id: 2,
            label: 'Replace',
            value: 'replace'
        },
        {
            id: 3,
            label: 'Cancel',
            value: 'cancel'
        },
        {
            id: 4,
            label: 'Other',
            value: 'other'
        }
    ]

    const CheckIcon = ({
        size,
        height,
        width,
        ...props
    }) => {
        return (
            <svg
                width={size || width || 24}
                height={size || height || 24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                {...props}
            >
                <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="currentColor" />
            </svg>
        );
    };



    const [columnDefs] = React.useState([
        {
            headerName: 'ID',
            field: 'id',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Reason',
            field: 'clr_reason',
            minWidth: 150
        },
        {
            headerName: 'Reason Type',
            field: 'reason_type',
            minWidth: 150
        },
        {
            headerName: 'Status',
            field: 'clr_status',
            minWidth: 150,
            cellRenderer: (params) => {
                if (params.data?.clr_status) {
                    return <Chip
                        startContent={<CheckIcon size={18} />}
                        variant="faded"
                        color="success"
                    >
                        Active
                    </Chip>
                } else {
                    return <Chip style={{ backgroundColor: '#c61212', color: 'white' }}
                        startContent={<CheckIcon size={18} />} variant="faded" color="success">Inactive</Chip>
                }
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

    }

    const handleDeleteReasons = () => {
        if (selectedRows.length > 0) {
            const data = selectedRows.map(row => row.id);
            dispatch(deleteReason({ data: data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
        }
    }

    return (
        <div className='reasons-wrapper'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Reasons"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput name={'search'} value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* <Select
                    size={'md'}
                    label="Reason Type"
                    variant='underlined'
                    // labelPlacement='outside'
                    placeholder='Reason Type'
                    className="max-w-xs"
                    selectedKeys={[type]}
                    // onSelectionChange={setSortBy}
                    onChange={(e) => {
                        setType(e.target.value)
                    }}
                >
                    {
                        reasonTypes.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))
                    }
                </Select> */}
                <div className="right">
                    <CustomButton label="Delete" variant="danger" height={'42px'} onClick={() => handleDeleteReasons()} />
                    <CustomButton label='Create Reason' variant='primary' height={'42px'} onClick={() => setCreateReasonModalOpen(true)} />
                </div>
            </div>



            <CustomTable columnDefs={columnDefs} rowData={allReasons?.result}
                selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />

            <CreateReasonModal open={createReasonModalOpen} handleClose={() => setCreateReasonModalOpen(false)} />
        </div>
    )
}

export default Reasons