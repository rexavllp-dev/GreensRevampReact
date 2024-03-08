import { CameraIcon } from '@/components/customicons/CameraIcon';
import CustomTable from '@/components/customtable/CustomTable'
import { Avatar, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect } from 'react'
import "./VariantsTab.scss"
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { MdDelete, MdKeyboardArrowDown } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { IoAddCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import {
    createVariant, createVariantLabel, deleteProductOptionValue,
    getAllProducts, getAllVariantsByProductId, getVariantLabelsByVariantId,
    deleteProductOption,
    updateVariantLabel,
    deleteVariantLabel
} from '@/services/features/productSlice';
import { toast } from 'react-toastify';
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';

const VariantsTab = ({ data, id }) => {

    const [formData, setFormData] = React.useState({
        variant_name: '',
        label: '',
    })
    const dispatch = useDispatch();
    const router = useRouter();

    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('')


    const { allProducts, productVariants,
        allVariantsByProduct, isProductVariantCreated,
        isVariantCreated, isProductVariantValueDeleted } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts({ search_query: searchQuery }))
    }, [searchQuery])

    useEffect(() => {
        dispatch(getAllVariantsByProductId({ id }))
    }, [id, isProductVariantCreated, isVariantCreated, isProductVariantValueDeleted])

    useEffect(() => {
        dispatch(getVariantLabelsByVariantId({ id: expandedIndex }))
    }, [expandedIndex, isProductVariantCreated, isProductVariantValueDeleted])


    const [columnDefs] = React.useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        // {
        //     headerName: 'Thumbnail', field: 'prod_image',
        //     cellRenderer: (params) => {
        //         return (
        //             <Avatar showFallback src='https://images.unsplash.com/broken' fallback={
        //                 <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
        //             }
        //             />
        //         )
        //     }
        // },
        {
            headerName: 'Name', field: 'prd_name'
        },
        {
            headerName: 'Price', field: 'product_price',
        },
        {
            headerName: 'SKU', field: 'sku',
        }
    ]);


    const handleCreateProductVariant = (rows) => {
        const productRows = rows.map((item) => {
            return {
                product_id: id,
                variant_id: item.product_id
            }
        })
        dispatch(createVariantLabel({ data: productRows })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
        setSelectedRows([]);
    }

    const handleDeleteProductVariant = (variantId) => {
        dispatch(deleteVariantLabel({ id: variantId })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleRowClick = (data) => {
        router.push(`/admin/catalogue/manage/?id=${data?.id}`)
    }



    return (
        <div className="optionstab">
            <div className="optionflex">
                <div className='leftsection'>

                    <Card className="w-full">
                        <CardHeader className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-md">Choose Variants</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>

                            <div className="w-full mb-3">
                                <div className="searchinput">
                                    <div className="createbtn flex gap-3 items-center">
                                        <SearchInput name={'search'} value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="optiontable">
                                    <CustomTable height={'300px'}
                                        columnDefs={columnDefs}
                                        rowData={allProducts?.data?.products}
                                        selectedRows={selectedRows}
                                        onRowClicked={handleRowClick}
                                        setSelectedRows={setSelectedRows} />
                                    <CustomButton label="Add" variant="primary"
                                        onClick={() => handleCreateProductVariant(selectedRows)}
                                    />
                                </div>
                            </div>

                        </CardBody>
                    </Card>

                </div>

                <div className='rightsection'>
                    <Card className="w-full">
                        <CardHeader className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-md">Product Variants</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody className='flex flex-col gap-3'>
                            {allVariantsByProduct?.result?.map((item, index) => (
                                <>
                                    <div className="flex gap-3 items-center justify-between w-100">
                                        <CustomTypography content={item.prd_name} weight='SEMI-BOLD' size='REGULAR' />
                                        <div className='flex gap-3 items-center'>
                                            <div className="icon cursor-pointer" onClick={() => handleDeleteProductVariant(item.product_variant_id)}>
                                                <MdDelete size={24} className=' icon' color='#555' />
                                            </div>
                                        </div>

                                    </div>

                                    {/* <div className="createbtn flex justify-end">
                                        <CustomButton label="Save" variant="primary" />
                                    </div> */}
                                    <Divider />
                                </>
                            ))}
                        </CardBody>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default VariantsTab