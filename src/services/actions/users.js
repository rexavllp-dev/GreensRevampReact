

import Axios from '../axios/Axios.js';
export const users = {

    //Get all users by admin
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/all`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Get all users by admin
    getSingleUser: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/${id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create user by admin
    createUserByAdmin: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(`/admin/create-user`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update user by admin
    updateUserByAdmin: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/users/update-user/${id}`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update company status
    updateCompanyStatus: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/users/update-company-status/${id}`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Approve company status
    approveCompany: (id) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/admin/approve/${id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Reject company status
    rejectCompany: (id) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/admin/reject/${id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //get Address by user
    getAddressByUser: () => {
        return new Promise((resolve, reject) => {
            Axios.get(`/address/get-address`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }
}