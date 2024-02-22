
import Axios from '../axios/Axios.js';
export const cart = {

    // Get all products in cart
    getCartProducts: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/cart/get-cart')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Add product to cart
    addProductToCart: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/cart/add-to-cart', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Delete product from cart
    deleteProductFromCart: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/cart/delete-cart-item/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Update product quantity
    updateProductQuantity: (data) => {
        return new Promise((resolve, reject) => {
            Axios.put('/cart/update-cart-quantity', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Update cart flags
    updateCartFlags: (data) => {
        return new Promise((resolve, reject) => {
            Axios.put('/cart/update-flags', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}