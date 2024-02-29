
import Axios from '../axios/Axios.js';
export const order = {

    //Create order
    createOrder: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/orders/create_order', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get order
    getOrder: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/orders/get-order/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get user orders
    getUserOrders: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/orders/get-user-orders')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Cancel order
    cancelOrder: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/cancelorders/cancel-order', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Cancel individual order
    cancelIndividualOrder: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/cancelorders/cancel-individual-order', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}