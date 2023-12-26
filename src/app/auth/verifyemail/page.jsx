"use client";
import CustomTypography from '@/library/typography/CustomTypography'
import React, { useEffect } from 'react'
import './VerifyEmail.scss'
import AuthNavbar from '@/components/navbar/authnavbar/AuthNavbar'
import AuthFooter from '@/components/footer/authfooter/AuthFooter'
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getUserInfo } from '@/services/features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const VerifyEmail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams()

  let from = searchParams.get('orgin');
  let token = searchParams.get('token');

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUserInfo(token))
  }, [token])


  return (
    <>
      <div className="verifyemail-wrapper">
        <div className="verifyemail">
          <div className="header">
            <CustomTypography content='Verify your Email' size='SUPER-LARGE' color='PURE-BLACK' weight='SEMI-BOLD' />
            {/* <CustomTypography content='Verify using the link received on your inbox.' size='LARGE' color='PURE-BLACK' weight='REGULAR' /> */}


            <div className="changeemail">
              <p>Verify using the link received in {userInfo?.result?.usr_email}
                <Link href={{
                  pathname: '/auth/updateemail', query: {
                    orgin: from,
                    token: token
                  }
                }} >
                  <span className="changebtn">Change</span>
                </Link>
              </p>

            </div>

          </div>
          {/* <div className='refresh'>
            <CustomTypography content='This page will automatically refresh' size='MEDIUM-LARGE' color='GRAY-DARK' weight='MEDIUM' />
          </div> */}
        </div>
      </div>
    </>
  )
}

export default VerifyEmail