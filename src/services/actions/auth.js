
import Axios from '../axios/Axios.js';
export const auth = {

    //User register
    userRegister: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/auth/usr_register', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

    //User register
    companyRegister: (data) => {
        return new Promise((resolve, reject) => {
            Axios.post('/auth/company_register', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },

}