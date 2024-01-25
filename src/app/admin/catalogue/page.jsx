'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Catalogue.scss'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/customtable/CustomTable";
import { Avatar, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { CameraIcon } from "@/components/customicons/CameraIcon";
import { deleteProduct, getAllProducts } from "@/services/features/productSlice";
import { IoMdMore } from "react-icons/io";
import { toast } from "react-toastify";


export default function Catalogue() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { allProducts, isProductDeleted } = useSelector(state => state.products)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        dispatch(getAllProducts({ search_query: searchQuery }))
    }, [searchQuery, isProductDeleted])


    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Thumbnail', field: 'prod_image', minWidth: 150,
            cellRenderer: (params) => {
                return (
                    <Avatar showFallback src={
                        (params.data?.product_img?.find((img) => img.is_baseimage === true)?.url)} fallback={
                            // 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
                            <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
                        } />
                )
            }
        },
        {
            headerName: 'Name', field: 'prd_name', minWidth: 150
        },
        {
            headerName: 'Stock', field: 'stock',
        },
        {
            headerName: 'Price', field: 'product_price',
        },
        {
            headerName: 'SKU', field: 'sku',
        },
        {
            headerName: 'Brad Code', field: 'brand_code',
        },
        {
            headerName: 'Status', field: 'prd_status', minWidth: 150,
            cellRenderer: (params) => {
                const isActive = params.data?.prd_status;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
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
                                        router.push(`/admin/catalogue/manage/?id=${params.data?.id}`)
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
        // dispatch(getAllUsers({ data: {} }))
    }, [])

    const HandleDeleteProduct = () => {
        if (selectedRows.length > 0) {
            const data = selectedRows.map(row => row.id);
            setLoading(true)
            dispatch(deleteProduct({ data: data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload?.message);
                } else {
                    toast.error(res.payload?.message);
                }
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            })
        } else {
            setLoading(false)
            toast.error('Please select atleast one product')
        }
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
                <CustomTypography content={"Products"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput name={'search'} value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="right">
                    <CustomButton label="Delete" variant="danger" height={'42px'} onClick={HandleDeleteProduct} />
                    <CustomButton label="Create Product" variant="primary" height={'42px'}
                        onClick={() => router.push('/admin/catalogue/manage')} />
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={allProducts?.data?.products}
                selectedRows={selectedRows} setSelectedRows={setSelectedRows}
            />
        </div>
    )
}