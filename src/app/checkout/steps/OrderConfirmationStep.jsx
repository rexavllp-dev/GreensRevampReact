
import React from 'react'
import CustomButton from '@/library/buttons/CustomButton'
import CustomTypography from '@/library/typography/CustomTypography'
import Image from 'next/image'


const OrderConfirmationStep = ({ onSubmit, cartProducts }) => {
    return (
        <div className="step">
            <div className="productcard">
                {/* <div className="title">
                    <CustomTypography content="2. Order Confirmation" color="BLACK" size="LARGE" weight="SEMI-BOLD" />
                </div> */}
                {
                    cartProducts?.result?.products?.map((item, index) => {
                        return (
                            <div className="content">
                                <div className="left">
                                    <div className="image-wrapper">
                                        <div className="image">
                                            <Image width={100} height={100}
                                                alt="product"
                                                src={item?.image ? item?.image : 'https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg'} 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="title">
                                        <CustomTypography content={item?.name}
                                            color='BLACK' style={{ borderBottom: '1px solid #111', display: 'inline' }}
                                            size='MEDIUM' weight='SEMI-BOLD' />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <CustomTypography content={`AED ${parseFloat(item?.priceVat?.toFixed(2))}`}  color="BLACK" size="MEDIUM" weight="SEMI-BOLD" />
                                        <CustomTypography content={"Quantity - " + item?.quantity} color="BLACK" size="MEDIUM" weight="REGULAR" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="flex justify-end">
                <CustomButton label='Continue' variant='primary' onClick={() => { onSubmit() }} />
            </div>
        </div>
    )
}

export default OrderConfirmationStep