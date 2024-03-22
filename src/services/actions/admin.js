
import Axios from '../axios/Axios.js';
export const admin = {

    // Update Banner
    updateBanner: ({ data, id}) => {

        return new Promise((resolve, reject) => {

            Axios.put('admin/banner/update_banner/' + id, data)
            .then(response => resolve(response))
            .catch(error => reject(error))

        })

    },

    getLatestOrders: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_recent_orders')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

     // List banner
    listBanner: () => {
        return new Promise((resolve, reject) => {
            Axios.get('admin/banner/get_all_banners/')
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
            Axios.get('/admin/dashboard/get_all_out_of_stock')
                .then(response => resolve(response))
                .catch(error => reject(error))
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
    getExpiredTradeLicenses: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_expired_trade_licenses')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}