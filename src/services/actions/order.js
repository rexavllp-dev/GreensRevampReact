
import Axios from '../axios/Axios.js';
export const order = {

    //Create order
    createOrder: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/orders/create_order', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    
}