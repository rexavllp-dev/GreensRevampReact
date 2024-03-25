"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import CustomInput from "@/library/input/custominput/CustomInput";
import ImageUpload from "@/components/imageupload/ImageUpload";



export default function AdsModal({ adsid, adsData, isOpen, onClose, handleSubmit }) {
  
    const dispatch = useDispatch();

    const [image, setImage] =  React.useState(null)
    const [blobUrl, setBlobUrl] =  React.useState(null)

    const [formData, setFormData] = React.useState({

        ads_name: '',
        ads_link:'',
        ads_image: ''

    })



    useEffect(() => {
      setBlobUrl(null);

      setFormData((prev) => ({
        ...prev, 
    
        ads_name:''+adsData.length > 0 && adsData[0]?.ads_name ? adsData[0]?.ads_name : ''+'',
        ads_link:''+adsData.length > 0 && adsData[0]?.ads_link ? adsData[0]?.ads_link : ''+'',
        ads_image:''+adsData.length > 0 && adsData[0]?.ads_image ? adsData[0]?.ads_image : ''+'',

       }))


    },[adsData]);

    const [disbled, setDisabled] = React.useState(true);

    const handleInputChange = ({ e, country }) => {

        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleFileUpload = async (event) => {

      let files = null;
      files = event.target.files;
      const file = files[0];
      setFormData((prev) => ({
        ...prev, ads_image: file
      }))
      setBlobUrl(URL.createObjectURL(file));
  }

    const handleDeleteImage = (type, img) => {
        
    
    }

  

  return (
    <Modal isOpen={isOpen} size='md'  onClose={onClose} style={{ zIndex: 2000 }}>
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalBody>


        <CustomInput name='ads_name' type='text'
                        maxLength={100}
                        placeholder='Title' label={'Title'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData?.ads_name ? formData?.ads_name : ''}
                        />
            
                        <CustomInput name='ads_link' type='text'
                        maxLength={100}
                        placeholder='Link' label={'Link'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData?.ads_link ? formData?.ads_link : ''}
                        />

                        <ImageUpload

                            isProductImg={true}
                            name={'ads_image'}
                            isDelete={false}
                            handleFileUpload={handleFileUpload}
                            images={[{url:blobUrl? blobUrl : formData?.ads_image ? formData?.ads_image : ''  }]}
                            handleDeleteImage={(img) => handleDeleteImage('ads_image', img)}
                            haveUploadSize={true}
                            uploadSize={{
                                "width": '2760',
                                "height": '1575'
                            }}
                        />
                      

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => handleSubmit(formData)}>
            Submit
          </Button>
        </ModalFooter>
       
      </ModalContent>
    </Modal>
  );
}
