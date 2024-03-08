"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import './CustomTable.scss';
import { useRouter } from 'next/navigation';


export default function CustomTable({ rowData, columnDefs, height, setSelectedRows, selectedRows, onRowClicked }) {
    const router = useRouter();
    const gridRef = useRef();

    const defaultColDef = useMemo(() => {
        return {
            // editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 50,
        };
    }, []);


    const onSelectionChanged = useCallback(() => {
        var rows = gridRef.current.api.getSelectedRows();
        setSelectedRows(rows);
    })

    return (
        <div
            id="myGrid" class="ag-theme-material custom-table"
            style={{
                overflowX: 'auto',
                height: height ? height : "calc(100vh - 270px)"

            }}
        >
            <AgGridReact
                ref={gridRef}
                id="staff_grid"
                rowData={rowData}
                columnDefs={columnDefs}
                style={{
                    height: '100%',
                    width: '100%'
                }}
                pagination={true}
                paginationPageSize={10}
                defaultColDef={defaultColDef}
                suppressRowClickSelection={true}
                suppressCellFocus={true}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
                onRowClicked={(value) => onRowClicked(value?.data)}
                // onRowSelected={(value) => console.log(value)}
                onCellClicked={(value) => console.log(value)}
            ></AgGridReact>
        </div>
    )
}

