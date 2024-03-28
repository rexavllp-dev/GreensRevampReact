
import Axios from '../axios/Axios.js';
export const categories = {

    //Get category tree
    getCategoryTree: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/categories/get-categories-tree')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


     //Get category tree
    getMainTree: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/categories/get-main-tree')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


    

    createCategory: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/categories/create-category', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    updateCategory: ({ data, id}) => {
        return new Promise((resolve, reject) => {
            Axios.put('/categories/update-category/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    deleteCategory: ({ id}) => {
        return new Promise((resolve, reject) => {
            Axios.delete('/categories/delete-category/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    uploadCategoryImage: (data, id) => {

        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.post('/categories/upload-category-images/' + id, data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    deleteCategoryImage: (id, type) => {

        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.post('/categories/delete-category-image/'+id, {type:type})
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    getSubCategoriesBySlug: (slug) => {

        return new Promise((resolve, reject) => {
            Axios.get('/categories/get-sub-categories/'+ slug)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    
    
}