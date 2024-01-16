"use client";
import React from 'react'
import './Register.scss'
import CustomTypography from '@/library/typography/CustomTypography'
import CustomSwitchButton from '@/library/buttons/switchbtn/CustomSwitchButton'
import IndividualRegister from './individual/IndividualRegister';
import CompanyRegister from './company/CompanyRegister';
import CustomButton from '@/library/buttons/CustomButton';
import useWindowSize from '@/hooks/useWindowSize';
import { useRouter } from 'next/navigation';

const Register = () => {
    const [active, setActive] = React.useState(0);
    const router = useRouter();


    const { width, height } = useWindowSize();
    const isMobileView = width < 767;

    const handleNavigateToLogin = () => {
        router.push('/auth/login')
    }

    return (
        <>
            <div className='register-container'>
                <div className='register'>

                    <div className='headerbtn'>
                        <CustomTypography content="Already have an account?" color="GRAY-DARK" size="MEDIUM" weight="REGULAR" />
                        <CustomButton label='Sign In' variant='transparent' height={isMobileView ? '42px' : '50px'} onClick={handleNavigateToLogin} />
                        {/* <p className='h'> Already have an account?</p> */}
                    </div>
                    <div className='or'>
                        <CustomTypography content="OR" color="GRAY-DARK" size="SMALL" weight="MEDIUM" />
                    </div>
                    <div className='header'>
                        <CustomTypography content="Create an account" color="BLACK" size="SUPER-LARGE" weight="MEDIUM" />
                        <CustomTypography content="I’m registering as a" color="BLACK" size="MEDIUM" weight="REGULAR" />
                    </div>

                    <div className='switchbtn'>
                        <CustomSwitchButton active={active} setActive={setActive} labelOne="Individual" labelTwo="Company" />
                    </div>

                    {
                        active === 0 ? <IndividualRegister /> : <CompanyRegister />
                    }

                </div>
            </div >
        </>
    )
}

export default Register