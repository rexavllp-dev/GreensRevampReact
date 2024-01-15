"use client";
import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { IoMdMore } from "react-icons/io";
import './CustomTable.scss';
import { useRouter } from 'next/navigation';
import { FiDownload } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from 'axios';
import { CameraIcon } from '../customicons/CameraIcon';


export default function CustomTables({ rowData }) {
    const router = useRouter();

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

  


    return (
        <div
            id="myGrid" class="ag-theme-material custom-table"
            style={{ overflowX: 'auto' }}
        >
            <AgGridReact
                id="staff_grid"
                rowData={rowData}
                columnDefs={columnDefs}
                style={{ height: '100%', width: '100%' }}
                pagination={true}
                paginationPageSize={10}
                defaultColDef={defaultColDef}
                suppressRowClickSelection={true}
                suppressCellFocus={true}
                rowSelection="multiple"
                onCellClicked={(value) => console.log(value)}
            ></AgGridReact>
        </div>
    )
}

