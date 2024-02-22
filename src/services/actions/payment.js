
import Axios from '../axios/Axios.js';
export const payment = {

    //Create inventory
    getStripeUrl: (data) => {

        return  new Promise((resolve, reject) => {
            Axios.post('/payment/pay_request', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    
}