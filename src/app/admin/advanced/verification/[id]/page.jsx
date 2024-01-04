"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { Tab, Tabs } from '@nextui-org/react';
import axios from 'axios';
import { getSingleUser } from '@/services/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FiDownload } from 'react-icons/fi';
import './VerificationDetails.scss'
import CustomTypography from '@/library/typography/CustomTypography';

const VerificationDetails = ({ params }) => {

    const id = params.id;

    const router = useRouter();
    const dispatch = useDispatch()


    const [selectedTab, setSelectedTab] = React.useState("");


    const { singleUser } = useSelector(state => state.users)

    const data = singleUser?.result;

    // Determine the file type based on your business logic
    const isVatPdf = data?.company_vat_certificate?.endsWith('.pdf');
    const isTlPdf = data?.company_trade_license?.endsWith('.pdf');

    React.useEffect(() => {
        if (id) {
            dispatch(getSingleUser(id))
        }
    }, [id])


    return (
        <div className="verificationdetails" >
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


                <Tab title={`Details`}>
                    <div className="userdetails">
                        <div className="details">
                            <CustomTypography content={'First Name'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.usr_firstname}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="details">
                            <CustomTypography content={'Last Name'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.usr_lastname}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="details">
                            <CustomTypography content={'Company Name'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.company_name}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="details">
                            <CustomTypography content={'TRN number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.company_trn_number}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="details">
                            <CustomTypography content={'Email'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.usr_email}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="details">
                            <CustomTypography content={'Mobile Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.usr_mobile_number}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="details">
                            <CustomTypography content={'Landline Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.company_landline || 'N/A'}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="details">
                            <CustomTypography content={'Created Date'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.created_at?.split('T')[0]}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                    </div>
                </Tab>

            </Tabs>
        </div>
    )
}

export default VerificationDetails