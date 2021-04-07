import ProductsRepository from './productsRepository'
import BrandsRepository from './brandsRepository'
import AdminRepository from './adminRepository'

const repositories = {
    products: ProductsRepository,
    brands: BrandsRepository,
    admin: AdminRepository
};

const RepositoryFactory = {
    get: name => repositories[name]
};

export default RepositoryFactory;