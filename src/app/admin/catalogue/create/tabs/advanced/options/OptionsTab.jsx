import { CameraIcon } from '@/components/customicons/CameraIcon';
import CustomTable from '@/components/customtable/CustomTable'
import { Avatar, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import React from 'react'
import "./OptionsTab.scss"
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { MdDelete, MdKeyboardArrowDown } from 'react-icons/md';
import { FaSave } from 'react-icons/fa';
import { IoAddCircleSharp } from "react-icons/io5";

const OptionsTab = () => {

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
            headerName: 'Price', field: 'price',
        },
        {
            headerName: 'SKU', field: 'sku',
        }
    ]);


    const [options, setOptions] = React.useState([
        {
            id: 1,
            name: 'Size',
            label: '',
            sku: '',
        },
        {
            id: 2,
            name: 'Color',
            label: '',
            sku: '',
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
                                    height={40}
                                    placeholder='Create New Option' label={'Create New Option'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.name}
                                />
                                <div className="createbtn cursor-pointer">
                                    {/* <CustomButton label="Add" variant="primary" /> */}
                                    <IoAddCircleSharp size={40} color='#555'
                                        className={`icon `}
                                         />
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
                                                <MdDelete size={24} className='mt-3 icon cursor-pointer' color='#555' onAn />
                                            </div>
                                        </div>
                                    </div>

                                    {expandedIndex === index && (
                                        <div className="w-full mb-3">
                                            <div className="searchinput">
                                                <div className="createbtn flex gap-3 items-center">
                                                    <SearchInput />

                                                </div>
                                            </div>
                                            <div className="optiontable">
                                                <CustomTable height={'300px'} columnDefs={columnDefs} rowData={[]} />
                                                <CustomButton label="Add" variant="primary" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}





                            {/* <div className="flex justify-between">
                                <p className="text-md">Color</p>
                                <div className="flex gap-3">
                                    <CustomButton label="Manage" variant="teritary" />
                                    <MdDelete size={24} className='mt-3' />
                                </div>
                            </div> */}
                        </CardBody>
                    </Card>
                    {/* <Card className="w-full mt-3">
                        <CardHeader className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-md">Size</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="searchinput">
                                <SearchInput />
                            </div>
                            <div className="optiontable">
                                <CustomTable height={'300px'} columnDefs={columnDefs} rowData={[]} />
                            </div>
                            <div className="createbtn flex justify-end">
                                <CustomButton label="Add" variant="primary" />
                            </div>
                        </CardBody>
                    </Card> */}
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
                            {options.map((item, index) => (
                                <>
                                    <div className="flex gap-3 items-center">
                                        <CustomInput name='new_option' type='text'
                                            maxLength={100}
                                            placeholder='Label' label={'Label'}
                                            onChange={(e) => { handleInputChange({ e }) }}
                                            value={formData.name}
                                        />
                                        <CustomInput name='new_option' type='text'
                                            disabled={true}
                                            maxLength={100}
                                            placeholder='SKU' label={'SKU'}
                                            onChange={(e) => { handleInputChange({ e }) }}
                                            value={formData.name}
                                        />
                                        <div className='flex gap-3'>
                                            <div className="icon cursor-pointer">
                                                <FaSave size={24} className='mt-3 icon' color='#555' />
                                            </div>
                                            <div className="icon cursor-pointer">
                                                <MdDelete size={24} className='mt-3 icon' color='#555' />
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

export default OptionsTab