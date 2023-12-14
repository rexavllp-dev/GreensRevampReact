

import React from 'react'
import './Accounts.scss'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomSelect from '@/library/select/custom-select/CustomSelect'
import CustomToggleButton from '@/library/buttons/togglebutton/CustomToggleButton'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton'

const Accounts = () => {

    const roles = [
        { label: 'Customer', value: 1 },
        { label: 'Admin', value: 2 },
        { label: 'Delivery', value: 3 },
      ]
    return (
        <div className='accountdetails'>

            <div className="form">

                <div className="stack">


                    <CustomInput name='first_name' type='text'
                        maxLength={100}
                        placeholder='First Name' label={'First Name'}
                        isRequired={true}
                    // onChange={(e) => { handleInputChange({ e }) }}
                    // value={formData.first_name}
                    // isInvalid={errors.first_name.error}
                    // errMsg={errors.first_name.message}
                    />
                    <CustomInput
                        name='last_name'
                        type='text'
                        maxLength={100}
                        placeholder='Last Name'
                        label={'Last Name'}
                        isRequired={true}
                    // onChange={(e) => { handleInputChange({ e }) }}
                    // value={formData.last_name}
                    // isInvalid={errors.last_name.error}
                    // errMsg={errors.last_name.message}
                    />
                    <CustomInput name={'email'} type='email'
                        placeholder="Email Address"
                        // isInvalid={errors.email.error}
                        // errMsg={errors.email.message}
                        label={'Email Address'} isRequired={true}
                    // value={formData.email}
                    // onChange={(e) => { handleInputChange({ e }) }}
                    />

                    <CustomSelect label={'Roles'} isRequired={true} data={roles} />
                    <CustomToggleButton label='Status' isRequired={true} />
                    <CustomTextarea label={'Notes'} placeholder={'Remarks'} />
                </div>

                <div className="stack">
                    <div className="shippingdetails">
                        <div className="shippingdetails-header">
                            <CustomTypography content={'Shipping Details'} color={'BLACK'} size='LARGE' weight='MEDIUM' />
                        </div>

                        <div className="address">
                            <CustomTypography content={'Address line'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={`Signature of Sugar
      DIP1 Tamcom - مجمع دبي للإستثمار - دبي - United Arab Emirates
      Dubai,
      United Arab Emirates`
                            }
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Flat/ Villa Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={`Schon business park retail 63`}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Area'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={`Dubai inveatment park`}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Mobile Number'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={`9876543210`}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>
                        <div className="address">
                            <CustomTypography content={'Nearest Landmark'} color={'BLACK'} size='MEDIUM-SMALL' weight='MEDIUM' />
                            <CustomTypography content={`Central plaza building`}
                                color={'BLACK'}
                                size='REGULAR'
                                weight='BOLD'
                            />
                        </div>

                    </div>
                </div>
            </div>
            <div className="savebtn">
                <CustomButton variant="primary" label="Save Changes" />
            </div>


        </div>
    )
}

export default Accounts