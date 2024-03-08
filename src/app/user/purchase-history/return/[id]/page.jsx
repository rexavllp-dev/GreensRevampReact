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
import { returnProduct, getOrderItem } from '@/services/features/orderSlice';
import ImageUpload from '@/components/imageupload/ImageUpload';

const ReturnOrder = ({ params }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const { orderItem } = useSelector((state) => state.order);

    const [formData, setFormData] = React.useState({
        reason_id: 1,
        order_item_id: '',
        return_comment: '',
        files: [],
        filesUrl: []
    })

    React.useEffect(() => {
        dispatch(getOrderItem({ id: params.id }));
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
        const newFormData = new FormData();
        if (!formData.files.length) {
            toast.error('Please upload image');
            return;
        }
        // Loop through the array of files and append each file to the same key in the FormData object
        formData?.files?.forEach((file, index) => {
            newFormData.append('files', file);
        });

        if (formData?.reason_id === 4 && !formData?.return_comment) {
            toast.error('Please type return reason');
            return
        } else if (formData?.reason_id === 4) {
            newFormData.append('return_comment', formData?.return_comment)
            newFormData.append('order_item_id', params.id)
        } else {
            newFormData.append('reason_id', formData?.reason_id)
            newFormData.append('order_item_id', params.id)
        }

        dispatch(returnProduct({ data: newFormData })).then((res) => {
            if (res.payload?.success) {
                toast.success(res.payload?.message);
                router.back();
            } else {
                toast.error(res.payload?.message)
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleFileUpload = async (event) => {
        if (formData?.files?.length >= 3) {
            toast.error('You can only upload up to 3 images');
            return
        }
        const files = event.target.files;
        const file = files[0];

        // Create a URL for the uploaded file
        const fileUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev, ['files']: [
                ...prev.files, file
                // {
                //     ...file,
                //     url: fileUrl
                // }
            ]
        }))
        setFormData((prev) => ({
            ...prev, ['filesUrl']: [
                ...prev.filesUrl,
                {
                    name: file?.name,
                    url: fileUrl
                }
            ]
        }))
    }

    const handleDeleteImage = (obj) => {
        setFormData((prev) => ({
            ...prev, ['filesUrl']: prev.filesUrl.filter((item) => item?.name !== obj?.name)
            , ['files']: [...prev.files.filter((item) => item?.name !== obj?.name)]
        }))
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
                <div className="orderitem">
                    <div className="flex items-center gap-3">
                        <div className="image">
                            <Image width={100} height={100}
                                alt="product"
                                src={orderItem?.result?.image_url ? orderItem?.result?.image_url : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'}
                            />
                        </div>
                        <div className="details">
                            <div className="title mb-2 flex gap-4 items-center">
                                <CustomTypography content={orderItem?.result?.prd_name}
                                    color='BLACK'
                                    size='MEDIUM' weight='SEMI-BOLD' />
                                {/* <div className='statusbadge' >
                                                <CustomTypography content={"Status"} color="BLACK" size="REGULAR" weight="SEMI-BOLD" />
                                            </div> */}
                            </div>

                            <div className="flex flex-col gap-1">
                                <CustomTypography content={`AED ${parseFloat(orderItem?.result?.op_line_total)?.toFixed(2)}`} color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                <CustomTypography content={"Quantity - " + orderItem?.result?.op_qty} color="BLACK" size="MEDIUM" weight="REGULAR" />
                            </div>
                        </div>
                    </div>
                </div>
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
                    formData?.reason_id === 4 ?
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
                    images={formData?.filesUrl}
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