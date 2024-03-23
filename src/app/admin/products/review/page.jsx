'use client'

import ReactStars from "react-rating-stars-component";
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
import ReviewModal from "./components/ReviewModal";


export default function Reviews() {
    const router = useRouter();
    const dispatch = useDispatch();

    const { allReviews } = useSelector(state => state.products)
    const { isUpdateReviewLoaded } = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(getAllProductReviews({}))
    }, [isUpdateReviewLoaded]);

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'reviewId', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        // {
        //     headerName: 'Logo', field: 'brd_logo',
        //     cellRenderer: (params) => {
        //         return (
        //             <Avatar showFallback src={params.data?.brd_logo} fallback={
        //                 <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
        //             } />
        //         )
        //     }
        // },
        {
            headerName: 'Review Heading', field: 'heading_review'
        },
        {
            headerName: 'Review', field: 'review'
        },
        {
            headerName: 'Rating', field: 'rating',
            cellRenderer: (params) => {
                const rating = params.data?.rating;
                return (
                    <ReactStars
                        count={5}
                        value={rating}
                        edit={false}
                        size={20}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                )
            }
        },
        {
            headerName: 'Status', field: 'brand_status',
            cellRenderer: (params) => {
                const isActive = params.data?.is_approved;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
                )
            }
        },
        {
            headerName: 'Created', field: 'createdAt'
        }
    ]);


    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({})
    const handleRowClick = (data) => {
        setEditData(data)
        setOpen(true)
    }


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
            <CustomTable columnDefs={columnDefs} rowData={allReviews?.result} onRowClicked={handleRowClick} />
            <ReviewModal open={open} handleClose={() => setOpen(false)} editData={editData} />
        </div>
    )
}
