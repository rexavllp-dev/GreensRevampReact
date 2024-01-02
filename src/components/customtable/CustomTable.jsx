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
import axios from 'axios';
import AWS from 'aws-sdk';


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
            field: 'certificates',
            filter: false,
            cellRenderer: (params) => {
                if (!params.data?.usr_company) {
                    return null
                }
                return (
                    <Dropdown>
                        <DropdownTrigger>
                            <div style={{ display: 'flex', height: '100%', alignItems: 'center', paddingLeft: '30px', cursor: 'pointer' }}>
                                <FiDownload size={20} />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                            <DropdownSection title="" showDivider>
                                <DropdownItem
                                    key="view"
                                    description="Download vat certificate"
                                    onClick={() => {
                                        axios({
                                            url: `http://localhost:5000/download/${encodeURIComponent(params.data.company_vat_certificate)}`,
                                            method: 'GET',
                                            responseType: 'blob', // important
                                          }).then((response) => {
                                            const url = window.URL.createObjectURL(new Blob([response.data]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', params.data.company_vat_certificate);
                                            document.body.appendChild(link);
                                            link.click();
                                          });
                                    }}
                                >
                                    Vat certificate
                                </DropdownItem>
                                <DropdownItem
                                    key="edit"
                                    description="Download trade license"
                                    onClick={() => {

                                        axios({
                                            url: `http://localhost:5000/download/${encodeURIComponent(params.data.company_trade_license)}`,
                                            method: 'GET',
                                            responseType: 'blob', // important
                                          }).then((response) => {
                                            const url = window.URL.createObjectURL(new Blob([response.data]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', params.data.company_trade_license);
                                            document.body.appendChild(link);
                                            link.click();
                                          });
                                        // window.open(`http://localhost:5000/download/${encodeURIComponent(params.data.company_trade_license)}`, '_blank')

                                        // const anchor = document.createElement('a');
                                        // anchor.href = fileUrl;
                                        // anchor.setAttribute('download', 'downloaded_file.png');
                                        // // anchor.style.display = 'none';

                                        // document.body.appendChild(anchor);

                                        // anchor.click();

                                        // document.body.removeChild(anchor);
                                        // const handleDownload = async () => {
                                        //     try {

                                        //         const response = await fetch(`/ api / download ? url = ${ encodeURIComponent(params.data.company_trade_license)
                                        //         console.log(response)
                                        //         // const response = await fetch(params.data.company_trade_license);
                                        //         // if (!response.ok) {
                                    //         //     throw new Error('Download failed');
                                    //         // }

                                    //         const blob = await response.blob();
                                    //         const url = window.URL.createObjectURL(blob);

                                    //         const link = document.createElement('a');
                                    //         link.href = url;
                                    //         link.setAttribute('download', 'filename.ext'); // Set the desired filename
                                    //         document.body.appendChild(link);
                                    //         link.click();
                                    //         document.body.removeChild(link);
                                    //     } catch (error) {
                                    //         console.error('Error downloading file:', error);
                                    //     }
                                    // };
                                    // handleDownload();



                                    // let downloadImage = url => {
                                    //     let urlArray = url.split("/")
                                    //     let bucket = urlArray[3]
                                    //     let key = `${urlArray[4]}/${urlArray[5]}`
                                    //     let s3 = new AWS.S3({ params: { Bucket: bucket }})
                                    //     let params = {Bucket: bucket, Key: key}
                                    //     s3.getObject(params, (err, data) => {
                                    //         console.log(data)
                                    //       let blob=new Blob([data.Body], {type: data.ContentType});
                                    //       let link=document.createElement('a');
                                    //       link.href=window.URL.createObjectURL(blob);
                                    //       link.download=url;
                                    //       link.click();
                                    //     })
                                    //   }
                                    //   downloadImage( params.data.company_trade_license )
                                    // const handleDownload = async () => {
                                    //         try {
                                    //           const response = await fetch(`/app/api/download?url=${encodeURIComponent(params.data.company_trade_license)}`);
                                    //           console.log(response)
                                    //           const blob = await response?.body?.blob();

                                    //           const url = window.URL.createObjectURL(new Blob([blob]));
                                    //           const link = document.createElement('a');
                                    //           link.href = url;
                                    //           link.setAttribute('download', params.data.company_trade_license);
                                    //           document.body.appendChild(link);
                                    //           link.click();
                                    //           document.body.removeChild(link);
                                    //         } catch (error) {
                                    //           console.error('Error downloading file:', error);
                                    //         }
                                    //       };
                                    //       handleDownload()



                                    // axios.get(params.data.company_trade_license).then((response) => {
                                    //     const url = window.URL.createObjectURL(new Blob([response.data]));
                                    //     const link = document.createElement('a');
                                    //     link.href = url;
                                    //     link.setAttribute('download', params.data.company_trade_license);
                                    //     document.body.appendChild(link);
                                    //     link.click();
                                    // }).catch((error) => {
                                    //     console.log(error)
                                    // })
                                    // }
                                }}
                                >
                                Trade license
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
                    </Dropdown >
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
                            <DropdownSection title="Actions" showDivider>

                                <DropdownItem
                                    key="view"
                                    description="Allows you to view the file"
                                    onClick={() => {
                                        router.push(`/admin/advanced/users/${params.data?.id}`)
                                    }}
                                >
                                    View
                                </DropdownItem>
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

