
import Axios from '../axios/Axios.js';
export const products = {

    //Get all Products
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-products')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create new product
    createProduct: () => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-product')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update product
    updateProduct: () => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-product')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },



}