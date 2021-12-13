import { log } from '@root/utils/console';
import axios from 'axios';
import { baseURL } from '@root/service/apiEndPoints';
import { getData } from '@root/storage';
import { storageConstants } from '../storage/storage-constants';

const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    timeoutErrorMessage: 'Timeout error',
});

instance.defaults.headers.common.Authorization = `Bearer ${getData(
    storageConstants.token,
)}`;

instance.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        console.log(error);
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        // Edit response config

        return response;
    },
    (error) => {
        log(error, 'error axios');
        return Promise.reject(error.response);
    },
);
export default instance;
