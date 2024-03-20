
import Axios from '../axios/Axios.js';
export const order = {

    //Get all orders by admin
    getAllOrdersByAdmin: ({
        driver_id,
        order_status_id,
        payment_method,
        accepted_by,
        sort_by,
        search_query
    }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/orders/get-all-orders?driver_id=' + driver_id + '&order_status_id=' + order_status_id + '&payment_method=' + payment_method + '&accepted_by=' + accepted_by + '&sort_by=' + sort_by + '&search_query=' + search_query)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

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
            Axios.get('/orders/order-item/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get all order items
    getAllOrderItems: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/orders/all-order-items/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get user orders
    getUserOrders: ({ sort, filters }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/orders/get-user-orders?sort=' + sort + '&filters=' + filters)
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

    getCancelledOrders: () => {

        return new Promise((resolve, reject) => {
            Axios.get('/orders/cancelled-orders')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getAllReturnsByAdmin: () => {

        return new Promise((resolve, reject) => {
            Axios.get('/admin/return/get-all-returns')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getAllReplacementsByAdmin: () => {

        return new Promise((resolve, reject) => {
            Axios.get('/admin/replacement/get-all-replacements')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    updateOrderQuantity: (data) => {
        return new Promise((resolve, reject) => {
            Axios.put('/orders/update_order_item_qty', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    createReason: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/cancelreasons/create-cancel-reason', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    updateReason: ({ data, id }) => {
        return new Promise((resolve, reject) => {
            Axios.put('/cancelreasons/update-cancel-reason/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    deleteReason: (data) => {
        return new Promise((resolve, reject) => {
            Axios.delete(`/cancelreasons/delete-cancel-reason?data=${JSON.stringify(data)}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getAllReasons: ({ type }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/cancelreasons/get-cancel-reasons?type=' + type)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }

}