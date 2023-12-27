

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
}