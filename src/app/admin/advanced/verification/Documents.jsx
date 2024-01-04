"use client";
import CustomButton from "@/library/buttons/CustomButton";
import { Tab, Tabs } from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { FiDownload } from "react-icons/fi";



export default function Documents({ data }) {


    const [selectedTab, setSelectedTab] = React.useState("");
    // Determine the file type based on your business logic
    const isVatPdf = data?.company_vat_certificate?.endsWith('.pdf');
    const isTlPdf = data?.company_trade_license?.endsWith('.pdf');

    return (
        <div className="documents" >
            <Tabs
                aria-label="Options"
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
            >
                <Tab title={`Vat Certificate`}>
                    <div
                        onClick={() => {
                            axios({
                                url: `http://localhost:5000/download/${encodeURIComponent(data?.company_vat_certificate)}`,
                                method: 'GET',
                                responseType: 'blob', // important
                            }).then((response) => {
                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', data?.company_vat_certificate);
                                document.body.appendChild(link);
                                link.click();
                            });
                        }}
                        style={{
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px',
                            border: "1px solid #ccc", borderRadius: "8%", width: "130px", justifyContent: 'center', padding: '5px'
                        }}>
                        Download <FiDownload size={20} />
                    </div>

                    {
                        isVatPdf ?
                            <object
                                data={data?.company_vat_certificate}
                                type="application/pdf"
                                width="100%"
                                style={{ height: "600px" }}
                                sandbox="allow-same-origin allow-scripts"
                            >
                            </object>
                            :
                            <img src={data?.company_vat_certificate} alt="Document" style={{ height: "600px" }} />
                    }
                </Tab>

                <Tab title={`Trade License`}>
                    <div
                        onClick={() => {
                            axios({
                                url: `http://localhost:5000/download/${encodeURIComponent(data?.company_trade_license)}`,
                                method: 'GET',
                                responseType: 'blob', // important
                            }).then((response) => {
                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                const link = document.createElement('a');
                                link.href = url;
                                link.setAttribute('download', data?.company_trade_license);
                                document.body.appendChild(link);
                                link.click();
                            });
                        }}
                        style={{
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px',
                            border: "1px solid #ccc", borderRadius: "8%", width: "130px", justifyContent: 'center', padding: '5px'
                        }}>
                        Download <FiDownload size={20} />
                    </div>
                    {
                        isTlPdf ?
                            <object
                                data={data?.company_trade_license}
                                type="application/pdf"
                                width="100%"
                                style={{ height: "600px" }}
                                sandbox="allow-same-origin allow-scripts"
                            >
                            </object>
                            :
                            <img src={data?.company_trade_license} alt="Document" style={{ height: "600px" }} />
                    }
                </Tab>

            </Tabs>


        </div>
    )
}