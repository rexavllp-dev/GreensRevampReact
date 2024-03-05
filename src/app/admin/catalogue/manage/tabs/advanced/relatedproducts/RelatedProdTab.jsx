import { CameraIcon } from '@/components/customicons/CameraIcon';
import CustomTable from '@/components/customtable/CustomTable'
import { Avatar, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect } from 'react'
import "./RelatedProdTab.scss"
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { createRelatedProducts, deleteRelatedProducts, getAllProducts, getAllRelatedProducts } from '@/services/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const RelatedProdTab = ({ id, data }) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [selectedRelatedRows, setSelectedRelatedRows] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

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


    const { allProducts, isRelatedProductsCreated, relatedProducts, isRelatedProductsDeleted } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts({ search_query: searchQuery }))
    }, [searchQuery])

    useEffect(() => {
        dispatch(getAllRelatedProducts({ id }))
    }, [isRelatedProductsCreated, isRelatedProductsDeleted])

    const handleCreateRelatedProducts = () => {
        const relatedProductData = selectedRows.map((item) => {
            return {
                id: item.id
            }
        })
        dispatch(createRelatedProducts({ data: { relatedProductData: relatedProductData }, id })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
                setSelectedRows([]);
            } else {
                toast.error(res.payload.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }


    const handleDeleteRelatedProducts = () => {
        if (selectedRelatedRows.length > 0) {
            const data = selectedRelatedRows.map(row => row.relatedProductId);
            dispatch(deleteRelatedProducts({ data: data })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                    setSelectedRelatedRows([])
                } else {
                    toast.error(res.payload.message)
                }
            }).catch((err) => {
                console.log(err);
            })
        } else {
            toast.error('Please select atleast one product')
        }
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
                                <p className="text-md">Add More Products</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="searchinput">
                                <SearchInput name={'search'} value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="optiontable">
                                <CustomTable height={'280px'}
                                    columnDefs={columnDefs}
                                    rowData={allProducts?.data?.products}
                                    selectedRows={selectedRows}
                                    onRowClicked={handleRowClick}
                                    setSelectedRows={setSelectedRows}
                                />
                            </div>
                            <div className="createbtn flex justify-end">
                                <CustomButton label="Add" variant="primary" onClick={() => handleCreateRelatedProducts()} />
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className='rightsection'>

                    <Card className="w-full">
                        <CardHeader className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-md">Related Products</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="optiontable">
                                <CustomTable height={'400px'}
                                    columnDefs={columnDefs}
                                    rowData={relatedProducts?.result?.relatedProducts}
                                    selectedRows={selectedRelatedRows}
                                    onRowClicked={handleRowClick}
                                    setSelectedRows={setSelectedRelatedRows}
                                />
                            </div>
                            <div className="createbtn flex justify-end">
                                <CustomButton label="Delete" variant="primary" onClick={() => handleDeleteRelatedProducts()} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default RelatedProdTab