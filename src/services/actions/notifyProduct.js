
import Axios from '../axios/Axios.js';

export const notifyProduct = {
    // Get notified Products
    getNotifiedProducts: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/users/get-notify-product')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Add notified products
    addNotifyProducts: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/users/notify-product', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Remove notified products
    removeNotifyProducts: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/users/delete-notify-product/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}