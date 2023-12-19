
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

}