
import React, { useState } from 'react'
import "./StockHistoryTab.scss"
import CustomTable from '@/components/customtable/CustomTable'
import { Chip } from '@nextui-org/react'
import SearchInput from '@/library/input/searchinput/SearchInput'

function StockHistoryTab() {

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'Product', field: 'product',
        },
        {
            headerName: 'SKU', field: 'sku',
        },
        {
            headerName: 'SKU', field: 'sku',
        },
        {
            headerName: 'Rating', field: 'rating',
        },
        {
            headerName: 'Status', field: 'status',
            cellRenderer: (params) => {
                const isActive = params.data?.is_status;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
                )
            }
        },
    ]);

    return (
        <div className='reviewtab'>
            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={[]} />
        </div>
    )
}

export default StockHistoryTab