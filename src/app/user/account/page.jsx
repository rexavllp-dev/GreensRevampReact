'use client';
import React, { useEffect } from 'react'
import CustomInput from '@/library/input/custominput/CustomInput'
import CustomPhoneInput from '@/library/input/phoneinput/CustomPhoneInput'
import CustomTextarea from '@/library/textarea/CustomTextarea'
import CustomTypography from '@/library/typography/CustomTypography'
import { useDispatch, useSelector } from 'react-redux';
import GoogleMap from '@/components/maps/GoogleMap';
import { FaPlus, FaRegEdit } from 'react-icons/fa';
import CustomAddressRadio from '@/app/checkout/components/CustomAddressRadio';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import "./UserAccount.scss";
import CustomButton from '@/library/buttons/CustomButton';
import { CustomCalendar } from '@/library/calendar/CustomCalendar';
import MediaUpload from '@/library/mediaupload/MediaUpload';
import CompanyForm from './forms/CompanyForm';
import { useRouter } from 'next/navigation';
import { getUserDetailsByUser, updateUserDetailsByUser } from '@/services/features/userSlice';
import CompanyUserForm from './forms/CompanyUserForm';
import UserForm from './forms/UserForm';

const UserAccount = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [isDisabled, setIsDisabled] = React.useState(true);

    const { userDetails, isAccountToCompanyUpdated } = useSelector(state => state.users)

    React.useEffect(() => {
        dispatch(getUserDetailsByUser({}))
    }, [isAccountToCompanyUpdated])

    return (
        <div className="user_account">
            <div className="header mb-3 flex items-center gap-5">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Account Information'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
                <div className="editbtn cursor-pointer">
                    <div className="btn" onClick={() => { setIsDisabled(!isDisabled) }}>
                        <FaRegEdit size={20} />
                    </div>
                </div>
            </div>

            <div className="w-100 mt-3">
                <div className='account_form'>
                    <div className="stack">
                        {
                            userDetails?.result?.usr_company ?

                                <CompanyUserForm userDetails={userDetails} isDisabled={isDisabled} />
                                :
                                <UserForm userDetails={userDetails} isDisabled={isDisabled} />
                        }

                        <div className='pt-5'>
                            {
                                userDetails?.result?.usr_company ?
                                    null
                                    :
                                    <div className="account_card mb-5">
                                        <CustomTypography content={"Change password"} color={'BLACK'} size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                                        <div className='place-self-end'>
                                            <CustomButton variant='primary' label='Continue' onClick={() => { router.push('/settings/change-password') }} />
                                        </div>
                                    </div>
                            }

                        </div>
                    </div>

                    {
                        userDetails?.result?.usr_company ?
                            <div className="stack">
                                <div className="account_card mb-5">
                                    <CustomTypography content={"Change password"} color={'BLACK'} size='MEDIUM-LARGE' weight='SEMI-BOLD' />
                                    <div className='place-self-end'>
                                        <CustomButton variant='primary' label='Continue' onClick={() => { router.push('/settings/change-password') }} />
                                    </div>
                                </div>
                            </div>

                            :
                            <CompanyForm isDisabled={isDisabled} />
                    }
                </div>

            </div>

        </div >
    )
}

export default UserAccount