
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

     // List banner
    listBanner: () => {
        return new Promise((resolve, reject) => {
            Axios.get('admin/banner/get_all_banners/')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    
}