'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllAssigedOrders, handleAssignPicker, isPickerAssigningError } from "@/services/features/orderSlice";
import { getPickers } from "@/services/features/userSlice";


import OrderCard from '@/components/cards/ordercard/warehouse/OrderCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import OrderDetailsModal from '@/components/modal/order/OrderDetailsModal';
import PickerListModal from '@/components/modal/order/picker/PickerListModal';
import '../warehouse.scss'
import { toast } from 'react-toastify';


export default function WarehouseDashboard() {

  const dispatch = useDispatch();

  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);
  const [isPickerListOpen, setPickerListOpen] = React.useState(false);
  const [orderId, setOrderId] = React.useState();
  const [pickerlist, setPickerList] = React.useState({});
  const [pickerId, setPickerId] = React.useState();

  const { dashboardOrders, isPickerAssigned } = useSelector(state => state.order);
  const { allPickers }      = useSelector(state => state.users);
  
  
  const [modalData, setModalData] = React.useState({});

  const userId = 5;
  const role   = 3;


  useEffect(() => {

    dispatch(getAllAssigedOrders({ data:{ userId: userId, role:role }}));
    dispatch(getPickers({}));

    if(isPickerAssigned == true){
      setPickerListOpen(false);
    }

  }, [isPickerAssigned])



  const setModalOpen = (data) => {
    setModalData(data);
    setConfirmationOpen(true);
  }

  const setPicker = (orderId) => {

    setOrderId(orderId);
    if(allPickers){

        var arr = [];
        allPickers.result?.map((picker) => {
          arr.push({ value: picker.id, label: picker.usr_firstname });
        });
    }

    setPickerList(arr);
    setPickerId(arr[0]?.value);
    setPickerListOpen(true);
    
  }


  const assignPicker = () => {
      
      dispatch(handleAssignPicker({data:{orderId:orderId, pickerId:pickerId}})).then((res) => {
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

    <div className="warehouse-tab-wrapper">
      <BreadCrumbs/>
      <div className="title">
        <CustomTypography content={"Orders"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
      </div>
      {/* <div className="searchinput">
                    <SearchInput name={'search'} value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div> */}
      <div className="warehouse-tab">
        {
          dashboardOrders.result?.map((order) => {
            return (
              <OrderCard action_label="Re-Assign"  open_picker_modal={(orderId) => setPicker(orderId)} open_modal={(data) => setModalOpen(data)} order_dat={order} key={order.id} />
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

      <PickerListModal
                  isOpen={isPickerListOpen}
                  onClose={() => setPickerListOpen(false)}
                  data={pickerlist}
                  assignPicker={() => assignPicker()}
                  setPickerId = {(pickerId) => setPickerId(pickerId)}
                  title="Order Details"
      />

    </div>

  )

}