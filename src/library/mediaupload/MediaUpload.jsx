import { Input, Tooltip } from '@nextui-org/react'
import React from 'react'
import './MediaUpload.scss'
import { UploadIcon } from '@/components/customicons'
import InfoIcon from '@/components/customicons/InfoIcon'

const MediaUpload = ({ name, label, placeholder, isRequired, haveInfo, info, isInvalid, errMsg, value, handleFileUpload }) => {


    // const handleFileChange = (e) => {
    //     const fileInput = e.target;
    //     if (fileInput.files.length > 0) {
    //         setFile(fileInput.files[0]);
    //     }
    // };

    return (
        <div className='mediaupload-wrapper'>
            <div className='label-container'>
                <p className={isInvalid ? 'label invalid-label' : 'label'}>{label}
                    {isRequired && <span>*</span>}
                </p>
                {haveInfo &&
                    <Tooltip
                        content={info}
                        placement='right-end'
                        classNames={{
                            base: [
                                // arrow color
                                "before:bg-neutral-400 dark:before:bg-white",
                            ],
                            content: [
                                "py-2 px-4 shadow-xl",
                                "text-black bg-gradient-to-br from-white to-neutral-400",
                            ],
                        }}
                    >
                        <div className="infoicon">
                            <InfoIcon />
                        </div>
                    </Tooltip>
                }
            </div>

            <label className={isInvalid ? 'mediaupload mediaupload-invalid' : 'mediaupload'} >
                <input name={name} type="file" hidden id='file' onChange={handleFileUpload} />
                <p>{value?.name ? value.name : placeholder}</p>
                <div className='icon'>
                    <UploadIcon />
                </div>
            </label>
            <p className="errmsg">{isInvalid ? errMsg : ''}</p>
        </div>
    )
}

export default MediaUpload