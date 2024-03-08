import { CameraIcon } from '@/components/customicons/CameraIcon';
import CustomTable from '@/components/customtable/CustomTable'
import { Avatar, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import React, { useEffect } from 'react'
import "./OptionsTab.scss"
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { MdDelete, MdKeyboardArrowDown } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createOption, createProductOption, deleteProductOption, deleteProductOptionValue, getAllOptionsByProductId, getAllProducts, getOptionValues, updateOptionValue } from '@/services/features/productSlice';
import { toast } from 'react-toastify';
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import EditOptionModal from './components/EditOptionModal';

const OptionsTab = ({ data, id }) => {

    const [formData, setFormData] = React.useState({
        option_name: '',
        label: '',
    })
    const dispatch = useDispatch();
    const router = useRouter();

    const [expandedIndex, setExpandedIndex] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [editData, setEditData] = React.useState({
        id: '',
        name: ''
    });


    const { allProducts, allOptionsByProduct, optionValues,
        isProductOptionDeleted, isProductOptionValueDeleted,
        isProductOptionCreated, isOptionCreated, isOptionValueUpdated,isOptionUpdated } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts({ search_query: searchQuery }))
    }, [searchQuery])

    useEffect(() => {
        dispatch(getAllOptionsByProductId({ id }))
    }, [id, isProductOptionCreated, isProductOptionDeleted, isProductOptionValueDeleted, isOptionCreated, isOptionUpdated])

    useEffect(() => {
        dispatch(getOptionValues({ id: expandedIndex }))
    }, [expandedIndex, isProductOptionDeleted, isProductOptionValueDeleted, isProductOptionCreated])





    const handleItemClick = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

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

    const [optionLabels, setOptionLabels] = React.useState([])


    useEffect(() => {
        if (optionValues) {
            optionValues?.result?.map((item) => {
                setOptionLabels((prev) => ({ ...prev, [item.product_option_id]: item.option_label }))
            })
        }
    }, [optionValues])


    const handleInputChange = ({ e }) => {

        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }

    const handleCreateOption = () => {
        if (formData?.option_name) {
            dispatch(createOption({ data: { option_name: formData?.option_name, product_id: id } })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
            setFormData((prev) => ({ ...prev, option_name: '' }));
        }
    }

    const handleCreateProductOption = (optionId, optionValues) => {
        const productRows = optionValues.map((item) => {
            return {
                product_id: item.product_id
            }
        })
        const newData = {
            optionId: optionId,
            optionValues: productRows
        }
        dispatch(createProductOption({ data: newData })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message)
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err);
        })
        // setSelectedRows([]);
    }


    const handleUpdateProductOption = (optionValueId) => {

        // let optionLabel = optionLabels[optionValueId];
        console.log(optionLabels)
        if (optionLabels) {
            dispatch(updateOptionValue({
                data: { data: optionLabels }
            })).then((res) => {
                if (res.payload?.success) {
                    toast.success(res.payload.message);
                } else {
                    toast.error(res.payload.message)
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
            setOptionLabels([]);
        }
    }

    const handleDeleteProductOption = (optionId) => {
        dispatch(deleteProductOption({ id: optionId })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteProductOptionValue = (optionValueId) => {
        dispatch(deleteProductOptionValue({ id: optionValueId })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload.message);
            } else {
                toast.error(res.payload.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleEditProductOption = (id, name) => {
        setOpen(true);
        setEditData({
            id: id,
            name: name
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

                            {
                                !allOptionsByProduct?.result?.length &&
                                <div className="createoption">
                                    <CustomInput name='option_name' type='text'
                                        maxLength={100}
                                        height={40}
                                        placeholder='Create New Option' label={'Create New Option'}
                                        onChange={(e) => {
                                            handleInputChange({ e });
                                        }}
                                        value={formData.option_name}
                                    />
                                    <div className="createbtn cursor-pointer">
                                        {/* <CustomButton label="Add" variant="primary" /> */}
                                        <IoAddCircleSharp size={40} color='#555'
                                            className={`icon `}
                                            onClick={() => {
                                                handleCreateOption();
                                            }}
                                        />
                                    </div>
                                </div>
                            }


                        </CardHeader>
                        <Divider />
                        <CardBody>
                            {allOptionsByProduct?.result?.map((item, index) => (
                                <div key={index} className="accordion-item">
                                    <div
                                        className={`accordion-header ${expandedIndex === item.id ? 'expanded' : ''}`}

                                    >

                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleItemClick(item.id)}>
                                                <MdKeyboardArrowDown size={20} className='mt-1' />
                                                <p className="text-md">{item.option_name}</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <CustomButton label="Manage" variant="teritary" onClick={() => handleItemClick(item.id)} />
                                                <MdEdit size={24}
                                                    onClick={() => handleEditProductOption(item.id, item.option_name)}
                                                    className='mt-3 icon cursor-pointer'
                                                    color='#555' onAn />
                                                <MdDelete size={24}
                                                    onClick={() => handleDeleteProductOption(item.id)}
                                                    className='mt-3 icon cursor-pointer'
                                                    color='#555' onAn />
                                            </div>
                                        </div>
                                    </div>

                                    {expandedIndex === item.id && (
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
                                                    onClick={() => handleCreateProductOption(item.id, selectedRows)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardBody>
                    </Card>

                </div>

                <div className='rightsection'>



                    <Card className="w-full">
                        <CardHeader className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-md">Options Values</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        {
                            expandedIndex &&
                            <CardBody className='flex flex-col gap-3'>
                                {optionValues?.result?.map((item, index) => (
                                    <>
                                        <div>
                                            <CustomTypography content={item.prd_name} weight='MEDIUM' size='MEDIUM' />
                                            <Divider className='mt-1' />
                                            <div className="flex gap-3 items-center mt-2">
                                                <CustomInput name='option_label' type='text'
                                                    maxLength={100}
                                                    placeholder='Label' label={'Label'}
                                                    onChange={(e) => { setOptionLabels({ ...optionLabels, [item.product_option_id]: e.target.value }) }}
                                                    value={optionLabels[item.product_option_id]}
                                                />
                                                <CustomInput name='sku' type='text'
                                                    disabled={true}
                                                    maxLength={100}
                                                    placeholder='SKU' label={'SKU'}
                                                    onChange={(e) => { handleInputChange({ e }) }}
                                                    value={item.sku}
                                                />
                                                <div className='flex gap-3'>

                                                    <div className="icon cursor-pointer" onClick={() => handleDeleteProductOptionValue(item.product_option_id)}>
                                                        <MdDelete size={24} className='mt-3 icon' color='#555' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* <div className="createbtn flex justify-end">
                                        <CustomButton label="Save" variant="primary" />
                                    </div> */}

                                        <Divider />
                                    </>
                                ))}
                                {/* <div className="icon cursor-pointer" onClick={() => handleUpdateProductOption(item.product_option_id)}>
                                    <FaSave size={24} className='mt-3 icon' color='#555' />
                                </div> */}
                                <div className="createbtn flex justify-end" >
                                    <CustomButton label="Save" variant="primary" onClick={() => handleUpdateProductOption()} />
                                </div>
                            </CardBody>

                        }
                    </Card>
                </div>
            </div>
            <EditOptionModal open={open} handleClose={() => setOpen(false)} editData={editData} />
        </div>
    )
}

export default OptionsTab