import axios from 'axios';

const baseDomain = 'http://103.153.72.153:5000';
const baseUrl = `${baseDomain}`;

const Repository = axios.create({
    baseURL: baseUrl
});

export default Repository;
