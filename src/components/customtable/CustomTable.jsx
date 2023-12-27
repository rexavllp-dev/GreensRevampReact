"use client";
import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Avatar, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { IoMdMore } from "react-icons/io";
import './CustomTable.scss';
import { useRouter } from 'next/navigation';
import { getAllUsers } from '@/services/features/userSlice';
import { useDispatch } from 'react-redux';


export default function CustomTable({ rowData }) {
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

    const [columnDefs] = useState([
        { headerName: 'Id', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: false },
        {
            headerName: 'First Name', field: 'usr_firstname'
        },
        {
            headerName: 'Last Name', field: 'usr_lastname'
        },
        { headerName: 'Role', field: 'role' },
        {
            headerName: 'Status', field: 'status',
            cellRenderer: (params) => {
                return (
                    <Chip color="success" variant="dot">Active</Chip>
                )
            }
        },
        { field: 'usr_email', headerName: 'Email' },
        { field: 'usr_mobile_number', headerName: 'Mobile' },
        {
            field: 'action',
            filter: false,
            cellRenderer: (params) => {
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <div style={{ display: 'flex', height: '100%', alignItems: 'center', paddingLeft: '10px', cursor: 'pointer' }}>
                                <IoMdMore size={20} />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                            <DropdownSection title="Actions" showDivider>

                                <DropdownItem
                                    key="view"
                                    description="Allows you to view the file"
                                    onClick={() => {
                                        router.push('/admin/advanced/users/details')
                                    }}
                                >
                                    View
                                </DropdownItem>
                                <DropdownItem
                                    key="edit"
                                    description="Allows you to edit the file"
                                    onClick={() => {
                                        router.push('/admin/advanced/users/details')
                                    }}
                                >
                                    Edit
                                </DropdownItem>
                            </DropdownSection>
                            {/* <DropdownSection title="Danger zone">
                                <DropdownItem
                                    key="delete"
                                    className="text-danger"
                                    color="danger"
                                    description="Permanently delete the file"
                                    onClick={() => {
                                        window.alert('Delete file');
                                    }}
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownSection> */}
                        </DropdownMenu>
                    </Dropdown>
                )
            }
        }
    ]);


    return (
        <div
            className="ag-theme-alpine"
            style={{ height: '450px' }}
        >
            <AgGridReact
                id="staff_grid"
                rowData={rowData}
                columnDefs={columnDefs}
                style={{ height: '100%', width: '100%' }}
                pagination={true}
                paginationPageSize={10}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                onCellClicked={(value) => console.log(value)}
            ></AgGridReact>
        </div>
    )
}

