"use client";
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '@nextui-org/react';
import "./LoginFail.scss"
import { toast } from 'react-toastify';


const LoginFail = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    let message = searchParams.get('message');

    useEffect(() => {
        if (message) {
            toast.error(message, {
                toastId: 'LoginFail'
            });
        }
        router.push('/auth/login');
    }, []);

    return (
        <div className="login-fail">
            <Spinner />
        </div>
    )
};

export default LoginFail;