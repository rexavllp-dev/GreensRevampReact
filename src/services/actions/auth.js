
import Axios from '../axios/Axios.js';
export const auth = {

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
            Axios.post('/company', data)
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
    //Verify OTP
    verifyOtp: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(`/users/verify-otp`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}