
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import { NUMBER_REGEX, SPECIAL_CHARS_REGEX, UPPERCASE_REGEX } from '@/utils/helpers/validationRules';
import { createUserByAdmin } from '@/services/features/userSlice';
import { isEmailValid } from '@/utils/helpers/IsEmailValid';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import './BannerTab.scss'
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import ImageUpload from '@/components/imageupload/ImageUpload';
import { Button } from '@nextui-org/react';
import EditableImageCard from '@/components/cards/imagecard/EditableImageCard';
import appConfig from '@/config/appConfig'
import BannerEditModal from '@/components/modal/admin/BannerEditModal';
import { listBanner, updateBanner } from "@/services/features/adminSlice";



const BannerTab = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const [isEditModalOpen, setEditModalOpen] = React.useState(false);
    const [homebanners, setHomeBanners] = React.useState([]);

    const [bannerid, setBannerId] = React.useState();
    const imageUrl = appConfig.server.imageUrl;


    const {
        isHomeBannerUpdated,
    } = useSelector(state => state.admin);


    useEffect(() => {


        dispatch(listBanner({})).then((res) => {
            if (res.payload?.success) {
                var arr = [];
                res.payload?.result.map((value) => {

                    arr[value.banner_id] = value;

                });
                
                setHomeBanners(arr)

                console.log(homebanners);

            } else {
                console.log(res);
            }
          });

    }, [isHomeBannerUpdated])


    const handleSubmit = (bannerid, formData) => {


        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });
  
          dispatch(updateBanner({ data: formDataToSend,  id: bannerid})).then((res) => {
  
            console.log(bannerid);
  
              if (res.payload?.success) {
                  toast.success(res.payload.message);
                  setEditModalOpen(false);
              } else {
                  //toast.error(res.payload.message)
                  console.log(res);
              }
            });
      }
  


    return (
        <div className='badgestab'>

<div className="homepage-tile-container">
            
            <div className="homepage-tile-webview">
                sdasdasdsad
                asdasdsa
            </div>


            </div>

            <BannerEditModal
                  isOpen={isEditModalOpen}
                  onClose={() => setEditModalOpen(false)}
                  title="Edit Bannerß"
                  bannerid={bannerid}
                  bannerData={homebanners[bannerid]}
                  handleSubmit={(bannerid, formData) => handleSubmit(bannerid, formData)}
            />
            
            
        </div>
        
    )
}

export default BannerTab