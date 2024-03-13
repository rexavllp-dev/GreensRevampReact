

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
    //Get user details by admin
    getSingleUser: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/${id}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Get user details by user
    getUserDetailsByUser: () => {
        return new Promise((resolve, reject) => {
            Axios.get(`/users/user-details`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Update user details by user
    updateUserDetailsByUser: (data) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/users/update-user-account`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Update company details
    updateCompanyDetailsByUser: (data) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/users/update-company`, data)
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
            Axios.get(`/address/get-all-addresses`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create address by user
    createUserAddress: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(`/address/create-address`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update address by user
    updateUserAddress: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put(`/address/update-address/${id}`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    
    getPickers: () => {

        return new Promise((resolve, reject) => {
            Axios.get(`/users/pickers`)
            .then(response => resolve(response))
            .catch(error => reject(error))

        })

    },
    
    getWarehouseUsers: () => {

        return new Promise((resolve, reject) => {
            Axios.get(`/users/warehouse-users`)
            .then(response => resolve(response))
            .catch(error => reject(error))

        })

    },

    //Update user account to company account
    updateAccountToCompany: (data) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.put(`/users/update-user-account-to-company`, data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getDrivers: () => {

        return new Promise((resolve, reject) => {
            Axios.get(`/users/drivers`)
            .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    //Update user password
    updatePassword: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(`/users/change-password`, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

    

    
}