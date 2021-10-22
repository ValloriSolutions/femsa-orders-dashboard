import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3020/',
    headers: {
        'Content-type': 'application/json',
    },
});
