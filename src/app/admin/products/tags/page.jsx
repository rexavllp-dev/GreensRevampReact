'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Tags.scss'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/customtable/CustomTable";
import { Avatar, Chip } from "@nextui-org/react";
import { CameraIcon } from "@/components/customicons/CameraIcon";
import { getAllProducts } from "@/services/features/productSlice";


export default function Tags() {
    const router = useRouter();
    const dispatch = useDispatch();

    // const { allProducts } = useSelector(products => products.allProducts)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Logo', field: 'logo',
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
            headerName: 'Status', field: 'status',
            cellRenderer: (params) => {
                const isActive = params.data?.is_status;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
                )
            }
        },
        {
            headerName: 'Created', field: 'created_at'
        },
    ]);


    return (
        <div className="tagspage">
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Tags"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                    {/* <CustomButton label="Delete" variant="danger" height={'42px'} /> */}
                    <CustomButton label="Create Tags" variant="primary" height={'42px'}
                        onClick={() => router.push('/admin/products/tags/create')} />
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={[]} />
        </div>
    )
}
