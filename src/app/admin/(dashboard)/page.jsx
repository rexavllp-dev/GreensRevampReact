'use client';
import React from "react";
import CustomTable from "@/components/customtable/CustomTable";
import './AdminDashboard.scss';
import TabCard from "@/components/cards/tabcard/TabCard";
import DashboardTable from "@/components/customtable/DashboardTable";
import { cancelledOrdersColumns, companyVerificationColumns, expiringProductsColumns, expiringTradeLicensesColumn, minQtyProductColumns, orderColumns, outOfStockColumns, replacedOrdersColumns, returnedOrdersColumns } from "@/constants/constants";
import { getAllOrdersByAdmin } from "@/services/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomTypography from "@/library/typography/CustomTypography";
// import ChartComponent from "@/components/chart/ChartComponent";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { getAllMinQtyProducts, getExpiredProducts, getExpiredTradeLicenses, getLatestCancelledOrders, getLatestOrders, getLatestReplacedOrders, getLatestReturnedOrders, getOutOfStockProducts, getPendingCompanyApprovals, getTotalCountDashboard, getTotalOrderCount, getTotalSales } from "@/services/features/adminSlice";
import CustomButton from "@/library/buttons/CustomButton";


export default function AdminDashboard() {
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = React.useState(0)
    const [tableData, setTableData] = React.useState([])
    const [tableColumns, setTableColumns] = React.useState(orderColumns || [])
    const [key, setKey] = React.useState('')
    const [totalOrdersFilterBy, setTotalOrdersFilterBy] = React.useState('all')
    const [totalSalesFilterBy, setTotalSalesFilterBy] = React.useState('today')

    const { latestOrders, latestCancelledOrders, latestReturnedOrders,
        latestReplacedOrders, outOfStockProducts, expiredTradeLicenses,
        expiredProducts, allMinQtyProducts, totalCountDashboard,
        pendingCompanyApprovals,
        totalSales, totalOrderCount } = useSelector((state) => state.admin);

    React.useEffect(() => {
        dispatch(getTotalSales({ filterBy: totalSalesFilterBy, fromDate: null, toDate: null }))
    }, [totalSalesFilterBy])

    React.useEffect(() => {
        dispatch(getPendingCompanyApprovals({}))
        dispatch(getTotalCountDashboard({}))
    }, [])

    React.useEffect(() => {
        dispatch(getTotalOrderCount({filter: totalOrdersFilterBy}))
    }, [totalOrdersFilterBy])

    React.useEffect(() => {
        if (selectedTab === 0) {

            dispatch(getLatestOrders({}));
            setTableData(latestOrders?.result?.data || [])
            setTableColumns(orderColumns)

        } else if (selectedTab === 1) {

            dispatch(getLatestCancelledOrders({}))
            setTableData(latestCancelledOrders?.result?.canceledOrders || [])
            setTableColumns(cancelledOrdersColumns)

        } else if (selectedTab === 2) {

            dispatch(getLatestReturnedOrders({}))
            setTableData(latestReturnedOrders?.result?.data || [])
            setTableColumns(returnedOrdersColumns)

        } else if (selectedTab === 3) {

            dispatch(getLatestReplacedOrders({}))
            setTableData(latestReplacedOrders?.result?.data || [])
            setTableColumns(replacedOrdersColumns)

        } else if (selectedTab === 4) {

            dispatch(getOutOfStockProducts({}))
            setTableData(outOfStockProducts?.result?.data || [])
            setTableColumns(outOfStockColumns)

        } else if (selectedTab === 5) {

            dispatch(getExpiredProducts({}))
            setTableData(expiredProducts?.result?.data || [])
            setTableColumns(expiringProductsColumns)

        } else if (selectedTab === 6) {

            dispatch(getAllMinQtyProducts({}))
            setTableData(allMinQtyProducts?.result?.data || [])
            setTableColumns(minQtyProductColumns)

        } else if (selectedTab === 9) {

            dispatch(getExpiredTradeLicenses({}))
            setTableData(expiredTradeLicenses?.result?.data || [])
            setTableColumns(expiringTradeLicensesColumn)
        } else if (selectedTab === 10) {
            dispatch(getPendingCompanyApprovals({}))
            setTableData(pendingCompanyApprovals?.result || [])
            setTableColumns(companyVerificationColumns)
        }
    }, [selectedTab])

    React.useEffect(() => {
        if (selectedTab === 0) {
            setTableData(latestOrders?.result?.data || [])
            setKey('orderId')
        }
        else if (selectedTab === 1) {
            setTableData(latestCancelledOrders?.result?.canceledOrders || [])
            setKey('id')
        } else if (selectedTab === 2) {
            setTableData(latestReturnedOrders?.result?.data || [])
        } else if (selectedTab === 3) {
            setTableData(latestReplacedOrders?.result?.data || [])
        } else if (selectedTab === 4) {
            setTableData(outOfStockProducts?.result?.data || [])
        } else if (selectedTab === 5) {
            setTableData(expiredProducts?.result?.data || [])
        } else if (selectedTab === 6) {
            setTableData(allMinQtyProducts?.result?.data || [])
        } else if (selectedTab === 9) {

        } else if (selectedTab === 10) {
            setTableData(pendingCompanyApprovals?.result || [])
        }
    }, [latestOrders, latestCancelledOrders, latestReturnedOrders, latestReplacedOrders, outOfStockProducts, expiredProducts, allMinQtyProducts, pendingCompanyApprovals])



    const cardItems = [
        {
            id: 0,
            title: "Latest Orders",
            count: totalCountDashboard?.result?.totalRecentOrders,
            column: orderColumns
        },
        {
            id: 1,
            title: "Latest Cancelled Orders",
            count: totalCountDashboard?.result?.totalCanceledOrders,
            column: orderColumns
        },
        {
            id: 10,
            title: "Pending Company Approvals",
            count: pendingCompanyApprovals?.result?.length,
            column: orderColumns
        },
        {
            id: 2,
            title: "Latest Returned Orders",
            count: totalCountDashboard?.result?.totalExpiredProducts,
            column: orderColumns
        },
        {
            id: 3,
            title: "Latest Replaced Orders",
            count: totalCountDashboard?.result?.totalReplacementOrders,
            column: orderColumns
        },
        {
            id: 4,
            title: "Out of Stock Products",
            count: totalCountDashboard?.result?.totalOutOfStockProducts,
            column: orderColumns
        },
        {
            id: 5,
            title: "Product Expiry",
            count: totalCountDashboard?.result?.totalExpiredProducts,
            column: orderColumns
        },
        {
            id: 6,
            title: "Minimum Quantity",
            count: totalCountDashboard?.result?.totalProductsMinQty,
            column: orderColumns
        },
        {
            id: 7,
            title: "Gift Cards Orders",
            count: 0,
            column: orderColumns
        },
        {
            id: 8,
            title: "Reward Points",
            count: 0,
            column: orderColumns
        },
        {
            id: 9,
            title: "Trade License Expiry",
            count: totalCountDashboard?.result?.totalExpiredTradeLicenses,
            column: orderColumns
        }
    ]

    const options = {
        chart: {
            id: 'basic-bar',

        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        color: '#32893b' // Set your desired color here
                    }]
                },
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        }
    };

    const series = [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }];

    const totalSalesOptions = [
        {
            label: 'Today',
            value: 'today'
        },
        {
            label: 'This week',
            value: 'week'
        },
        {
            label: 'This month',
            value: 'month'
        },
        {
            label: 'This year',
            value: 'year'
        }
    ];
    const totalOrderOptions = [
        {
            label: 'All',
            value: 'all'
        },
        {
            label: 'Today',
            value: 'today'
        },
        {
            label: 'This week',
            value: 'weekly'
        },
        {
            label: 'This month',
            value: 'monthly'
        },
        {
            label: 'This year',
            value: 'yearly'
        }
    ];
    return (
        <div className="admin-dashboard">
            <div className='top'>
                <div className="charts">
                    {/* <ChartComponent options={options} series={series} /> */}
                </div>


                <div className="tables">
                    <div className="count-card-wrapper">
                        <div className="total-sales">
                            <div className="left">
                                <CustomTypography content={"AED"} weight="SEMI-BOLD" color="BLACK" size="MEDIUM" />
                                <CustomTypography content={totalSales?.result ? (totalSales?.result[0]?.totalSales !== null ? totalSales?.result[0]?.totalSales.toFixed(2) : 0) : 0} weight="BOLD" color="BLACK" size="LARGE" />
                            </div>
                            <div className="right">
                                <div style={{ width: "140px" }}>
                                    <Select
                                        size={'sm'}
                                        label=""
                                        variant='bordered'
                                        placeholder=''
                                        className="max-w-xs"
                                        selectedKeys={[totalSalesFilterBy]}
                                        onChange={(e) => {
                                            setTotalSalesFilterBy(e.target.value)
                                        }}
                                    >
                                        {
                                            totalSalesOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="counttable">
                            <div className="title flex justify-between items-center">
                                <CustomTypography content={"Total Orders"} weight="BOLD" color="BLACK" size="MEDIUM" />

                                <div style={{ width: "140px" }}>
                                    <Select
                                        size={'sm'}
                                        label=""
                                        variant='bordered'
                                        placeholder=''
                                        className="max-w-xs"
                                        selectedKeys={[totalOrdersFilterBy]}
                                        onChange={(e) => {
                                            setTotalOrdersFilterBy(e.target.value)
                                        }}
                                    >
                                        {
                                            totalOrderOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div className="items-wrapper">
                                <div className="item">
                                    <p className="label">Completed</p>
                                    <p className="value">{totalOrderCount?.result?.completed_count || ''}</p>
                                </div>
                                <div className="item">
                                    <p className="label">Pending</p>
                                    <p className="value">{totalOrderCount?.result?.pending_count || ''}</p>
                                </div>
                                <div className="item">
                                    <p className="label">Cancelled</p>
                                    <p className="value">{totalOrderCount?.result?.canceled_count || ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="count-card-wrapper">
                        <div className="counttable h-full">
                            <div className="title flex justify-between items-center">
                                <CustomTypography content={"Notifications"} weight="BOLD" color="BLACK" size="MEDIUM" />
                            </div>
                            <div className="items-wrapper">
                                <div className="item items-center gap-3">
                                    <p className="label">{`Pending Company Approvals (${pendingCompanyApprovals?.result?.length})`}</p>
                                    {/* <Button color='primary' onClick={() => setSelectedTab(10)}>View</Button> */}
                                    <CustomButton label="View" variant="transparent" onClick={() => setSelectedTab(10)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="title">
                            <CustomTypography content={"Company verifications"} weight="BOLD" color="BLACK" size="MEDIUM" />
                        </div>
                        <DashboardTable columns={companyVerificationColumns} data={pendingCompanyApprovals?.result || []} /> */}

                </div>

            </div>
            <div className="tab-cards">
                {
                    cardItems.map((item) => {
                        return (
                            <TabCard key={item.id} id={item.id} title={item.title} count={item.count}
                                setSelectedTab={setSelectedTab}
                                isActive={item.id === selectedTab} />
                        )
                    })
                }
                <TabCard />

            </div>

            <div className="dashboard-table">
                <DashboardTable columns={tableColumns} data={tableData || []} />
            </div>
        </div >
    )
}