'use client';
import React from "react";
import CustomTable from "@/components/customtable/CustomTable";
import './AdminDashboard.scss';
import TabCard from "@/components/cards/tabcard/TabCard";
import DashboardTable from "@/components/customtable/DashboardTable";
import { companyVerificationColumns, orderColumns } from "@/constants/constants";
import { getAllOrdersByAdmin } from "@/services/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomTypography from "@/library/typography/CustomTypography";
import ChartComponent from "@/components/chart/ChartComponent";
import { Select, SelectItem } from "@nextui-org/react";
import { getAllMinQtyProducts, getExpiredProducts, getLatestCancelledOrders, getLatestOrders, getLatestReplacedOrders, getLatestReturnedOrders, getOutOfStockProducts } from "@/services/features/adminSlice";


export default function AdminDashboard() {
    const dispatch = useDispatch()
    const [selectedTab, setSelectedTab] = React.useState(0)
    const [tableData, setTableData] = React.useState([])
    const [key, setKey] = React.useState('')

    const { latestOrders, latestCancelledOrders, latestReturnedOrders, latestReplacedOrders, outOfStockProducts, expiredProducts, allMinQtyProducts } = useSelector((state) => state.admin);

    React.useEffect(() => {
        if (selectedTab === 0) {
            dispatch(getLatestOrders({}));
        } else if (selectedTab === 1) {
            dispatch(getLatestCancelledOrders({}))
        } else if(selectedTab === 2){
            dispatch(getLatestReturnedOrders({}))
        }else if(selectedTab === 3){
            dispatch(getLatestReplacedOrders({}))
        }else if(selectedTab === 4){
            dispatch(getOutOfStockProducts({}))
        }else if (selectedTab === 5){
            dispatch(getExpiredProducts({}))
        }else if(selectedTab === 6){
            dispatch(getAllMinQtyProducts({}))
        }else if(selectedTab === 7){
            
        }
    }, [selectedTab])

    React.useEffect(() => {
        if (selectedTab === 0) {
            setTableData(latestOrders?.result?.orders || [])
            setKey('orderId')
        } 
        else if (selectedTab === 1) {
            setTableData(latestCancelledOrders?.result || [])
            setKey('id')
        } else if(selectedTab === 2){
            setTableData(latestReturnedOrders?.result || [])
        }else if(selectedTab === 3){
            setTableData(latestReplacedOrders?.result || [])
        }else if(selectedTab === 4){
            setTableData(outOfStockProducts?.result || [])
        }else if (selectedTab === 5){
            setTableData(expiredProducts?.result || [])
        }else if(selectedTab === 6){
            setTableData(allMinQtyProducts?.result || [])
        }
    }, [latestOrders, latestCancelledOrders, latestReturnedOrders, latestReplacedOrders, outOfStockProducts, expiredProducts, allMinQtyProducts])


    const users = [
        {
            id: 1,
            name: "Tony Reichert",
            role: "CEO",
            team: "Management",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "tony.reichert@example.com",
        },
        {
            id: 2,
            name: "Zoey Lang",
            role: "Tech Lead",
            team: "Development",
            status: "paused",
            age: "25",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            email: "zoey.lang@example.com",
        },
        {
            id: 3,
            name: "Jane Fisher",
            role: "Sr. Dev",
            team: "Development",
            status: "active",
            age: "22",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            email: "jane.fisher@example.com",
        },
        {
            id: 4,
            name: "William Howard",
            role: "C.M.",
            team: "Marketing",
            status: "vacation",
            age: "28",
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            email: "william.howard@example.com",
        },
        {
            id: 5,
            name: "Kristen Copper",
            role: "S. Manager",
            team: "Sales",
            status: "active",
            age: "24",
            avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
            email: "kristen.cooper@example.com",
        },
        {
            id: 6,
            name: "Brian Kim",
            role: "P. Manager",
            team: "Management",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "brian.kim@example.com",
            status: "Active",
        },
        {
            id: 7,
            name: "Michael Hunt",
            role: "Designer",
            team: "Design",
            status: "paused",
            age: "27",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
            email: "michael.hunt@example.com",
        },
        {
            id: 8,
            name: "Samantha Brooks",
            role: "HR Manager",
            team: "HR",
            status: "active",
            age: "31",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
            email: "samantha.brooks@example.com",
        },
        {
            id: 9,
            name: "Frank Harrison",
            role: "F. Manager",
            team: "Finance",
            status: "vacation",
            age: "33",
            avatar: "https://i.pravatar.cc/150?img=4",
            email: "frank.harrison@example.com",
        },
        {
            id: 10,
            name: "Emma Adams",
            role: "Ops Manager",
            team: "Operations",
            status: "active",
            age: "35",
            avatar: "https://i.pravatar.cc/150?img=5",
            email: "emma.adams@example.com",
        },
        {
            id: 11,
            name: "Brandon Stevens",
            role: "Jr. Dev",
            team: "Development",
            status: "active",
            age: "22",
            avatar: "https://i.pravatar.cc/150?img=8",
            email: "brandon.stevens@example.com",
        },
        {
            id: 12,
            name: "Megan Richards",
            role: "P. Manager",
            team: "Product",
            status: "paused",
            age: "28",
            avatar: "https://i.pravatar.cc/150?img=10",
            email: "megan.richards@example.com",
        },
        {
            id: 13,
            name: "Oliver Scott",
            role: "S. Manager",
            team: "Security",
            status: "active",
            age: "37",
            avatar: "https://i.pravatar.cc/150?img=12",
            email: "oliver.scott@example.com",
        },
        {
            id: 14,
            name: "Grace Allen",
            role: "M. Specialist",
            team: "Marketing",
            status: "active",
            age: "30",
            avatar: "https://i.pravatar.cc/150?img=16",
            email: "grace.allen@example.com",
        },
        {
            id: 15,
            name: "Noah Carter",
            role: "IT Specialist",
            team: "I. Technology",
            status: "paused",
            age: "31",
            avatar: "https://i.pravatar.cc/150?img=15",
            email: "noah.carter@example.com",
        },
        {
            id: 16,
            name: "Ava Perez",
            role: "Manager",
            team: "Sales",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?img=20",
            email: "ava.perez@example.com",
        },
        {
            id: 17,
            name: "Liam Johnson",
            role: "Data Analyst",
            team: "Analysis",
            status: "active",
            age: "28",
            avatar: "https://i.pravatar.cc/150?img=33",
            email: "liam.johnson@example.com",
        },
        {
            id: 18,
            name: "Sophia Taylor",
            role: "QA Analyst",
            team: "Testing",
            status: "active",
            age: "27",
            avatar: "https://i.pravatar.cc/150?img=29",
            email: "sophia.taylor@example.com",
        },
        {
            id: 19,
            name: "Lucas Harris",
            role: "Administrator",
            team: "Information Technology",
            status: "paused",
            age: "32",
            avatar: "https://i.pravatar.cc/150?img=50",
            email: "lucas.harris@example.com",
        },
        {
            id: 20,
            name: "Mia Robinson",
            role: "Coordinator",
            team: "Operations",
            status: "active",
            age: "26",
            avatar: "https://i.pravatar.cc/150?img=45",
            email: "mia.robinson@example.com",
        },
    ];

    const cardItems = [
        {
            id: 0,
            title: "Latest Orders",
            count: 100,
            column: orderColumns
        },
        {
            id: 1,
            title: "Latest Cancelled Orders",
            count: 5,
            column: orderColumns
        },
        {
            id: 2,
            title: "Latest Returned Orders",
            count: 100,
            column: orderColumns
        },
        {
            id: 3,
            title: "Latest Replaced Orders",
            count: 100,
            column: orderColumns
        },
        {
            id: 4,
            title: "Out of Stock Products",
            count: 100,
            column: orderColumns
        },
        {
            id: 5,
            title: "Product Expiry",
            count: 0,
            column: orderColumns
        },
        {
            id: 6,
            title: "Minimum Quantity",
            count: 0,
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
            count: 0,
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

    const sortOptions = [
        {
            label: 'Newest',
            value: 'newest'
        },
        {
            label: 'Oldest',
            value: 'oldest'
        }
    ];
    return (
        <div className="admin-dashboard">
            <div className='top'>
                <div className="charts">
                    <ChartComponent options={options} series={series} />
                </div>


                <div className="tables">
                    <div className="count-card-wrapper">
                        <div className="total-sales">
                            <div className="left">
                                <CustomTypography content={"AED"} weight="SEMI-BOLD" color="BLACK" size="MEDIUM" />
                                <CustomTypography content={"5000"} weight="BOLD" color="BLACK" size="LARGE" />
                            </div>
                            <div className="right">
                                <div style={{ width: "140px" }}>
                                    <Select
                                        size={'sm'}
                                        label=""
                                        variant='bordered'
                                        placeholder=''
                                        className="max-w-xs"
                                        selectedKeys={[]}
                                        onChange={(e) => {
                                            // if (e.target?.value !== sortBy) {
                                            //     setSortBy(e.target.value)
                                            // }
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
                                        selectedKeys={[]}
                                        onChange={(e) => {
                                            // if (e.target?.value !== sortBy) {
                                            //     setSortBy(e.target.value)
                                            // }
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
                            </div>
                            <div className="items-wrapper">
                                <div className="item">
                                    <p className="label">Completed</p>
                                    <p className="value">50</p>
                                </div>
                                <div className="item">
                                    <p className="label">Pending</p>
                                    <p className="value">15</p>
                                </div>
                                <div className="item">
                                    <p className="label">Cancelled</p>
                                    <p className="value">2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="companytable">
                        <div className="title">
                            <CustomTypography content={"Company verifications"} weight="BOLD" color="BLACK" size="MEDIUM" />
                        </div>
                        <DashboardTable columns={companyVerificationColumns} data={allOrders?.result || []} />
                    </div> */}

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
                <DashboardTable columns={orderColumns} data={tableData || []} key={key} />
            </div>
        </div>
    )
}