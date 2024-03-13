'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./Orders.scss";
import { getAllOrdersByAdmin } from '@/services/features/orderSlice';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { Select, SelectItem } from '@nextui-org/react';
import { getDrivers, getWarehouseUsers } from '@/services/features/userSlice';

const Orders = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { allOrders } = useSelector((state) => state.order);
    const { allDrivers, warehouseUsers } = useSelector(state => state.users);

    const [searchQuery, setSearchQuery] = React.useState('');
    const [sortBy, setSortBy] = React.useState('');
    // const [paymentMethod, setPaymentMethod] = React.useState('');

    const [filters, setFilters] = React.useState({
        payment_method: '',
        order_status_id: '',
        driver_id: '',
        accepted_by: ''
    });

    React.useEffect(() => {
        dispatch(getAllOrdersByAdmin({}));
    }, [])

    React.useEffect(() => {
        dispatch(getDrivers({}));
        dispatch(getWarehouseUsers({}))
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
            headerName: 'Customer Name',
            field: 'ord_customer_name',
            minWidth: 150
        },
        {
            headerName: 'Customer Phone',
            field: 'ord_customer_phone',
            minWidth: 150
        },
        {
            headerName: 'Customer Email',
            field: 'ord_customer_email',
            minWidth: 250
        },
        {
            headerName: 'Status',
            field: 'status_name',
            minWidth: 250
        },
        {
            headerName: 'Total',
            field: 'ord_grand_total',
            minWidth: 250
        },
        {
            headerName: 'Payment Type',
            field: 'ord_payment_method',
            minWidth: 250
        },
        {
            headerName: 'Shipping',
            field: 'ord_shipping_method',
            minWidth: 250
        },
        {
            headerName: 'Accepted By',
            field: 'warehouse_firstname',
            minWidth: 250,
            cellRenderer: (params) => {
                const name = params.data?.warehouse_firstname;
                if (!name) return "Not Accepted";
                return name;
            }
        },
        {
            headerName: 'Delivered By',
            field: 'delivery_boy_firstname',
            minWidth: 250,
            cellRenderer: (params) => {
                const name = params.data?.delivery_boy_firstname;
                if (!name) return "Not Delivered";
                return name;
            }
        },
        {
            headerName: 'Created At',
            field: 'product_created_at',
            minWidth: 250,
            cellRenderer: (params) => {
                const date = params.data?.created_at;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },

    ]);

    const sortOptions = [
        {
            label: 'Newest',
            value: 'newest'
        },
        {
            label: 'Oldest',
            value: 'oldest'
        },
        {
            label: 'Date',
            value: 'date'
        }
    ];

    const orderStatusOptions = [
        {
            label: 'Pending',
            value: 1
        },
        {
            label: 'Moved to QC',
            value: 2
        },
        {
            label: 'Ready To Dispatch',
            value: 3
        },
        {
            label: 'Out For Delivery',
            value: 4
        },
        {
            label: 'Completed',
            value: 5
        },
        {
            label: 'Canceled',
            value: 6
        },
    ];


    const paymentTypeOptions = [
        {
            label: 'Credit Card/ Debit Card',
            value: 'Credit Card/ Debit Card'
        },
        {
            label: 'Cash on Delivery',
            value: 'Cash on Delivery'
        }
    ];


    const handleRowClick = (data) => {
        router.push(`/admin/orders/${data?.orderId}`)
    }

    return (
        <div className='orders-wrapper'>

            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Orders"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="flex">
                <div style={{ width: '200px' }} className='mr-3'>
                    {/* <CustomSelect label={'Sort By'}
                                value={sortBy} name={'sort_by'}
                                data={sortOptions} onChange={(e) => { handleInputChange({ e }) }}
                            /> */}
                    <Select
                        size={'md'}
                        label="Sort By"
                        variant='underlined'
                        // labelPlacement='outside'
                        placeholder='Sort By'
                        className="max-w-xs"
                        selectedKeys={[sortBy]}
                        // onSelectionChange={setSortBy}
                        onChange={(e) => {
                            if (e.target?.value !== sortBy) {
                                setSortBy(e.target.value)
                            }
                        }}
                    >
                        {
                            sortOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
                <div style={{ width: '200px' }} className='mr-3'>
                    <Select
                        size={'md'}
                        label="Order Status"
                        variant='underlined'
                        // labelPlacement='outside'
                        // placeholder=''
                        className="max-w-xs"
                        selectedKeys={[filters?.order_status_id]}
                        // onSelectionChange={setSortBy}
                        onChange={(e) => {
                            setFilters((prev) => ({ ...prev, order_status_id: e.target.value }));
                        }}
                    >
                        {
                            orderStatusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
                <div style={{ width: '200px' }} className='mr-3'>
                    <Select
                        size={'md'}
                        label="Driver"
                        variant='underlined'
                        // labelPlacement='outside'
                        // placeholder=''
                        className="max-w-xs"
                        selectedKeys={[filters?.driver_id]}
                        // onSelectionChange={setSortBy}
                        onChange={(e) => {
                            setFilters((prev) => ({ ...prev, driver_id: e.target.value }));
                        }}
                    >
                        {
                            allDrivers?.result?.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                    {option.usr_firstname}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
                <div style={{ width: '200px' }} className='mr-3'>
                    <Select
                        size={'md'}
                        label="Payment Type"
                        variant='underlined'
                        // labelPlacement='outside'
                        // placeholder=''
                        className="max-w-xs"
                        selectedKeys={[filters?.payment_method]}
                        // onSelectionChange={setSortBy}
                        onChange={(e) => {
                            setFilters((prev) => ({ ...prev, payment_method: e.target.value }));
                        }}
                    >
                        {
                            paymentTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
                <div style={{ width: '200px' }} className='mr-3'>
                    <Select
                        size={'md'}
                        label="Shipping Type"
                        variant='underlined'
                        // labelPlacement='outside'
                        // placeholder=''
                        className="max-w-xs"
                        selectedKeys={[sortBy]}
                        // onSelectionChange={setSortBy}
                        onChange={(e) => {
                            if (e.target?.value !== sortBy) {
                                setSortBy(e.target.value)
                            }
                        }}
                    >
                        {
                            orderStatusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
                <div style={{ width: '200px' }} className='mr-3'>
                    <Select
                        size={'md'}
                        label="Accepted by"
                        variant='underlined'
                        // labelPlacement='outside'
                        // placeholder=''
                        className="max-w-xs"
                        selectedKeys={[filters?.accepted_by]}
                        // onSelectionChange={setSortBy}
                        onChange={(e) => {
                            setFilters((prev) => ({ ...prev, accepted_by: e.target.value }));
                        }}
                    >
                        {
                            warehouseUsers?.result?.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                    {option.usr_firstname}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
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



            <CustomTable columnDefs={columnDefs} rowData={allOrders?.result}
                // selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />
        </div>
    )
}

export default Orders