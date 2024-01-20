import { CameraIcon } from '@/components/customicons/CameraIcon';
import CustomTable from '@/components/customtable/CustomTable'
import { Avatar, Card, CardBody, CardHeader, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import React from 'react'
import "./RelatedProdTab.scss"
import CustomInput from '@/library/input/custominput/CustomInput';
import CustomButton from '@/library/buttons/CustomButton';
import SearchInput from '@/library/input/searchinput/SearchInput';

const RelatedProdTab = () => {

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

    const products = [
        {
            id: 1,
            prod_name: 'Product 1',
            price:24
        },
        {
            id: 2,
            prod_name: 'Product 2',
            price:24
        }
    ]
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
                                <SearchInput />
                            </div>
                            <div className="optiontable">
                                <CustomTable height={"280px"} columnDefs={columnDefs} rowData={[]} />
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
                                <p className="text-md">Related Products</p>
                            </div>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <div className="optiontable">
                                <CustomTable height={"400px"} columnDefs={columnDefs} rowData={products} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

        </div>
    )
}

export default RelatedProdTab