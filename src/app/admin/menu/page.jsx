'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Menus.scss'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/customtable/CustomTable";
import { Avatar, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { CameraIcon } from "@/components/customicons/CameraIcon";
import { getAllMenus } from "@/services/features/menuSlice";
import { IoMdMore } from "react-icons/io";


export default function Menus() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { allMenus } = useSelector(state => state.menus)
    console.log(allMenus)

    useEffect(() => {
        dispatch(getAllMenus({}))
    }, [])

    const [columnDefs] = useState([
        { headerName: 'ID', field: 'menu_id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Name', field: 'menu_name'
        },
        {
            headerName: 'URL', field: 'menu_url'
        },
        {
            headerName: 'Status', field: 'menu_status',
            cellRenderer: (params) => {
                const isActive = params.data?.menu_status;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
                )
            }
        },
        {
            headerName: 'Created', field: 'created_at'
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
                                        router.push(`/admin/menu/manage?id=${params.data?.menu_id}`)
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


    return (
        <div className="menuspage">
            <div className="breadcrumb">
                <BreadCrumbs />
            </div>
            <div className="title">
               {/* <div className="backbtn" onClick={() => router.back()}>
                    <FaArrowLeft />
                </div>*/}
                <CustomTypography content={"Menus"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                    {/* <CustomButton label="Delete" variant="danger" height={'42px'} /> */}
                    <CustomButton label="Create Menu" variant="primary" height={'42px'}
                        onClick={() => router.push('/admin/menu/manage')} />
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={allMenus} onRowClicked={(value) => console.log(value)} />
        </div>
    )
}
