
import Axios from '../axios/Axios.js';
export const countries = {

    //User register
    getAllCountries: (data) => {
        return new Promise((resolve, reject) => {
            Axios.get('/country/getall', data)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },


}