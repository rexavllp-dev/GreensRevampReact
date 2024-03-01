'use client';
import React, { useEffect } from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import "./HelpCenter.scss"
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton';
import CustomCheckbox from '@/library/checkbox/CustomCheckbox';
import CustomButton from '@/library/buttons/CustomButton';

const HelpCenter = () => {

    const dispatch = useDispatch();


    return (
        <div className="help_center_section">
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Help Center'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
            </div>
            <div className="privacy_content pt-3 pl-3" >

                <div className="content">
                    <div className="flex gap-3">
                        <CustomTypography content={'Receive marketing emails'} weight="BOLD" color="BLACK" size="MEDIUM-LARGE" />
                        <CustomToggleButton hideLabel={true} hideMainLabel={true} />
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <CustomCheckbox
                            label={<p>Yes! I want emails about savings, new items, & more</p>}
                            rounded={true}
                            name='checkbox'
                            value={true}
                            onChange={(value) => {
                                // setFilterTypes((prev) => prev.map((type) => type.id === filterType.id ?
                                //     {
                                //         ...type, filter: type.filter.map((f) => f.id === filter.id ?
                                //             { ...f, checked: value } : f)
                                //     } : type))
                            }}
                        />
                        <CustomCheckbox
                            label={"Requests to rate and review products you’ve ordered"}
                            rounded={true}
                            name='checkbox'
                            value={true}
                            onChange={(value) => {
                                // setFilterTypes((prev) => prev.map((type) => type.id === filterType.id ?
                                //     {
                                //         ...type, filter: type.filter.map((f) => f.id === filter.id ?
                                //             { ...f, checked: value } : f)
                                //     } : type))
                            }}
                        />
                        <CustomCheckbox
                            label={"Invitation to take customer surveys"}
                            rounded={true}
                            name='checkbox'
                            value={true}
                            onChange={(value) => {
                                // setFilterTypes((prev) => prev.map((type) => type.id === filterType.id ?
                                //     {
                                //         ...type, filter: type.filter.map((f) => f.id === filter.id ?
                                //             { ...f, checked: value } : f)
                                //     } : type))
                            }}
                        />
                    </div>
                </div>

                <div className="content">
                    <div className="flex gap-3">
                        <CustomTypography content={'Information Sharing'} weight="BOLD" color="BLACK" size="MEDIUM-LARGE" />
                        <CustomToggleButton hideLabel={true} hideMainLabel={true} />
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <CustomCheckbox
                            label={<p>Allow us to share your information with other companies so they can provide you with their own marketing and promotions.</p>}
                            rounded={true}
                            name='checkbox'
                            value={true}
                            onChange={(value) => {
                                // setFilterTypes((prev) => prev.map((type) => type.id === filterType.id ?
                                //     {
                                //         ...type, filter: type.filter.map((f) => f.id === filter.id ?
                                //             { ...f, checked: value } : f)
                                //     } : type))
                            }}
                        />

                    </div>
                </div>
                <div className="content">
                    <div className="flex gap-3">
                        <CustomTypography content={'Subscribe to our newsletter'} weight="BOLD" color="BLACK" size="MEDIUM-LARGE" />
                        <CustomToggleButton hideLabel={true} hideMainLabel={true} />
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <CustomButton label='Save' onClick={() => { }} variant='transparent' />
            </div>
        </div >
    )
}

export default HelpCenter