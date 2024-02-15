
import React, { useEffect, useState } from 'react'
import "./StockHistoryTab.scss"
import CustomTable from '@/components/customtable/CustomTable'
import { Chip } from '@nextui-org/react'
import SearchInput from '@/library/input/searchinput/SearchInput'
import { useDispatch, useSelector } from 'react-redux'
import { getStockHistoryByProduct } from '@/services/features/productSlice'

function StockHistoryTab({ id, data }) {

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
            headerName: 'Action', field: 'action',
            cellRenderer: (params) => {
                return (
                    <Chip color={params.data?.action === 'New Stock added to main' ? "success" : "danger"}
                        variant="dot">{params.data?.action === 'New Stock added to main' ? "Added" : "Reduced"}</Chip>
                )
            }
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
        {
            headerName: 'Date', field: 'created_at',
            cellRenderer: (params) => {
                const date = params.data?.created_at;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },
    ]);
    const dispatch = useDispatch()
    const { stockHistoryByProduct } = useSelector(state => state.products)

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