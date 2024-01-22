
import Axios from '../axios/Axios.js';
export const brands = {

    //Get all brands
    getAllBrands: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/brands/get-brands')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get single brand
    getSingleBrand: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/brands/get-brand/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create brand
    createBrand: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/brands/create-brand', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update brand
    updateBrand: ({ data, id }) => {
        return new Promise((resolve, reject) => {
            Axios.put('/brands/update-brand/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create Brand seo
    createBrandSeo: ({ data }) => {
        return new Promise((resolve, reject) => {
            Axios.post('/brands/create-seo/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update brand seo
    updateBrandSeo: ({ data, id }) => {
        return new Promise((resolve, reject) => {
            Axios.put('/brands/update-seo/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Upload brand image
    uploadBrandImage: (data, id) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.post('/brands/upload-brand-images/' + id, data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}