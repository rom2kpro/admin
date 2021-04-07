import axios from 'axios';

const baseDomain = 'http://127.0.0.1:5000';
const baseUrl = `${baseDomain}`;

const Repository = axios.create({
    baseURL: baseUrl
});

export default Repository;