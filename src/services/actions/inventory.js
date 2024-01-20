
import Axios from '../axios/Axios.js';
export const inventory = {

    //Create inventory
    createInventory: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-inventory', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Update inventory
    updateInventory: (data, productId) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-inventory/'+ productId, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    
}