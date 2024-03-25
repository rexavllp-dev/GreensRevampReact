'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./CategoryTab.scss";
import { getAllOrdersByAdmin } from '@/services/features/orderSlice';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { Button, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { getDrivers, getWarehouseUsers } from '@/services/features/userSlice';
import { getAllCategories } from '@/services/features/paymentSlice';
import CustomSelect from '@/library/select/custom-select/CustomSelect';
import { getCategoryTree} from "@/services/features/categorySlice";
import { addHomePageCategory, listHomeCategory, deleteHomeCategory } from "@/services/features/adminSlice";
import { toast } from 'react-toastify';
import CustomButton from '@/library/buttons/CustomButton';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal';

const CategoryTab = () => {

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [categoryTreeData, setCategoryTreeData] = useState([]);
    const [homecategories, setHomecategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { allcategories, isCategoryTreeLoaded}  = useSelector(state => state.categories)
    const { addHomeCategoryLoaded, deleteHomeCategoryLoaded }  = useSelector(state => state.admin)
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [categoryid, setCategoryId] = useState(0);

    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false)

    useEffect(() => {

        dispatch(getCategoryTree({}))
        dispatch(listHomeCategory({})).then((response) => {
            if (response.payload?.success) {
                setHomecategories(response.payload.result);
            }
        }).catch((err) => {
            console.log(err);
        })

    }, [addHomeCategoryLoaded, deleteHomeCategoryLoaded])


    useEffect(() => {

        if(isCategoryTreeLoaded){

            setCategoryTreeData(allcategories.data);
        }
      }, [isCategoryTreeLoaded])

      useEffect(() => {

        if(addHomeCategoryLoaded){

           toast.success('Category Addedd');
        }
      }, [addHomeCategoryLoaded])



    const [columnDefs] = React.useState([
        {
            headerName: 'ID',
            field: 'homepage_category_id',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Category Name',
            field: 'cat_name',
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

     // Function to recursively build category options
        const buildCategoryOptions = (categories, depth = 0) => {
            return categories.flatMap(category => {
            const label = `${'--'.repeat(depth)} ${category.name}`; // Use dashes for indentation
            const options = [{ id: category.id, label: label }];
            if (category.children && category.children.length > 0) {
                options.push(...buildCategoryOptions(category.children, depth + 1)); // Recursively build child options
            }
            return options;
            });
        };

        // Function to render options for select box
        const renderOptions = (options) => {
            return options.map(option => (
            <option key={option.id} value={option.id}>
                {option.label}
            </option>
            ));
        };


        const handleCategoryChange = (e) => {
            setCategoryId(e.target.value);
        }
        const handleCategoryAddition = () => {
            dispatch(addHomePageCategory({data:{category_id:categoryid}}));
        }

        const HandleDeleteCategory = () => {
            setConfirmationOpen(false);
            onClose(); // Close the main modal
            if (selectedRows.length > 0) {
                const data = selectedRows.map(row => row.homepage_category_id);
                setLoading(true)
                dispatch(deleteHomeCategory({ data: data })).then((res) => {
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
                <select className='selectOption' onChange={(e) => handleCategoryChange(e)}>
                    <option value="">Select Category</option>
                    {renderOptions(buildCategoryOptions(categoryTreeData))}
                    </select> 
                    <Button color='primary' onClick={() => handleCategoryAddition()}>Add</Button>
                </div>
                <div className="right">
                    <CustomButton label="Delete" variant="danger" height={'42px'} onClick={() => setConfirmationOpen(true)} />
                </div>
            </div>

            <CustomTable columnDefs={columnDefs} rowData={homecategories}
                selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={HandleDeleteCategory}
                title="Confirmation"
                message="Are you sure you want to delete this product?"
            />

        </div>
    )
}

export default CategoryTab