import { CameraIcon } from '@/components/customicons/CameraIcon';
import CustomTable from '@/components/customtable/CustomTable'
import { Avatar, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import React from 'react'
import "./VariantsTab.scss"
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import SearchInput from '@/library/input/searchinput/SearchInput';
import { MdDelete } from 'react-icons/md';

const VariantsTab = () => {

    const [formData, setFormData] = React.useState({
        label: '',
    })

    const [columnDefs] = React.useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Thumbnail', field: 'prod_image',
            cellRenderer: (params) => {
                return (
                    <Avatar showFallback src='https://images.unsplash.com/broken' fallback={
                        <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
                    }
                    />
                )
            }
        },
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
        },
        {
            headerName: 'Brad Code', field: 'brand_code',
        },
    ]);
    return (
        <div className="optionstab">
        <div className="optionflex">
            <div className='leftsection'>

                <Card className="w-full">
                    <CardHeader className="flex justify-between">

                        <div className="createoption">
                            <CustomInput name='new_option' type='text'
                                maxLength={100}
                                placeholder='Create New Option' label={'Create New Option'}
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
                        <div className="flex justify-between center mb-3">
                            <p className="text-md">Size</p>
                            <CustomButton label="Manage" variant="teritary" />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-md">Color</p>
                            <CustomButton label="Manage" variant="teritary" />
                        </div>
                        {/* <div className="options">
                            <div className="stack">
                                <CustomInput name='Name' type='text'
                                    maxLength={100}
                                    placeholder='Name' label={'Name'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.name}
                                />
                            </div>
                            <div className="stack">
                                <CustomInput name='label' type='text'
                                    maxLength={100}
                                    placeholder='Label' label={'Label'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.label}
                                />
                                <CustomInput name='SKU' type='text'
                                    maxLength={100}
                                    placeholder='SKU' label={'SKU'}
                                    onChange={(e) => { handleInputChange({ e }) }}
                                    value={formData.sku}
                                />
                            </div>
                        </div> */}
                    </CardBody>
                </Card>
                <Card className="w-full mt-3">
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