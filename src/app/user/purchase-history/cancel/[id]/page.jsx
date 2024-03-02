"use client";
import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Select, SelectItem } from '@nextui-org/react'
import { cancelOrder, getOrder, getUserOrders } from '@/services/features/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiDownload } from 'react-icons/fi';
import CustomStepper from '@/components/customstepper/CustomStepper';
import { toast } from 'react-toastify';
import CustomTextarea from '@/library/textarea/CustomTextarea';
import './CancelOrder.scss'
import CustomButton from '@/library/buttons/CustomButton';
import CustomRadioBox from '@/library/radiobox/CustomRadioBox';

const CancelOrder = ({ params }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { singleOrder } = useSelector((state) => state.order);

    const [formData, setFormData] = React.useState({
        cancel_note: '',
        cancel_reason_id: 1
    })

    React.useEffect(() => {
        dispatch(getOrder({ id: params.id }));
    }, [params.id]);

    const handleInputChange = ({ e }) => {
        setFormData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleCancelOrder = () => {
        let data = {}
        if (formData?.cancel_reason_id === 3 && !formData?.cancel_note) {
            toast.error('Please enter cancel note')
            return
        } else if (formData?.cancel_reason_id === 3) {
            data = {
                id: params.id,
                order_id: params.id,
                cancel_note: formData?.cancel_note,
                cancel_type: 'full'
            }
        } else {
            data = {
                id: params.id,
                order_id: params.id,
                cancel_reason_id: formData?.cancel_reason_id,
                cancel_type: 'full'
            }
        }
        dispatch(cancelOrder({ data })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message)
            } else {
                toast.error(res.payload?.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='cancel-order'>
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Cancel Order'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
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

            <div className="cancel_reason_section">
                <CustomTypography content="Reason for cancelling" weight="SEMI-BOLD" color="BLACK" size="MEDIUM-LARGE" />

                <div className='mt-4 mb-5 '>
                    <CustomRadioBox
                        value={formData?.cancel_reason_id}
                        onChange={(value) => setFormData(prev => ({ ...prev, cancel_reason_id: value }))}
                        items={
                            [{
                                id: 1,
                                title: 'Order Created by Mistake',
                                value: 1
                            },
                            {
                                id: 2,
                                title: 'Item(s) Would Not Arrive on Time',
                                value: 2
                            },
                            {
                                id: 3,
                                title: 'Other Reason',
                                value: 3
                            }
                            ]
                        } />
                </div>

                {
                    formData?.cancel_reason_id === 3 ?
                        <div className='mt-3 mb-5 pb-3'>
                            <CustomTextarea label={'Comments'}
                                placeholder={'Enter the reason here..'}
                                name={'cancel_note'} value={formData.cancel_note}
                                onChange={(e) => { handleInputChange({ e }) }}
                            />
                        </div> :
                        <></>
                }

                <CustomButton label='Cancel Product' variant='primary' onClick={handleCancelOrder} />
            </div>
        </div>
    )
}

export default CancelOrder