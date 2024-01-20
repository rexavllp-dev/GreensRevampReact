
import Axios from '../axios/Axios.js';
export const categories = {

    //Get category tree
    getCategoryTree: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/brands/get-brands')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    
}