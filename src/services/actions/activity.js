
import Axios from '../axios/Axios.js';
export const activity = {

    // Get Activity log
    getActivityLog: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/wishlist/get-all-wishlist')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}