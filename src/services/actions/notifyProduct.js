
import Axios from '../axios/Axios.js';

export const notifyProduct = {
    // Get notified Products
    getNotifiedProducts: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/wishlist/get-all-wishlist')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Add notified products
    addNotifyProducts: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/wishlist/create-wishlist', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Remove notified products
    removeNotifyProducts: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/wishlist/remove-wishlist/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}