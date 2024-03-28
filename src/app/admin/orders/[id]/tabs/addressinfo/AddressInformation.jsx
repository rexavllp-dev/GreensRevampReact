import React from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { Card, CardBody } from '@nextui-org/react'

const AddressInformation = ({ data }) => {
    return (
        <Card>
            <CardBody>

                <div className="mb-4">
                    <CustomTypography content={'Billing Address'} color={'BLACK'} size='LARGE' weight='MEDIUM' />
                </div>

                <div className="flex gap-4 w-full">
                    <div className="w-1/2 flex flex-col gap-3">
                        <div className="address">
                            <CustomTypography content={'Address line 1'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.address_line_1}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Address line 2'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.address_line_2}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Flat/ Villa Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.flat_villa}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-3">
                        <div className="address">
                            <CustomTypography content={'Zip code'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.zip_code}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Mobile Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.mobile_number}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Nearest Landmark'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={data?.delivery_remark}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card >
    )
}

export default AddressInformation