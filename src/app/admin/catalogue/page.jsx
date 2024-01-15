'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Catalogue.scss'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTables from "@/components/customtable/CustomTables";
import CustomTable from "@/components/customtable/CustomTable";
import { Avatar, Chip } from "@nextui-org/react";
import { CameraIcon } from "@/components/customicons/CameraIcon";


export default function Catalogue() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { allUsers } = useSelector(state => state.users)

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Thumbnail', field: 'prod_image',
            cellRenderer: (params) => {
                return (
                    <Avatar showFallback src='https://images.unsplash.com/broken' fallback={
                        <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
                    } />
                )
            }
        },
        {
            headerName: 'Name', field: 'prod_name'
        },
        {
            headerName: 'Stock', field: 'stock',
        },
        {
            headerName: 'Price', field: 'price',
        },
        {
            headerName: 'SKU', field: 'sku',
        },
        {
            headerName: 'Brad Code', field: 'brand_code',
        },
        {
            headerName: 'Status', field: 'status',
            cellRenderer: (params) => {
                const isActive = params.data?.is_status;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
                )
            }
        },
    ]);

    useEffect(() => {
        // dispatch(getAllUsers({ data: {} }))
    }, [])


    return (
        <div className="cataloguepage">
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Products"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                    <CustomButton label="Delete" variant="danger" height={'42px'} />
                    <CustomButton label="Create Product" variant="primary" height={'42px'}
                        onClick={() => router.push('/admin/catalogue/create')} />
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={allUsers?.result}/>
        </div>
    )
}