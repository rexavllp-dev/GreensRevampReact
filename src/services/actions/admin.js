
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
    getTotalOrderCount: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_total_orders')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getTotalSales: ({ filterBy, fromDate, toDate }) => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_total_sales?filterBy='+ filterBy + '&fromDate=' + fromDate + '&toDate=' + toDate)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getTotalCountDashboard: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/dashboard/get_all_total_counts')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    addHomePageCategory: ({data}) => {   

        return new Promise((resolve, reject) => {
            Axios.post('/admin/homepage_category/create_homepage_category', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    listHomeCategory: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/homepage_category/get_all_homepage_categories')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    deleteHomeCategory: ({data}) => {   
        return new Promise((resolve, reject) => {
            Axios.delete(`/admin/homepage_category/delete_homepage_category?data=${JSON.stringify(data)}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    listHomeCategory: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/homepage_category/get_all_homepage_categories')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    listHomeBrand: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/homepage_brand/get_all_homepage_brands')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },    


    addHomePageBrand: ({data}) => {   

        return new Promise((resolve, reject) => {
            Axios.post('/admin/homepage_brand/create_homepage_brand', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    deleteHomeBrand: ({data}) => {   
        return new Promise((resolve, reject) => {
            Axios.delete(`/admin/homepage_brand/delete_homepage_brand?data=${JSON.stringify(data)}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    listHomeSeason: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/seasons/get_all_seasons')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getSeason: ({id}) => {   

        return new Promise((resolve, reject) => {
            Axios.get('/admin/seasons/get_season/'+id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    createSeason: ({data}) => {   

        return new Promise((resolve, reject) => {
            Axios.post('/admin/seasons/create_season', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    updateSeason: ({data, id}) => {   

        return new Promise((resolve, reject) => {
            Axios.put('/admin/seasons/update_season/'+id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    deleteSeason: ({data, id}) => {   

        return new Promise((resolve, reject) => {
            Axios.delete(`/admin/seasons/delete_season?data=${JSON.stringify(data)}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    listHomeAds: () => {   
        return new Promise((resolve, reject) => {
            Axios.get('/admin/ads/get_all_ads')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getAds: ({id}) => {   

        return new Promise((resolve, reject) => {
            Axios.get('/admin/ads/get_ads/'+id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    createAds: ({data}) => {   

        return new Promise((resolve, reject) => {
            Axios.post('/admin/ads/create_ads', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    updateAds: ({data, id}) => {   

        return new Promise((resolve, reject) => {
            Axios.put('/admin/ads/update_ads/'+id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    deleteAds: ({data, id}) => {   

        return new Promise((resolve, reject) => {
            Axios.delete(`/admin/ads/delete_ads?data=${JSON.stringify(data)}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    
    
    
    

}