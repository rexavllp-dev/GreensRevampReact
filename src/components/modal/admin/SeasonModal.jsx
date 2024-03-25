"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import CustomInput from "@/library/input/custominput/CustomInput";
import ImageUpload from "@/components/imageupload/ImageUpload";



export default function SeasonModal({ seasonid, seasonData, isOpen, onClose, handleSubmit }) {
  
    const dispatch = useDispatch();

    const [image, setImage] =  React.useState(null)
    const [blobUrl, setBlobUrl] =  React.useState(null)

    const [formData, setFormData] = React.useState({

        season_name: '',
        season_link:'',
        season_image: ''

    })



    useEffect(() => {
      setBlobUrl(null);

      setFormData((prev) => ({
        ...prev, 
    
        season_name:''+seasonData.length > 0 && seasonData[0]?.season_name ? seasonData[0]?.season_name : ''+'',
        season_link:''+seasonData.length > 0 && seasonData[0]?.season_link ? seasonData[0]?.season_link : ''+'',
        season_image:''+seasonData.length > 0 && seasonData[0]?.season_image ? seasonData[0]?.season_image : ''+'',

       }))


    },[seasonData]);

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
        ...prev, season_image: file
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


        <CustomInput name='season_name' type='text'
                        maxLength={100}
                        placeholder='Title' label={'Title'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData?.season_name ? formData?.season_name : ''}
                        />
            
                        <CustomInput name='season_link' type='text'
                        maxLength={100}
                        placeholder='Link' label={'Link'}
                        isRequired={true}
                        onChange={(e) => { handleInputChange({ e }) }}
                        value={formData?.season_link ? formData?.season_link : ''}
                        />

                        <ImageUpload

                            isProductImg={true}
                            name={'season_image'}
                            isDelete={false}
                            handleFileUpload={handleFileUpload}
                            images={[{url:blobUrl? blobUrl : formData?.season_image ? formData?.season_image : ''  }]}
                            handleDeleteImage={(img) => handleDeleteImage('season_image', img)}
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
