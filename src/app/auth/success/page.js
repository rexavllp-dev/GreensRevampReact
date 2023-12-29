"use client";
import { useEffect } from 'react';
import { oAuthSuccess, verifyEmail } from '@/services/features/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Spinner } from '@nextui-org/react';
import "./LoginSuccess.scss"
import { toast } from 'react-toastify';
import { Cookies } from 'react-cookie';
import { Axios } from 'axios';

const cookies = new Cookies();

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
        console.log(access_token)
        console.log(refresh_token)
        console.log(usr_firstname)
        console.log(usr_lastname)
        console.log(usr_email)

        if (access_token && refresh_token && usr_firstname) {

            let user = {
                usr_firstname: usr_firstname,
                usr_lastname: usr_lastname,
                usr_email: usr_email
            }

            // Token set in Cookies
            cookies.set('accessToken', access_token);
            cookies.set('refreshToken', refresh_token);
            cookies.set('user', JSON.stringify(user));
            toast.success('Login successfully!', {
                toastId: 'loginSuccess'
            });
            router.push('/');
        }

        else {
            toast.error('Invalid authorization', {
                toastId: 'loginError'
            })
        }
        // oAuthSuccess({ access_token, refresh_token, usr_firstname, usr_lastname, usr_email }).then((res) => {
        //     toast.success('Login successfully!', {
        //         toastId: 'loginSuccess'
        //     });
        //     // router.push('/')
        // }).catch((error) => {
        //     console.log(error);
        // })
    }, [access_token, refresh_token, usr_email, usr_firstname, usr_lastname]);

    return (
        <div className="login-success">
            <Spinner />
        </div>
    )
};

export default LoginSuccess;