import Repository from './repository'

const resource = "/brand";

export default {
    get() {
        return Repository.get(`${resource}/all`);
    }
}