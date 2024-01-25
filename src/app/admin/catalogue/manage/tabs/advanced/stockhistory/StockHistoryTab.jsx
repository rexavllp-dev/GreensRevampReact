
import React, { useEffect, useState } from 'react'
import "./StockHistoryTab.scss"
import CustomTable from '@/components/customtable/CustomTable'
import { Chip } from '@nextui-org/react'
import SearchInput from '@/library/input/searchinput/SearchInput'
import { useDispatch, useSelector } from 'react-redux'
import { getStockHistoryByProduct } from '@/services/features/productSlice'

function StockHistoryTab({id, data}) {

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        // {
        //     headerName: 'Product', field: 'prd_name',
        // },
        // {
        //     headerName: 'SKU', field: 'sku',
        // },
        {
            headerName: 'Quantity', field: 'qty',
        },
        {
           headerName: 'Previous Stock', field: 'previous_stock',
        },
        {
           headerName: 'Remaining Stock', field: 'remaining_stock',
        },
        {
            headerName: 'Comment', field: 'comment',
        },
    ]);
    const dispatch = useDispatch()
    const {stockHistoryByProduct} = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getStockHistoryByProduct({ id: id }))
    }, [])

    return (
        <div className='reviewtab'>
            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                </div>
            </div>
            <CustomTable columnDefs={columnDefs} rowData={stockHistoryByProduct?.result} />
        </div>
    )
}

export default StockHistoryTab