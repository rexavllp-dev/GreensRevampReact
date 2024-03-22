
import Axios from '../axios/Axios.js';
export const reviews = {

    // Get all reviews by product id
    getAllReviewsByProductId: ({ id }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/review/get-reviews/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    createReview: ({ data }) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/review/create-review', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getAllReviewsByUser: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/review/get-user-reviews?sortBy=useful')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}