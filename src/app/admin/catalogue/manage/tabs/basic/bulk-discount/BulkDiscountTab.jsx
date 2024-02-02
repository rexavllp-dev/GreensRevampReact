
'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import './BulkDiscountTab.scss'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';
import { IoAddCircleSharp } from 'react-icons/io5';
import BulkDiscountModal from './components/BulkDiscountModal';
import { MdDelete, MdEdit } from 'react-icons/md';
import { deleteBulkDiscount, getBulkDiscountByProduct } from '@/services/features/bulkSlice';
import { toast } from 'react-toastify';

const BulkDiscountTab = ({ id, data }) => {

    const dispatch = useDispatch();
    const router = useRouter();


    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false)
    const [isUpdate, setIsUpdate] = React.useState(false)
    const [updateData, setUpdateData] = React.useState(false)

    const { isBulkDiscountUpdated, isBulkDiscountCreated, bulkDiscountData, isBulkDiscountDeleted } = useSelector((state) => state.bulk)

    React.useEffect(() => {
        dispatch(getBulkDiscountByProduct({ id }))
    }, [isBulkDiscountUpdated, isBulkDiscountCreated, isBulkDiscountDeleted])

    const handleAddDiscount = () => {
        setUpdateData({})
        setIsUpdate(false) 
        setOpen(true)
    }

    const handleEditDiscount = (data) => {
        setUpdateData(data)
        setIsUpdate(true)
        setOpen(true)
    }

    const handleDeleteBulkDiscount = (bulkId) => {
        dispatch(deleteBulkDiscount({ id: bulkId })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
            } else {
                toast.error(res.payload?.message);
            }
        }).catch((err) => {
            toast.error(err.message);
        })
    }

    return (
        <div className='bulkdiscount-tab'>

            <div className="form">

                <Card className="w-full">
                    <CardHeader className="flex gap-5">

                        <CustomTypography content='Bulk Discount' color="BLACK" size="MEDIUM" weight="REGULAR" />
                        <div className="createbtn cursor-pointer">
                            <IoAddCircleSharp size={40} color='#555'
                                className={`icon `}
                                onClick={() => {
                                    handleAddDiscount()
                                }}
                            />
                        </div>

                    </CardHeader>
                    <Divider />
                    <CardBody>
                        {
                            bulkDiscountData?.result?.map((item, index) => {
                                return (
                                    <div className="flex gap-3 mb-2">
                                        <div className='bulkinput'>
                                            <CustomInput name='start_range' type='text'
                                                disabled={true}
                                                maxLength={100}
                                                placeholder='Min Range' label={'Min Range'}
                                                onChange={(e) => { handleInputChange({ e }) }}
                                                value={item?.start_range}
                                            />
                                        </div>
                                        <div className='bulkinput'>
                                            <CustomInput name='end_range' type='text'
                                                disabled={true}
                                                maxLength={100}
                                                placeholder='Max Range' label={'Max Range'}
                                                onChange={(e) => { handleInputChange({ e }) }}
                                                value={item?.end_range}
                                            />
                                        </div>
                                        <div className='bulkinput'>
                                            <CustomInput name='discounted_price' type='text'
                                                disabled={true}
                                                maxLength={100}
                                                placeholder='Price Per Quantity' label={'Price Per Quantity'}
                                                onChange={(e) => { handleInputChange({ e }) }}
                                                value={item?.discounted_price}
                                            />
                                        </div>
                                        <div className="editicon cursor-pointer pt-2">
                                            {/* <CustomButton label="Add" variant="primary" /> */}
                                            <MdEdit size={24} color='#555'
                                                className={`icon `}
                                                onClick={() => {
                                                    handleEditDiscount(item)
                                                }}
                                            />
                                        </div>
                                        <div className="deleteicon cursor-pointer ml-3" onClick={() => handleDeleteBulkDiscount(item.id)}>
                                            <MdDelete size={24} className='mt-3 icon' color='#555' />
                                        </div>
                                    </div>
                                )
                            })
                        }



                    </CardBody>
                </Card>


            </div>
            {/* <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" loading={loading} onClick={handleSubmit} />
            </div> */}
            <BulkDiscountModal open={open} handleClose={() => setOpen(false)} id={id} isUpdate={isUpdate} updateData={updateData} />
        </div >
    )
}

export default BulkDiscountTab