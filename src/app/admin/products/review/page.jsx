'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Review.scss'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/customtable/CustomTable";
import { Avatar, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { CameraIcon } from "@/components/customicons/CameraIcon";
import { IoMdMore } from "react-icons/io";
import { getAllProductReviews } from "@/services/features/productSlice";


export default function Reviews() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { allReviews } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProductReviews({}))
    }, [])

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Logo', field: 'brd_logo',
            cellRenderer: (params) => {
                return (
                    <Avatar showFallback src={params.data?.brd_logo} fallback={
                        <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
                    } />
                )
            }
        },
        {
            headerName: 'Name', field: 'brd_name'
        },
        {
            headerName: 'Status', field: 'brand_status',
            cellRenderer: (params) => {
                const isActive = params.data?.brand_status;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
                )
            }
        },
        {
            headerName: 'Created', field: 'created_at'
        }
    ]);


    return (
        <div className="reviews-wrapper">
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Reviews"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                    {/* <CustomButton label="Delete" variant="danger" height={'42px'} /> */}
                    {/* <CustomButton label="Create Review" variant="primary" height={'42px'}
                        onClick={() =>} /> */}
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={allReviews?.result} />
        </div>
    )
}
