"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import CustomInput from "@/library/input/custominput/CustomInput";
import ImageUpload from "@/components/imageupload/ImageUpload";



export default function BannerEditModal({ bannerid, bannerData, isOpen, onClose, handleSubmit }) {
  
    const dispatch = useDispatch();

    const [image, setImage] =  React.useState(null)
    const [blobUrl, setBlobUrl] =  React.useState(null)


    
    const [formData, setFormData] = React.useState({

        banner_caption: '',
        banner_link:'',
        banner_link_text: '',
        banner_image: ''

    })


    useEffect(() => {
      setBlobUrl(null);
      setFormData((prev) => ({
        ...prev, 
        
        banner_caption:''+bannerData?.banner_caption+'',
        banner_link:''+bannerData?.banner_link+'',
        banner_link_text:''+bannerData?.banner_link_text+'',
        banner_image:''+bannerData?.banner_image+''

       }))

    },[bannerData]);

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
        ...prev, banner_image: file
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


        <CustomInput name='banner_caption' type='text'
                        maxLength={100}
                        placeholder='Title' label={'Title'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.banner_caption}
                        />

<CustomInput name='banner_link_text' type='text'
                        maxLength={100}
                        placeholder='Button Label' label={'Button Label'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.banner_link_text}
                        />

            
                        <CustomInput name='banner_link' type='text'
                        maxLength={100}
                        placeholder='Link' label={'Link'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData.banner_link}
                        />

                        <ImageUpload

                            isProductImg={true}
                            name={'banner_image'}
                            isDelete={false}
                            handleFileUpload={handleFileUpload}
                            images={[{url:blobUrl? blobUrl : formData.banner_image}]}
                            handleDeleteImage={(img) => handleDeleteImage('banner_image', img)}
                            haveUploadSize={true}
                            uploadSize={{
                                "width": '2760',
                                "height": '1575'
                            }}
                        />
                      

        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => handleSubmit(bannerid, formData)}>
            Update
          </Button>
        </ModalFooter>
       
      </ModalContent>
    </Modal>
  );
}
