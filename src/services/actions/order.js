
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

    //Get order item
    getOrderItem: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/cancelorders/all-order-items/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get user orders
    getUserOrders: ({ sort }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/orders/get-user-orders?sort=' + sort)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getAllDashbordOrders: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/orders/get-dashboard-orders', data)
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

    handleAssignPicker: (data) => {

        return new Promise((resolve, reject) => {
            Axios.post('/orders/assignpicker', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Return product
    returnProduct: (data) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.post('/users/return-product', data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getAllAssigedOrders: (data) => {

        return new Promise((resolve, reject) => {
            Axios.post('/orders/get-assigned-orders', data)
                .then(response => resolve(response))
                .catch(error => reject(error))

        })
    },
    //Replace product
    replaceProduct: (data) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.post('/users/replace-product', data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    handleVerifyItem: (data) => {

        return new Promise((resolve, reject) => {
            Axios.post('/orders/verify-item', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    handleAssignDriver: (data) => {

        return new Promise((resolve, reject) => {
            Axios.post('/orders/assigndriver', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    handleDownloadTripSheet: (data) => {

        return new Promise((resolve, reject) => {
            Axios.post('/orders/download_tripsheet', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}