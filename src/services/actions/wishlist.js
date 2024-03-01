
import Axios from '../axios/Axios.js';
export const wishlist = {

    // Get wishlist
    getWishlist: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/wishlist/get-all-wishlist')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Add product to wishlist
    addProductToWishlist: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/wishlist/create-wishlist', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    // Remove wishlist
    removeWishlist: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/wishlist/remove-wishlist/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}