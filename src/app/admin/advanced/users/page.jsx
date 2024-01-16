'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTable from "@/components/customtable/CustomTable";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Users.scss'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/services/features/userSlice";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { IoMdMore } from "react-icons/io";


export default function Users() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { allUsers } = useSelector(state => state.users)



    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'First Name', field: 'usr_firstname', minWidth: 130
        },
        {
            headerName: 'Last Name', field: 'usr_lastname', minWidth: 130
        },
        // { headerName: 'Role', field: 'role' },
        {
            headerName: 'Status', field: 'status', minWidth: 160,
            cellRenderer: (params) => {
                let isCompany = params.data?.usr_company;
                let status = params.data?.status_name;

                if (!isCompany) {
                    return (
                        <Chip color={params.data?.is_status ? "success" : "danger"} variant="dot">{params.data?.is_status ? "Active" : "Inactive"}</Chip>
                    )
                }


                if (status === "Active" || status === "Approved") {
                    return (
                        <Chip color={"success"} variant="dot">{status}</Chip>
                    )
                } else if (status === "Inactive") {
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
            field: 'attempt_blocked', headerName: 'Blocked', minWidth: 150,
            cellRenderer: (params) => {
                let blocked = params.data?.attempt_blocked;
                if (blocked) {
                    return (
                        <Chip color={"danger"} variant="dot">{'Blocked'}</Chip>
                    )
                } else {
                    return (
                        <Chip color={"success"} variant="dot">{"Active"}</Chip>
                    )
                }
            }
        },
        { field: 'usr_email', headerName: 'Email', minWidth: 150 },
        { field: 'usr_mobile_number', headerName: 'Mobile', minWidth: 150 },
        { field: 'registration_method', headerName: 'Method of Registration', minWidth: 120 },
        {
            field: 'created_at', headerName: 'Created At', minWidth: 120
        },
        {
            field: 'certificates',
            minWidth: 130,
            filter: false,
            cellRenderer: (params) => {
                if (!params.data?.usr_company) {
                    return null
                }
                return (
                    <div
                        onClick={() => {
                            router.push(`/admin/advanced/verification/${params.data.id}`)
                        }}
                        style={{ display: 'flex', height: '100%', alignItems: 'center', paddingLeft: '30px', cursor: 'pointer' }}>
                        {/* <FiDownload size={20} /> */}
                        <MdOutlineRemoveRedEye size={20} />
                    </div>
                )
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
                                        router.push(`/admin/advanced/users/${params.data?.id}`)
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

    useEffect(() => {
        dispatch(getAllUsers({ data: {} }))
    }, [])


    return (
        <div className="adminusers">
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
                <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>
                <CustomTypography content={"Users"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                    <CustomButton label='Download Behaviour Report' variant='transparent' height={'42px'} />
                    <CustomButton label="Delete" variant="danger" height={'42px'} />
                    <CustomButton label="Create New" variant="primary" height={'42px'}
                        onClick={() => router.push('/admin/advanced/users/create')} />
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={allUsers?.result} />
        </div>
    )
}