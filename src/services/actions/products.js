
import Axios from '../axios/Axios.js';
export const products = {

    //Get all Products
    getAllProducts: ({ search_query }) => {
        return new Promise((resolve, reject) => {
            Axios.get(`/products/get-products?search_query=${search_query}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get all products by user
    getAllProductsByUser: ({ page, per_page, search_query, filters, sortBy, minPrice, maxPrice }) => {
        return new Promise((resolve, reject) => {
            let query = `/products/get-products?filters=${filters?.length ? JSON.stringify(filters) : '[]'}&sort=${sortBy}`
            if (page && per_page) {
                query = `/products/get-products?page=${page}&per_page=${per_page}&search_query=${search_query}&filters=${filters?.length ? JSON.stringify(filters) : '[]'}&sort=${sortBy}&min_price=${minPrice}&max_price=${maxPrice}`
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
    //Delete products
    deleteProduct: (data) => {
        return new Promise((resolve, reject) => {
            Axios.delete(`/products/delete-product/?data=${JSON.stringify(data)}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Delete product image
    deleteProductImage: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete(`/products/delete-product-image/` + id)
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



    //Create Option
    createOption: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-option', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Update Option
    updateOption: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-option/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Create Product Option
    createProductOption: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-product-option', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Update option value
    updateOptionValue: (data) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-product-option/', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Get all options by product id
    getAllOptionsByProductId: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-options/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Get option values by option id
    getOptionValues: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-option-values/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteProductOption: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/products/delete-option/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteProductOptionValue: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/products/delete-product-option/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },




    //Create Variants
    createVariant: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-variants', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Create Variant label
    createVariantLabel: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-product-variant', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Update variant label
    updateVariantLabel: (data, id) => {
        return new Promise((resolve, reject) => {
            Axios.put('/products/update-product-variant/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Get all variant by product id
    getAllVariantsByProductId: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-variants-by-product/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    //Get all variant labels by variant id
    getVariantLabelsByVariantId: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-variant-values/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteVariant: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/products/delete-variant/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteVariantLabel: (id) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/products/delete-product-variant/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    createRelatedProducts: ({ data, id }) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/create-related-product/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getAllRelatedProducts: ({ id }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-related-products/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    deleteRelatedProducts: ({ data }) => {
        return new Promise((resolve, reject) => {
            Axios.delete(`/products/delete-related-product/?data=${JSON.stringify(data)}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getProductOptions: ({ id }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/get-options/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    modifyStock: ({ data, id }) => {
        return new Promise((resolve, reject) => {
            Axios.post('/products/modify-stock/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getStockHistoryByProduct: ({ id }) => {
        return new Promise((resolve, reject) => {
            Axios.get('/products/stock-history-by-product/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    createSaveForLater: ({ data }) => {
        return new Promise((resolve, reject) => {
            Axios.post('/saveforlater/create-save-for-later', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getSaveForLater: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/saveforlater/get-all-save-for-later')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }
}