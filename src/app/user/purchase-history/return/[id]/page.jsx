"use client";
import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Select, SelectItem } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import './ReturnOrder.scss'
import CustomButton from '@/library/buttons/CustomButton';
import CustomRadioBox from '@/library/radiobox/CustomRadioBox';
import { returnProduct, getOrder, getUserOrders } from '@/services/features/orderSlice';
import ImageUpload from '@/components/imageupload/ImageUpload';

const ReturnOrder = ({ params }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { singleOrder } = useSelector((state) => state.order);

    const [formData, setFormData] = React.useState({
        reason_id: 1,
        order_item_id: '',
        return_comment: '',
        files: []
    })

    React.useEffect(() => {
        dispatch(getOrder({ id: params.id }));
    }, [params.id]);

    React.useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleReturnOrder = () => {
        let data = {}
        if (formData?.reason_id === 4 && !formData?.return_comment) {
            toast.error('Please type return reason');
            return
        } else if (formData?.reason_id === 3) {
            data = {
                id: params.id,
                order_id: params.id,
                return_comment: formData?.return_comment,
            }
        } else {
            data = {
                id: params.id,
                order_id: params.id,
                reason_id: formData?.reason_id,
            }
        }
        dispatch(returnProduct({ data })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleFileUpload = async (event) => {
       const files = event.target.files;
        // const file = files[0];
        setFormData((prev) => ({
            ...prev, [event.target.name]: files
        }))
    }

    const handleDeleteImage = () => {

    }

    return (
        <div className='return-order'>
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Return Order'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
            </div>

            <div className="orderitems">
                {
                    singleOrder?.result?.map((item, i) => {
                        return (
                            <div className="orderitem">
                                <div className="flex items-center gap-3">
                                    <div className="image">
                                        <Image width={100} height={100}
                                            alt="product"
                                            src={item?.image_url ? item?.image_url : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'}
                                        />
                                    </div>
                                    <div className="details">
                                        <div className="title mb-2 flex gap-4 items-center">
                                            <CustomTypography content={item?.prd_name}
                                                color='BLACK'
                                                size='MEDIUM' weight='SEMI-BOLD' />
                                            {/* <div className='statusbadge' >
                                                <CustomTypography content={"Status"} color="BLACK" size="REGULAR" weight="SEMI-BOLD" />
                                            </div> */}
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <CustomTypography content={`AED ${parseFloat(item?.op_line_total)?.toFixed(2)}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                            <CustomTypography content={"Quantity - " + item?.op_qty} color="BLACK" size="MEDIUM" weight="REGULAR" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="return_order_section">
                <CustomTypography content="Reason for returning" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-LARGE" />

                <div className='mt-4 mb-5 '>
                    <CustomRadioBox
                        value={formData?.reason_id}
                        onChange={(value) => setFormData(prev => ({ ...prev, reason_id: value }))}
                        items={
                            [{
                                id: 1,
                                title: 'Defective product',
                                value: 1
                            },
                            {
                                id: 2,
                                title: 'Wrong size',
                                value: 2
                            },
                            {
                                id: 3,
                                title: 'Wrong Color',
                                value: 3
                            },
                            {
                                id: 4,
                                title: 'Other Reason',
                                value: 4
                            }
                            ]
                        } />
                </div>

                {
                    formData?.cancel_reason_id === 4 ?
                        <div className='mt-3 mb-5 pb-3'>
                            <CustomTextarea label={'Comments'}
                                placeholder={'Enter the reason here..'}
                                name={'return_comment'} value={formData.return_comment}
                                onChange={(e) => { handleInputChange({ e }) }}
                            />
                        </div> :
                        <></>
                }

                <ImageUpload
                    isProductImg={true}
                    name={'files'}
                    handleFileUpload={handleFileUpload}
                    images={formData?.files}
                    handleDeleteImage={handleDeleteImage}
                    haveUploadSize={true}
                    required={true}
                />
                <div className="mt-5">
                    <CustomButton label='Request for return' variant='primary' onClick={handleReturnOrder} />
                </div>
            </div>
        </div>
    )
}

export default ReturnOrder