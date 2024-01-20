"use client";
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import './ImageUpload.scss'
import CustomButton from '@/library/buttons/CustomButton';
import CustomTypography from '@/library/typography/CustomTypography';


const ImageUpload = ({ name, images, label, handleFileUpload, handleDeleteImage, haveUploadSize, uploadSize, required, haveIcon, isProductImg }) => {

    const inputFileRef = useRef()

    return (
        <>
            <div className="uploadmedia">
                <div className="uploadheader">
                    <CustomButton label={'Browse'} variant={"primary"}
                        haveIcon={true} icon={'UploadIcon'}
                        onClick={() => { inputFileRef.current.click(); }} />

                    <input
                        id='fileupload'
                        ref={inputFileRef}
                        type="file"
                        hidden
                        name={name}
                        onClick={(event) => {
                            event.target.value = null
                        }}
                        onChange={handleFileUpload}
                    />
                    {/* {haveUploadSize &&
                        <div className="upload-size">
                            <CustomTypography
                                variant='BODY-SECONDARY'
                                color='input-main'
                                content={
                                    `Image should be ${uploadSize.width} x ${uploadSize.height}`
                                } />
                        </div>
                    } */}
                </div>
                <div className="uploadeditems">
                    {images?.map((img, i) => {
                        return (
                            <div className="imgcard">
                                <div className="closeicon" onClick={() => handleDeleteImage(img)}>
                                    {/* <CloseIcon /> */}
                                </div>
                                <img
                                    src={isProductImg ? img?.url : img}
                                    alt={isProductImg ? img?.url : img}
                                />
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default ImageUpload