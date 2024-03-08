'use client';
import React, { useEffect } from 'react';
import Papa from 'papaparse';

import { useDispatch, useSelector } from "react-redux";
import { getAllDashbordOrders, handleAssignDriver, handleDownloadTripSheet } from "@/services/features/orderSlice";
import { getDrivers } from "@/services/features/userSlice";


import OrderCard from '@/components/cards/ordercard/qc/OrderCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import OrderDetailsModal from '@/components/modal/order/OrderDetailsModal';
import DriverListModal from '@/components/modal/order/qc/DriverListModal';
import TripSheetModal from '@/components/modal/order/qc/TripSheetModal';

import './qc.scss'
import { Icons, toast } from 'react-toastify';
import { Button } from '@nextui-org/react';
import { IoMdDownload } from 'react-icons/io';


export default function QcDashboard() {

  const dispatch = useDispatch();

  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);
  const [isDriverListOpen, setDriverListOpen] = React.useState(false);
  const [isTripSheetOpen, setTripSheetOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState();
  const [driverlist, setDriverList] = React.useState({});
  const [driverId, setDriverId] = React.useState();
  const [noBoxes, setNoBoxes] = React.useState();
  const [tripsheet, setTripsheet] = React.useState({data: [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Doe', age: 40 }
  ]});

  const { dashboardOrders, isDriverAssigned } = useSelector(state => state.order);
  const { allDrivers }      = useSelector(state => state.users);
  
  
  const [modalData, setModalData] = React.useState({});


  const userId = 7;
  const role   = 5;

  useEffect(() => {

    dispatch(getAllDashbordOrders({ data:{ userId: userId, role:role }}));
    dispatch(getDrivers({}));

    if(isDriverAssigned == true){
      setDriverListOpen(false);
    }

  }, [isDriverAssigned])



  const setModalOpen = (data) => {
    setModalData(data);
    setConfirmationOpen(true);
  }

  const setDriver = (orderId) => {

    setOrderId(orderId);
    if(allDrivers){

        var arr = [];
        allDrivers.result?.map((driver) => {
          arr.push({ value: driver.id, label: driver.usr_firstname });
        });
    }

    setDriverList(arr);
    setDriverId(arr[0]?.value);
    setDriverListOpen(true);
    
  }

  const openTripSheetModal = () => {

    if(allDrivers){
        var arr = [];
        allDrivers.result?.map((driver) => {
          arr.push({ value: driver.id, label: driver.usr_firstname });
        });
    }

    setDriverList(arr);
    setDriverId(arr[0]?.value);
    setTripSheetOpen(true);
    
  }


  


  const assignDriver = () => {
      
      dispatch(handleAssignDriver({data:{userId:userId, orderId:orderId, driverId:driverId, boxes:noBoxes }})).then((res) => {
        if (res.payload?.success) {
            toast.success(res.payload?.message)
        } else {
            toast.error(res.payload?.message)
        }
    }).catch((err) => {
        console.log(err)
    })
  }

  const downloadSheet = () => {

    
    var tempArr  = [];
    var headings =  ['Order ID', 'name', 'No. of Boxes', 'Address'];// Add headings

    dispatch(handleDownloadTripSheet({data:{driverId:driverId}})).then((res) => {
      if (res.payload?.success) {

        res.payload.result.map((data) => {
          tempArr.push({orderid:data.orderId, name:data.ord_customer_name, no_boxes:data.no_boxes, addres:data.address_line_1});
        });

        const csvData = [headings]; // Add headings to the data array
        tempArr.forEach(item => {
          const row = [];
          for (const key in item) {
            if (item.hasOwnProperty(key)) {
              row.push(item[key]);
            }
          }
          csvData.push(row);
        });

        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } else {
          toast.error(res.payload?.message)
      }
    }).catch((err) => {
      console.log(err)
    })

    
    // const csv = Papa.unparse(tripsheet);
    // const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.setAttribute('href', url);
    // link.setAttribute('download', 'data.csv');
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    
  }


  return (

    <div className="qc-tab-wrapper">
      <BreadCrumbs/>
      <div className='dash_menu'>
            <div className="title">
              <CustomTypography content={"Orders"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="side_action">
            <Button onClick={() => openTripSheetModal()} color="primary">
            <IoMdDownload /> Download Tripsheet
          </Button>
            </div>
      </div>
      {/* <div className="searchinput">
                    <SearchInput name={'search'} value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div> */}
      <div className="qc-tab">
        {
          dashboardOrders.result?.map((order) => {
            return (
              <OrderCard action_label="Assign Driver" open_driver_modal={(orderId) => setDriver(orderId)} open_modal={(data) => setModalOpen(data)} order_dat={order} key={order.id} />
            )
          })
        }

      </div>

      <OrderDetailsModal
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                data={modalData}
                title="Order Details"
      />

      <DriverListModal
                  isOpen={isDriverListOpen}
                  onClose={() => setDriverListOpen(false)}
                  data={driverlist}
                  noBoxes={noBoxes}
                  assignDriver={() => assignDriver()}
                  setDriverId = {(driverId) => setDriverId(driverId)}
                  setNoBoxes = {(boxes) => setNoBoxes(boxes)}
                  
                  title="Order Details"
      />

      <TripSheetModal
                  isOpen={isTripSheetOpen}
                  onClose={() => setTripSheetOpen(false)}
                  data={driverlist}
                  downloadSheet={() => downloadSheet()}
                  setDriverId = {(driverId) => setDriverId(driverId)}
                  title="Order Details"
      />

    </div>

  )

}