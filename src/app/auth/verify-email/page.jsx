"use client";
import { useEffect } from 'react';
import { verifyEmail } from '@/services/features/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Spinner } from '@nextui-org/react';
import "./Verify_Email.scss"
import { toast } from 'react-toastify';

const EmailVerificationSuccess = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    let token = searchParams.get('token');

    useEffect(() => {
        const verifyEmailAddress = async () => {
            dispatch(verifyEmail(token)).then((res) => {
                if (res.payload?.status === 200) {
                    toast.success(res.payload?.message, {
                        toastId: 'success1',
                    });
                    router.push(`/auth/verifyphone/?orgin=individual&token=${token}`, { scroll: true });
                } else {
                    toast.error(res.payload?.message, {
                        toastId: 'fail1',
                    });
                }   
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

    return (
        <div className="verify-email">
            <Spinner />
        </div>
    )
};

export default EmailVerificationSuccess;