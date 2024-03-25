'use client';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTable from '@/components/customtable/CustomTable'
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import "./AdsTab.scss";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { createAds, updateAds, listHomeAds, deleteAds, getAds } from "@/services/features/adminSlice";
import { toast } from 'react-toastify';
import CustomButton from '@/library/buttons/CustomButton';
import ConfirmationModal from '@/components/modal/confirmation-modal/ConfirmationModal';
import AdsModal from '@/components/modal/admin/AdsModal';
import { IoMdMore } from 'react-icons/io';
import { CameraIcon } from '@/components/customicons/CameraIcon';

const AdsTab = () => {

    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [adsData, setAdsData] = useState([]);
    const [homeadss, setHomeadss] = useState([]);
    const [loading, setLoading] = useState(false);
    const {createAdsLoaded, deleteAdsLoaded, updateAdsLoaded }  = useSelector(state => state.admin)
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [categoryid, setAdsId] = useState(0);
    const [isModalOpen, setModalOpen] = React.useState(false);

    
    

    const [isConfirmationOpen, setConfirmationOpen] = React.useState(false)

    useEffect(() => {

        dispatch(listHomeAds({})).then((response) => {
            if (response.payload?.success) {
                setHomeadss(response.payload.result);
            }
        }).catch((err) => {
            console.log(err);
        })

    }, [createAdsLoaded, deleteAdsLoaded, updateAdsLoaded])


    const [columnDefs] = React.useState([
        {
            headerName: 'ID',
            field: 'ads_id',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            filter: false
        },
        {
            headerName: 'Thumbnail', field: 'ads_image', minWidth: 150,
            cellRenderer: (params) => {
                return (
                    <Avatar showFallback src={
                        (params.data?.ads_image)} fallback={
                            // 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'
                            <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="currentColor" size={16} />
                        } />
                )
            }
        },
        {
            headerName: 'Ads Name',
            field: 'ads_name',
            minWidth: 150
        },
        // {
        //     headerName: 'Transaction ID',   
        //     field: 'stripe_transaction_id',
        //     minWidth: 150
        // },
        // {
        //     headerName: 'Payment Method',
        //     field: 'payement_method',
        //     minWidth: 150,
        //     cellRenderer: (params) => {
        //         return 'Credit / Debit Cards'
        //     }
        // },
        {
            headerName: 'Created At',
            field: 'created_at',
            minWidth: 250,
            cellRenderer: (params) => {
                const date = params.data?.created_at;
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' };
                const normalDateTime = new Date(date).toLocaleString('en-IN', options);
                return normalDateTime;
            }
        },
        {
            field: 'action',
            minWidth: 150,
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
                                <DropdownItem
                                    key="edit"
                                    description="Allows you to edit the file"
                                    onClick={() => editAds(params.data?.ads_id)}
                                >
                                    Edit
                                </DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                )
            }
        }

    ]);

     // Function to recursively build category options
        const buildAdsOptions = (adss, depth = 0) => {
            return adss.flatMap(category => {
            const label = `${'--'.repeat(depth)} ${category.name}`; // Use dashes for indentation
            const options = [{ id: category.id, label: label }];
            if (category.children && category.children.length > 0) {
                options.push(...buildAdsOptions(category.children, depth + 1)); // Recursively build child options
            }
            return options;
            });
        };

        // Function to render options for select box
        const renderOptions = (options) => {
            return options.map(option => (
            <option key={option.id} value={option.id}>
                {option.label}
            </option>
            ));
        };


        const handleAdsChange = (e) => {
            setAdsId(e.target.value);
        }
        const handleAdsAddition = () => {
            dispatch(addHomePageAds({data:{category_id:categoryid}}));
        }

        const HandleDeleteAds = () => {
            setConfirmationOpen(false);
            onClose(); // Close the main modal
            if (selectedRows.length > 0) {
                const data = selectedRows.map(row => row.ads_id);
                setLoading(true)
                dispatch(deleteAds({ data: data })).then((res) => {
                    if (res.payload?.success) {
                        toast.success(res.payload?.message);
                    } else {
                        toast.error(res.payload?.message);
                    }
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                })
            } else {
                setLoading(false)
                toast.error('Please select atleast one ads')
            }
        }

        const handleRowClick = (data)=>{
            //router.push(`/admin/catalogue/manage/?id=${data?.id}`)
        }

        const handleSubmit = (formData) => {


            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            console.log(adsData.length);

            if(adsData.length == 0){

                dispatch(createAds({ data: formDataToSend})).then((res) => {
      
                    if (res.payload?.success) {
                        toast.success(res.payload.message);
                        setModalOpen(false);
                    } else {
                        toast.error(res.payload.message)
                    }
                  });

            } else {

                dispatch(updateAds({ data: formDataToSend, id: adsData[0].ads_id})).then((res) => {
      
                    if (res.payload?.success) {
                        toast.success(res.payload.message);
                        setModalOpen(false);
                    } else {
                        toast.error(res.payload.message)
                    }
                  });

            }
              
        }

        const editAds = (id) => {

            dispatch(getAds({id:id})).then((response) => {
                if (response.payload?.success) {
                    setAdsData(response.payload.result);
                    setModalOpen(true);
                }
            }).catch((err) => {
                console.log(err);
            })

            
        }
      
    
    return (
        <div className='transactions-wrapper'>

            <div className="header">
                <div className="searchinput">
                
                </div>
                <div className="right">

                    <CustomButton label="Delete" variant="danger" height={'42px'} onClick={() => setConfirmationOpen(true)} />
                    <CustomButton label="Create Ads" variant="primary" height={'42px'}
                            onClick={() => {setModalOpen(true); setAdsData([]) }} />
                </div>
            </div>

            <CustomTable columnDefs={columnDefs} rowData={homeadss}
                selectedRows={selectedRows} setSelectedRows={setSelectedRows}
                onRowClicked={handleRowClick}
            />

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={HandleDeleteAds}
                title="Confirmation"
                message="Are you sure you want to delete this ads?"
            />

            <AdsModal

                  isOpen={isModalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Ads"
                  adsData={adsData}
                  handleSubmit={(formData) => handleSubmit(formData)}
            />

        </div>
    )
}

export default AdsTab