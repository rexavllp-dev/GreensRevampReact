
import Axios from '../axios/Axios.js';
export const bulk = {

    // Create bulk discount
    createBulkDiscount: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-bulk', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    // Update bulk discount
    updateBulkDiscount: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-bulk/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    // Get bulk discount by product id
    getBulkDiscountByProduct: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-bulk-product/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteBulkDiscount: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/products/delete-bulk/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create bulk request for quantity increment
    createBulkRequest: ({ data }) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/submit-bulk-request/', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get all bulk requests
    getAllBulkRequests: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-all-bulk-request/')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get all bulk requests
    updateBulkRequest: ({data, id}) => {
        return new Promise((resolve, reject) => {
            Axios.put('/admin/update-bulk-request/'+ id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get bulk status
    getBulkStatus: ({id}) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-bulk-status/'+ id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}