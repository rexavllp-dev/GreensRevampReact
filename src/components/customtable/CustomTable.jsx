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
import { FiDownload } from 'react-icons/fi';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import axios from 'axios';


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
        // { headerName: 'Role', field: 'role' },
        {
            headerName: 'Status', field: 'status',
            cellRenderer: (params) => {
                const isActive = params.data?.is_status;
                return (
                    <Chip color={isActive ? "success" : "danger"} variant="dot">{isActive ? "Active" : "Inactive"}</Chip>
                )
            }
        },
        { field: 'usr_email', headerName: 'Email' },
        { field: 'usr_mobile_number', headerName: 'Mobile' },
        {
            field: 'created_at', headerName: 'Created At',
        },
        {
            field: 'certificates',
            filter: false,
            cellRenderer: (params) => {
                if (!params.data?.usr_company) {
                    return null
                }
                return (
                    // <Dropdown>
                    //     <DropdownTrigger>
                    <div
                        onClick={() => {
                            router.push(`/admin/advanced/verification/${params.data.id}`)
                        }}
                        style={{ display: 'flex', height: '100%', alignItems: 'center', paddingLeft: '30px', cursor: 'pointer' }}>
                        {/* <FiDownload size={20} /> */}
                        <MdOutlineRemoveRedEye size={20} />
                    </div>
                    //     </DropdownTrigger>
                    //     <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                    //         <DropdownSection title="" showDivider>
                    //             <DropdownItem
                    //                 key="view"
                    //                 description="Download vat certificate"
                    //                 onClick={() => {
                    //                     axios({
                    //                         url: `http://localhost:5000/download/${encodeURIComponent(params.data.company_vat_certificate)}`,
                    //                         method: 'GET',
                    //                         responseType: 'blob', // important
                    //                     }).then((response) => {
                    //                         const url = window.URL.createObjectURL(new Blob([response.data]));
                    //                         const link = document.createElement('a');
                    //                         link.href = url;
                    //                         link.setAttribute('download', params.data.company_vat_certificate);
                    //                         document.body.appendChild(link);
                    //                         link.click();
                    //                     });
                    //                 }}
                    //             >
                    //                 Vat certificate
                    //             </DropdownItem>
                    //             <DropdownItem
                    //                 key="edit"
                    //                 description="Download trade license"
                    //                 onClick={() => {
                    //                     // window.open(`http://localhost:5000/download/${encodeURIComponent(params.data.company_trade_license)}`, '_blank')

                    //                     axios({
                    //                         url: `http://localhost:5000/download/${encodeURIComponent(params.data.company_trade_license)}`,
                    //                         method: 'GET',
                    //                         responseType: 'blob', // important
                    //                     }).then((response) => {
                    //                         const url = window.URL.createObjectURL(new Blob([response.data]));
                    //                         const link = document.createElement('a');
                    //                         link.href = url;
                    //                         link.setAttribute('download', params.data.company_trade_license);
                    //                         document.body.appendChild(link);
                    //                         link.click();
                    //                     });
                    //                     // window.open(`http://localhost:5000/download/${encodeURIComponent(params.data.company_trade_license)}`, '_blank')

                    //                 }}
                    //             >
                    //                 Trade license
                    //             </DropdownItem>
                    //         </DropdownSection>
                    //     </DropdownMenu>
                    // </Dropdown >
                )
            }
        },
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
                            <DropdownSection title="Actions" showDivider={false}>

                                {/* <DropdownItem
                                    key="view"
                                    description="Allows you to view the file"
                                    onClick={() => {
                                        router.push(`/admin/advanced/users/${params.data?.id}`)
                                    }}
                                >
                                    View
                                </DropdownItem> */}
                                <DropdownItem
                                    key="edit"
                                    description="Allows you to edit the file"
                                    onClick={() => {
                                        router.push(`/admin/advanced/users/${params.data?.id}`)
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

