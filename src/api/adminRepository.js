import Repository from './repository'

const resource = "/admin";

export default {
    login(payload) {
        return Repository.post(`${resource}/login`, payload);
    },
    getAllUser(path, token) {
        if(path === "customer" || path === "admin"){
            return Repository.get(`${resource}/account/${path}/all`,{
                headers: {
                    "x-access-token": token
                }
            })
        } else {
            return false
        }
    },
    getAllRole(token) {
        return Repository.get(`${resource}/role/all`, {
            headers: {
                "x-access-token": token
            }
        })
    }
}