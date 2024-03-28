
import Axios from '../axios/Axios.js';
export const payment = {

    //Create stripe url
    getStripeUrl: (data) => {

        return new Promise((resolve, reject) => {
            Axios.post('/payment/pay_request', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Pay complete
    payComplete: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/payment/pay_complete', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Pay failed
    payFailed: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/payment/pay_failed', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get all transactions
    getAllTransactions: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/payment/transactions')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }



}