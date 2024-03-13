import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { Card, CardBody } from '@nextui-org/react'
import { convertDate } from '@/utils/helpers/convertDate'

const OrderInformation = ({ data }) => {
    return (
        <Card>
            <CardBody>
                <div className="shippingdetails">


                    <div className="shippingdetails-header">
                        <CustomTypography content={'Order Information'} color={'BLACK'} size='LARGE' weight='MEDIUM' />
                    </div>

                    <div className="address">
                        <CustomTypography content={'Order Date'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={convertDate(data?.orderDate)}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Order Status'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={"Cancelled"}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Shipping Method'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={data?.ord_shipping_method}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Payment Method'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={data?.ord_payment_method}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Mail Send'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={"Yes"}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Cash Recieved'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={"Yes"}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Delay Notification'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={"Yes"}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Arrival Notification'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={"Yes"}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'Delivery'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={"Normal"}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>
                    <div className="address">
                        <CustomTypography content={'RV/ Voucher Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                        <CustomTypography content={"-"}
                            color={'BLACK'}
                            size='REGULAR'
                            weight='BOLD'
                        />
                    </div>

                </div>
            </CardBody>
        </Card>
    )
}

export default OrderInformation