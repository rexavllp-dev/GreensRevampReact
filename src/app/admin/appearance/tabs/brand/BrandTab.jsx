'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./BrandTab.scss";
import { getAllOrdersByAdmin } from '@/services/features/orderSlice';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { Button, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { getDrivers, getWarehouseUsers } from '@/services/features/userSlice';
import { getAllCategories } from '@/services/features/paymentSlice';
import CustomSelect from '@/library/select/custom-select/CustomSelect';

import { getAllBrands } from "@/services/features/brandSlice";
import { addHomePageBrand, listHomeBrand, deleteHomeBrand } from "@/services/features/adminSlice";
import { toast } from 'react-toastify';
import CustomButton from '@/library/buttons/CustomButton';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal';

const BrandTab = () => {

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [brandTreeData, setBrandTreeData] = useState([]);
    const [homebrands, setHomebrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const { allBrands, isAllBrandsLoaded}  = useSelector(state => state.brands)
    const { addHomeBrandLoaded, deleteHomeBrandLoaded }  = useSelector(state => state.admin)
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [brandid, setBrandId] = useState(0);

    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false)

    useEffect(() => {

        dispatch(getAllBrands({}))
        dispatch(listHomeBrand({})).then((response) => {

            if (response.payload?.success) {
                setHomebrands(response.payload.result);
            }

        }).catch((err) => {
            console.log(err);
        })

    }, [addHomeBrandLoaded, deleteHomeBrandLoaded])


    useEffect(() => {

        if(isAllBrandsLoaded){
            setBrandTreeData(allBrands.data);
        }
      }, [isAllBrandsLoaded])

      useEffect(() => {

        if(addHomeBrandLoaded){

           toast.success('Brand Addedd');
        }
      }, [addHomeBrandLoaded])



    const [columnDefs] = React.useState([
        {
            headerName: 'ID',
            field: 'homepage_brand_id',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Brand Name',
            field: 'brd_name',
            minWidth: 150
        },
        // {
        //     headerName: 'Transaction ID',   
        //     field: 'stripe_transaction_id',
        //     minWidth: 150
        // },
        // {
        //     headerName: 'Payment Method',
        //     field: 'payement_method',
        //     minWidth: 150,
        //     cellRenderer: (params) => {
        //         return 'Credit / Debit Cards'
        //     }
        // },
        {
            headerName: 'Created At',
            field: 'created_at',
            minWidth: 250,
            cellRenderer: (params) => {
                const date = params.data?.created_at;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },

    ]);

        const handleBrandChange = (e) => {
            setBrandId(e.target.value);
        }
        const handleBrandAddition = () => {
            dispatch(addHomePageBrand({data:{brand_id:brandid}}));
        }

        const HandleDeleteBrand = () => {

            setConfirmationOpen(false);
            onClose(); // Close the main modal
            if (selectedRows.length > 0) {
                const data = selectedRows.map(row => row.homepage_brand_id);
                setLoading(true)
                dispatch(deleteHomeBrand({ data: data })).then((res) => {
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

        const handleRowClick = (data)=>{
            //router.push(`/admin/catalogue/manage/?id=${data?.id}`)
        }
    
    return (
        <div className='transactions-wrapper'>

            <div className="header">
                <div className="searchinput">
                <select className='selectOption' onChange={(e) => handleBrandChange(e)}>
                    <option value="">Select Brand</option>
                    {

                        brandTreeData?.map((value) => {
                            return(<option value={value.id}>{value.brd_name}</option>)
                        })
                    }
                </select>
                <Button color='primary' onClick={() => handleBrandAddition()}>Add</Button>
                </div>
                <div className="right">
                    <CustomButton label="Delete" variant="danger" height={'42px'} onClick={() => setConfirmationOpen(true)} />
                </div>
            </div>

            <CustomTable columnDefs={columnDefs} rowData={homebrands}
                selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={HandleDeleteBrand}
                title="Confirmation"
                message="Are you sure you want to delete this product?"
            />

        </div>
    )
}

export default BrandTab