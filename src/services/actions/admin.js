
import Axios from '../axios/Axios.js';
export const admin = {

    getLatestOrders: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_recent_orders')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getLatestCancelledOrders: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_latest_cancelled_orders')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getLatestReturnedOrders: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_latest_return')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getLatestReplacedOrders: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_latest_replacement')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getOutOfStockProducts: () => {
        return new Promise((resolve, reject) => {
            // Axios.get('/admin/dashboard/get_all_out_of_stock_products')
                // .then(response => resolve(response))
                // .catch(error => reject(error))
        })
    },

    getExpiredProducts: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_expired_products')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getAllMinQtyProducts: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_products_min_qty')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}