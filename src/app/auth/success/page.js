"use client";
import { useEffect } from 'react';
import { oAuthSuccess, verifyEmail } from '@/services/features/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Spinner } from '@nextui-org/react';
import "./LoginSuccess.scss"
import { toast } from 'react-toastify';

const LoginSuccess = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    let access_token = searchParams.get('access_token');
    let refresh_token = searchParams.get('refresh_token');
    let usr_firstname = searchParams.get('usr_firstname');
    let usr_lastname = searchParams.get('usr_lastname');
    let usr_email = searchParams.get('usr_email');

    useEffect(() => {
        dispatch(oAuthSuccess({ access_token, refresh_token, usr_firstname, usr_lastname, usr_email })).then((res) => {
            toast.success('Login successfully!', {
                toastId: 'loginSuccess'
            });
        }).catch((error) => {
            console.log(error);
        })
    }, [access_token]);

    return (
        <div className="login-success">
            <Spinner />
        </div>
    )
};

export default LoginSuccess;