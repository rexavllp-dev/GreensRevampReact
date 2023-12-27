'use client'

import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTable from "@/components/customtable/CustomTable";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Users.scss'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "@/services/features/userSlice";


export default function Users() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { allUsers } = useSelector(state => state.users)

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
            <CustomTable rowData={allUsers?.result}/>
        </div>
    )
}