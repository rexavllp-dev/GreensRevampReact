'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllDashbordOrders, handleVerifyItem} from "@/services/features/orderSlice";
import { getPickers } from "@/services/features/userSlice";


import OrderCard from '@/components/cards/ordercard/picker/OrderCard';
import BreadCrumbs from '@/components/breadcrumbs/BreadCrumbs';
import CustomTypography from '@/library/typography/CustomTypography';
import OrderDetailsModal from '@/components/modal/order/picker/OrderDetailsModal';
import './picker.scss'
import { toast } from 'react-toastify';


export default function PickerDashboard() {

  const dispatch = useDispatch();

  const [isConfirmationOpen, setConfirmationOpen] = React.useState(false);
  const [productCount, setProductCount]           = React.useState(0);
  const [disabled, setDisabled]                   = React.useState(true);

  const { dashboardOrders, isVeryfed } = useSelector(state => state.order);
  
  
  const [modalData, setModalData] = React.useState({});


  const userId = 6;
  const role   = 4;



  useEffect(() => {

    dispatch(getAllDashbordOrders({ data:{ userId: userId, role:role }}));
    dispatch(getPickers({}));
    
  }, [isVeryfed])



  const setModalOpen = (data) => {

    setModalData(data);
    setConfirmationOpen(true);
    setProductCount(data.products?.length);
    
  }

  var arr = [];
  const setCheckbox = (event, productId) => {

    if (event.target.checked) {
      arr.push(productId)
    } else {
      arr = arr.filter(item => item !== productId);
    }
    
    if(productCount === arr.length){
        setDisabled(false);
    } else {

      setDisabled(true);
    }
  }


  const verifyItem = () => {

    dispatch(handleVerifyItem({data:{orderId:modalData.orderId}})).then((res) => {
      if (res.payload?.success) {
          setConfirmationOpen(false);
          toast.success(res.payload?.message)
      } else {
          toast.error(res.payload?.message)
      }
    }).catch((err) => {
        console.log(err)
    })
  }


  return (

    <div className="picker-tab-wrapper">
      <BreadCrumbs/>
      <div className='dash_menu'>
        <div className="title">
          <CustomTypography content={"Orders"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
        </div>
      </div>
      {/* <div className="searchinput">
                    <SearchInput name={'search'} value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div> */}
      <div className="picker-tab">
        {
          dashboardOrders.result?.map((order) => {
            return (
              <OrderCard action_label="Assign Picker" open_picker_modal={(orderId) => setPicker(orderId)} open_modal={(data) => setModalOpen(data)} order_dat={order} key={order.orderId} />
            )
          })
        }

      </div>

      <OrderDetailsModal
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                data={modalData}
                disabled={disabled}
                handleCheckboxChange={(event, productId) => setCheckbox(event, productId)}
                verifyItem={() => verifyItem()}
                title="Order Details"
      />
    </div>

  )

}