
import Axios from '../axios/Axios.js';
export const auth = {

    //User login
    login: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/users/login', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //User login with OTP
    loginWithOtp: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/users/login-otp', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Verify login OTP
    verifyLoginOtp: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/users/verify-login-otp', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Reset login OTP
    resendLoginOtp: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/users/resend-login-otp', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //User register
    userRegister: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/users/register', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Company register
    companyRegister: (data) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              };
            Axios.post('/company', data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Verify email
    verifyEmail: (token) => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/verify-email?token=${token}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //get user info
    getUserInfo: (token) => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/getuserinfo/${token}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update user email
    updateUserEmail: (data, token) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/users/update_email/${token}`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update user mobile
    updateUserMobile: (data, token) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/users/update_mobile_number/${token}`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Resend OTP
    resendOtp: (token) => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/resendotp/${token}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Resend Email
    resendEmail: (token) => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/resendemail/${token}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Verify OTP
    verifyOtp: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(`/users/verify-otp`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Forgot password
    forgotPassword: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(`/users/forgot-password`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Reset password
    resetPassword: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(`/users/reset-password`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}