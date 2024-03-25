
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
            <div className="section-one">
                    <EditableImageCard bannerid={1} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[1]?.banner_caption} link={homebanners[1]?.banner_link} img={homebanners[1]?.banner_image ? homebanners[1]?.banner_image : ''} buttonText={homebanners[1]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                    <EditableImageCard bannerid={2} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[2]?.banner_caption} link={homebanners[2]?.banner_link} img={homebanners[2]?.banner_image ? homebanners[2]?.banner_image : ''} buttonText={homebanners[2]?.banner_link_text}  cardHeight={"612px"} cardWidth={"100%"} />
                    <EditableImageCard bannerid={3} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[3]?.banner_caption} link={homebanners[3]?.banner_link} img={homebanners[3]?.banner_image ? homebanners[3]?.banner_image : ''} buttonText={homebanners[3]?.banner_link_text}  cardHeight={"300px"} cardWidth={"100%"} />
                </div>
                <div className="section-two">
                    <EditableImageCard bannerid={4} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[4]?.banner_caption} link={homebanners[4]?.banner_link} img={homebanners[4]?.banner_image ? homebanners[4]?.banner_image : ''} buttonText={homebanners[4]?.banner_link_text} cardHeight={"394px"} cardWidth={'100%'} />
                    <div className="subsection-one">
                        <div className="leftsection">
                            <EditableImageCard bannerid={5} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[5]?.banner_caption} link={homebanners[5]?.banner_link} img={homebanners[5]?.banner_image ? homebanners[5]?.banner_image : ''} buttonText={homebanners[5]?.banner_link_text} cardHeight={"250px"} cardWidth={'100%'} />
                        </div>
                        <div className="rightsection">
                            <EditableImageCard bannerid={6} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[6]?.banner_caption} link={homebanners[6]?.banner_link} img={homebanners[6]?.banner_image ? homebanners[6]?.banner_image : ''} buttonText={homebanners[6]?.banner_link_text} cardHeight={"250px"} cardWidth={'100%'} />
                        </div>
                    </div>
                    <div className="subsection-two">
                        <EditableImageCard bannerid={7} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[7]?.banner_caption} link={homebanners[7]?.banner_link} img={homebanners[7]?.banner_image ? homebanners[7]?.banner_image : ''} buttonText={homebanners[7]?.banner_link_text} cardHeight={"250px"} cardWidth={'100%'} />
                        <EditableImageCard bannerid={8} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[8]?.banner_caption} link={homebanners[8]?.banner_link} img={homebanners[8]?.banner_image ? homebanners[8]?.banner_image : ''} buttonText={homebanners[8]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                    </div>

                </div>
                <div className="section-three">
                    <EditableImageCard bannerid={9} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[9]?.banner_caption} link={homebanners[9]?.banner_link} img={homebanners[9]?.banner_image ? homebanners[9]?.banner_image : ''} buttonText={homebanners[9]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                    <EditableImageCard bannerid={10} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[10]?.banner_caption} link={homebanners[10]?.banner_link} img={homebanners[10]?.banner_image ? homebanners[10]?.banner_image : ''} buttonText={homebanners[10]?.banner_link_text} cardHeight={"612px"} cardWidth={"100%"} />
                    <EditableImageCard bannerid={11} setModal={(bannerid) =>  {setEditModalOpen(true); setBannerId(bannerid)}} title={homebanners[11]?.banner_caption} link={homebanners[11]?.banner_link} img={homebanners[11]?.banner_image ? homebanners[11]?.banner_image : ''} buttonText={homebanners[11]?.banner_link_text} cardHeight={"300px"} cardWidth={"100%"} />
                </div>
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