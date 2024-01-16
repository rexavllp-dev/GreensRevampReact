"use client";
import React from 'react'
import './Login.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomButton from '@/library/buttons/CustomButton';
import useWindowSize from '@/hooks/useWindowSize';
import LoginPage from './loginpage/LoginPage';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [active, setActive] = React.useState(0);


  const { width, height } = useWindowSize();
  const isMobileView = width < 767;

  const handleNavigateToRegister = () => {
    router.push('/auth/register')
}

  return (
    <>
      <div className='login-container'>
        <div className='login'>

          <div className='headerbtn'>
            <CustomTypography content="Don't have an account?" color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
            <CustomButton label='Create an account' variant='transparent' height={isMobileView ? '42px' : '50px'} onClick={handleNavigateToRegister} />
            {/* <p className='h'> Already have an account?</p> */}
          </div>
          <div className='or'>
            <CustomTypography content="OR" color="GRAY-DARK" size="SMALL" weight="MEDIUM" />
          </div>
          <div className='header'>
            <CustomTypography content="Sign In" color="BLACK" size="SUPER-LARGE" weight="MEDIUM" />
            {/* <CustomTypography content="Lorem ipsum dolor" color="BLACK" size="MEDIUM" weight="REGULAR" /> */}
          </div>
          <LoginPage />
        </div>
      </div>
    </>
  )
}

export default Login