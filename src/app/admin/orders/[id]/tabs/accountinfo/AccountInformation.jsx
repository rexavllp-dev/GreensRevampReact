import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { Card, CardBody } from '@nextui-org/react'

const AccountInformation = ({ data }) => {
    return (
        <Card>
            <CardBody>
                    <div className="mb-4">
                        <CustomTypography content={'Account Information'} color={'BLACK'} size='LARGE' weight='MEDIUM' />
                    </div>

                    <div className="flex gap-4 w-full">
                        <div className="w-1/2 flex flex-col gap-3">
                            <div className="address">
                                <CustomTypography content={'Customer Name'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={data?.ord_customer_name}
                                    color={'BLACK'}
                                    size='REGULAR'
                                    weight='BOLD'
                                />
                            </div>
                            <div className="address">
                                <CustomTypography content={'Customer Email'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={data?.ord_customer_email}
                                    color={'BLACK'}
                                    size='REGULAR'
                                    weight='BOLD'
                                />
                            </div>
                            <div className="address">
                                <CustomTypography content={'Customer Phone'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={data?.ord_customer_phone}
                                    color={'BLACK'}
                                    size='REGULAR'
                                    weight='BOLD'
                                />
                            </div>
                            <div className="address">
                                <CustomTypography content={'Alternative Contact Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={""}
                                    color={'BLACK'}
                                    size='REGULAR'
                                    weight='BOLD'
                                />
                            </div>
                            <div className="address">
                                <CustomTypography content={'Customer Group'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={"Yes"}
                                    color={'BLACK'}
                                    size='REGULAR'
                                    weight='BOLD'
                                />
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-3">
                            <div className="address">
                                <CustomTypography content={'Amount Recieved'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={"-"}
                                    color={'BLACK'}
                                    size='REGULAR'
                                    weight='BOLD'
                                />
                            </div>
                            <div className="address">
                                <CustomTypography content={'No. of boxes'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={"0"}
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
                                <CustomTypography content={'Order Completed at'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                                <CustomTypography content={"-"}
                                    color={'BLACK'}
                                    size='REGULAR'
                                    weight='BOLD'
                                />
                            </div>
                        </div>
                    </div>
            </CardBody>
        </Card>
    )
}

export default AccountInformation