import axios from 'axios'

const API_SERVER = '/api/';

const resources = {
    login(username) {
        axios.post(API_SERVER + 'user', {
            username
        })
            .then(response => {
                if (response.data.status === 200) {
                    return response.data.data
                } else {
                    throw new Error(response.data.message)
                }
            })
    }
}


export default resources