
import Axios from '../axios/Axios.js';
export const menus = {

    //Get all menus
    getAllMenus: () => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/menus/get_all_menu')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Get single menu
    getSingleMenu: (id) => {
        return new Promise((resolve, reject) => {
            Axios.get('/admin/menus/get_menu/' + id)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create menu
    createMenu: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/admin/menus/create_menu', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update menu
    updateMenu: ({ data, id }) => {
        return new Promise((resolve, reject) => {
            Axios.put('/admin/menus/update_menu/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Create Menu seo
    createMenuSeo: ({ data }) => {
        return new Promise((resolve, reject) => {
            Axios.post('/admin/menus/create-seo', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Update menu seo
    updateMenuSeo: ({ data, id }) => {
        return new Promise((resolve, reject) => {
            Axios.put('/admin/menus/update-seo/' + id, data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //Upload menu image
    uploadMenuImage: (data, id) => {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            Axios.post('/admin/menus/upload_menu-images/' + id, data, config)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}