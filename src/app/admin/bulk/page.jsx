'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/customtable/CustomTable";
import { Avatar, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";
import { toast } from "react-toastify";
import './Bulk.scss';
import BulkModal from "./components/BulkModal";
import { getAllBulkRequests } from "@/services/features/bulkSlice";


export default function Bulk() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [searchQuery, setSearchQuery] = React.useState('')
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false)
    const [isUpdate, setIsUpdate] = React.useState(false)
    const [updateData, setUpdateData] = React.useState(false)
    const { allBulkRequests, isBulkRequestUpdated } = useSelector(state => state.bulk)

    useEffect(() => {
        dispatch(getAllBulkRequests({}))
    }, [isBulkRequestUpdated])

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Product Name', field: 'prd_name', minWidth: 150
        },
        {
            headerName: 'Name', field: 'usr_firstname', minWidth: 150
        },
        {
            headerName: 'Email', field: 'usr_email',
        },
        {
            headerName: 'Quantity', field: 'quantity',
        },
        {
            headerName: 'Status', field: 'approved_status', minWidth: 150,
            cellRenderer: (params) => {
                const status = params.data?.approved_status;
                if (status === "Accept") {
                    return (
                        <Chip color={"success"} variant="dot">{status}</Chip>
                    )
                } else if (status === "Pending") {
                    return (
                        <Chip color={"warning"} variant="dot">{status}</Chip>
                    )
                } else {
                    return (
                        <Chip color={"danger"} variant="dot">{status}</Chip>
                    )
                }
            }
        },
        {
            field: 'action',
            minWidth: 150,
            filter: false,
            cellRenderer: (params) => {
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <div style={{ display: 'flex', height: '100%', alignItems: 'center', paddingLeft: '10px', cursor: 'pointer' }}>
                                <IoMdMore size={20} />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                            <DropdownSection title="Actions" showDivider={false}>
                                <DropdownItem
                                    key="edit"
                                    description="Allows you to edit the file"
                                    onClick={() => {
                                        handleUpdateBulk(params.data)
                                    }}
                                >
                                    Edit
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                )
            }
        }
    ]);



    const handleUpdateBulk = (data) => {
        setUpdateData(data)
        setIsUpdate(true)
        setOpen(true)
    }

    return (
        <div className="cataloguepage">
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Bulk Requests"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput name={'search'} value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="right">
                    {/* <CustomButton label="Delete" variant="danger" height={'42px'} onClick={HandleDeleteProduct} />
                    <CustomButton label="Create Product" variant="primary" height={'42px'}
                        onClick={() => router.push('/admin/catalogue/manage')} /> */}
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={allBulkRequests?.data}
                selectedRows={selectedRows} setSelectedRows={setSelectedRows}
            />
            <BulkModal open={open} handleClose={() => setOpen(false)} isUpdate={isUpdate} updateData={updateData} />
        </div>
    )
}