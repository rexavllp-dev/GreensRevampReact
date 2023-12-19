"use client";
import { useEffect } from 'react';
import { verifyEmail } from '@/services/features/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

const EmailVerificationSuccess = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    let token = searchParams.get('token');

    useEffect(() => {

        const verifyEmailAddress = async () => {
            dispatch(verifyEmail(token)).then((res) => {
                console.log(res)
                router.push(`/auth/verifyphone/?orgin=individual&token=${token}`, { scroll: true });
            }).catch((err) => {
                console.log(err);
            })
        };

        if (token) {
            verifyEmailAddress();
        } else {
            console.error('Email verification token not found!');
        }
    }, []);

    return null; // or display a loading spinner
};

export default EmailVerificationSuccess;