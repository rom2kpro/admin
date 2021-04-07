import Repository from './repository'

const resource = "admin/product";

export default {
    get(token) {
        return Repository.get(`${resource}/all`, {
            headers: {
                "x-access-token": token
            }
        });
    },
    getProduct(productId) {
        return Repository.get(`${resource}/${productId}`);
    },
    create(payload, token) {
        return Repository.post(`${resource}/create`, payload, {
            headers: {
                "x-access-token": token
            }
        });
    }
}