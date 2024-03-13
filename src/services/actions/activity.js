
import Axios from '../axios/Axios.js';
export const activity = {

    // Get Activity log
    getActivityLog: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/generate_activity')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}