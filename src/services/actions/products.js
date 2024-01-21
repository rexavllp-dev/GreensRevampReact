
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

    //Get all products by user
    getAllProductsByUser: ({ page, per_page }) => {
        return new Promise((resolve, reject) => {
            let query = `/products/get-products`
            if (page && per_page) {
                query = query + `?page=${page}&per_page=${per_page}`
            }
            Axios.get(query)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Get single Products
    getSingleProduct: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-product/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create new product
    createProduct: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-product', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update product
    updateProduct: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-product/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create price
    createPrice: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-price', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update price
    updatePrice: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-price/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Upload Product image
    uploadProductImage: (data, id) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.post('/products/images/' + id, data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    //Create Product Seo
    createProductSeo: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-seo', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update product seo
    updateProductSeo: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-seo/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //get product seo
    getProductSeo: (id) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/get-seo/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
}