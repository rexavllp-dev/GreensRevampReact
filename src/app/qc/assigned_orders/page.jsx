'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllAssigedOrders, handleAssignDriver } from "@/services/features/orderSlice";
import { getDrivers } from "@/services/features/userSlice";


import OrderCard from '@/components/cards/ordercard/qc/OrderCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import OrderDetailsModal from '@/components/modal/order/OrderDetailsModal';
import DriverListModal from '@/components/modal/order/qc/DriverListModal';
import '../qc.scss'
import { toast } from 'react-toastify';


export default function QcDashboard() {

  const dispatch = useDispatch();

  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);
  const [isDriverListOpen, setDriverListOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState();
  const [driverlist, setDriverList] = React.useState({});
  const [driverId, setDriverId] = React.useState();
  const [noBoxes, setNoBoxes] = React.useState();
  

  const { dashboardOrders, isDriverAssigned } = useSelector(state => state.order);
  const { allDrivers }      = useSelector(state => state.users);
  
  
  const [modalData, setModalData] = React.useState({});


  const userId = 7;
  const role   = 5;

  useEffect(() => {

    dispatch(getAllAssigedOrders({ data:{ userId: userId, role:role }}));
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


  return (

    <div className="qc-tab-wrapper">
      <BreadCrumbs/>

    
            <div className="title">
              <CustomTypography content={"Orders"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
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
              <OrderCard action_label="Re-Assign Driver" open_driver_modal={(orderId) => setDriver(orderId)} open_modal={(data) => setModalOpen(data)} order_dat={order} key={order.id} />
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

      

    </div>

  )

}