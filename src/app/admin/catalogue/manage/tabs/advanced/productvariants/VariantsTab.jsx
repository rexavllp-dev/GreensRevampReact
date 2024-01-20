import { CameraIcon } from '@/components/customicons/CameraIcon';
import CustomTable from '@/components/customtable/CustomTable'
import { Avatar, Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import React from 'react'
import "./VariantsTab.scss"
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { MdDelete, MdKeyboardArrowDown } from 'react-icons/md';

const VariantsTab = () => {

    const [formData, setFormData] = React.useState({
        label: '',
    })

    const [expandedIndex, setExpandedIndex] = React.useState(null);

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
            headerName: 'Name', field: 'prod_name'
        },
        {
            headerName: 'Stock', field: 'stock',
        },
        {
            headerName: 'Price', field: 'price',
        },
        {
            headerName: 'SKU', field: 'sku',
        }
    ]);


    const [options, setOptions] = React.useState([
        {
            id: 1,
            name: 'Size'
        },
        {
            id: 2,
            name: 'Color'
        }
    ])
    return (
        <div className="optionstab">
            <div className="optionflex">
                <div className='leftsection'>

                    <Card className="w-full">
                        <CardHeader className="flex justify-between">

                            <div className="createoption">
                                <CustomInput name='new_option' type='text'
                                    maxLength={100}
                                    placeholder='Create New Variant' label={'Create New Variant'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.name}
                                />
                                <div className="createbtn">
                                    <CustomButton label="Add" variant="primary" />
                                </div>
                            </div>

                        </CardHeader>
                        <Divider />
                        <CardBody>
                            {options.map((item, index) => (
                                <div key={index} className="accordion-item">
                                    <div
                                        className={`accordion-header ${expandedIndex === index ? 'expanded' : ''}`}

                                    >

                                        <div className="flex justify-between items-center mb-3">
                                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleItemClick(index)}>
                                                <MdKeyboardArrowDown size={20} className='mt-1' />
                                                <p className="text-md">{item.name}</p>
                                            </div>
                                            <div className="flex gap-3">
                                                <CustomButton label="Manage" variant="teritary" onClick={() => handleItemClick(index)} />
                                                <MdDelete size={24} className='mt-3' />
                                            </div>
                                        </div>
                                    </div>

                                    {expandedIndex === index && (
                                        <div className="w-full mb-3">
                                            <div className="searchinput">
                                                <div className="createbtn flex gap-3 items-center">
                                                    <SearchInput />
                                                    <CustomButton label="Add" variant="primary" />
                                                </div>
                                            </div>
                                            <div className="optiontable">
                                                <CustomTable height={'300px'} columnDefs={columnDefs} rowData={[]} />
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
                        <CardBody className='flex flex-col gap-3'>
                            <>
                                <div className="flex gap-3 items-center">
                                    <CustomInput name='new_option' type='text'
                                        maxLength={100}
                                        placeholder='Label' label={'Label'}
                                        onChange={(e) => { handleInputChange({ e }) }}
                                        value={formData.name}
                                    />
                                    <MdDelete size={24} className='mt-3' />
                                </div>
                                <div className="flex gap-3">
                                    <CustomInput name='new_option' type='text'
                                        maxLength={100}
                                        placeholder='SKU' label={'SKU'}
                                        onChange={(e) => { handleInputChange({ e }) }}
                                        value={formData.name}
                                    />
                                    <CustomInput name='new_option' type='text'
                                        maxLength={100}
                                        placeholder='Price' label={'Price'}
                                        onChange={(e) => { handleInputChange({ e }) }}
                                        value={formData.name}
                                    />
                                </div>

                                <div className="createbtn flex justify-end">
                                    <CustomButton label="Save" variant="primary" />
                                </div>
                            </>
                            <Divider />
                            <>
                                <div className="flex gap-3 items-center">
                                    <CustomInput name='new_option' type='text'
                                        maxLength={100}
                                        placeholder='Label' label={'Label'}
                                        onChange={(e) => { handleInputChange({ e }) }}
                                        value={formData.name}
                                    />
                                    <MdDelete size={24} className='mt-3' />
                                </div>
                                <div className="flex gap-3">
                                    <CustomInput name='new_option' type='text'
                                        maxLength={100}
                                        placeholder='SKU' label={'SKU'}
                                        onChange={(e) => { handleInputChange({ e }) }}
                                        value={formData.name}
                                    />
                                    <CustomInput name='new_option' type='text'
                                        maxLength={100}
                                        placeholder='Price' label={'Price'}
                                        onChange={(e) => { handleInputChange({ e }) }}
                                        value={formData.name}
                                    />
                                </div>

                                <div className="createbtn flex justify-end">
                                    <CustomButton label="Save" variant="primary" />
                                </div>
                            </>
                        </CardBody>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default VariantsTab