<template>
    <div>
        
        <div class="row" v-if="isLoading">
            <div class="col-12 mb-4">
                <div class="card border-light shadow-sm components-section">
                    <form action="">
                        <div class="card-body">     
                            <div class="row mb-4">
                                <div class="col-lg-4 col-sm-6">
                                    <!-- Form -->
                                    <div class="mb-4">
                                        <label for="name">Tên sản phẩm</label>
                                        <input id="name" type="text" class="form-control" v-model="name">
                                    </div>
                                    <!-- End of Form -->
                                    <div class="mb-4">
                                        <label class="my-1 mr-2" for="brand">Thương hiệu</label>
                                        <select class="form-select" id="brand" aria-label="Default select example" v-model="brand">
                                            <option value="0" selected disabled>Open this select menu</option>
                                            <option v-for="brand in brands" :key="brand.brand_id" :value="brand.brand_id">{{brand.brand_name}}</option>
                                        </select>
                                    </div>

                                    <div class="mb-4">
                                        <label class="my-1 mr-2" for="country">Loại</label>
                                        <select class="form-select" id="country" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>

                                    <div class="mb-4">
                                        <label for="defaultprice">Giá cũ</label>
                                        <input id="defaultprice" type="number" class="form-control" v-model="default_price">
                                    </div>

                                    <div class="mb-4">
                                        <label for="saleprice">Giá mới</label>
                                        <input id="saleprice" type="number" class="form-control" v-model="sale_price">
                                    </div>

                                    <div class="mb-4">
                                        <label for="warranty">Bảo hành</label>
                                        <input id="warranty" type="number" class="form-control" v-model="warranty">
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <!-- Form -->
                                    <div class="mb-4">
                                        <label for="description">Mô tả</label>
                                        <textarea id="description" class="form-control" placeholder="Enter description..." v-model="description" rows="6"></textarea>
                                    </div>
                                    <!-- End of Form -->
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <!-- Form -->
                                    <label for="">Hình ảnh</label>
                                    <div class="form-file mb-3">
                                        <input type="file" class="form-file-input" id="customFile" @change="previewImage" multiple>
                                        <label class="form-file-label" for="customFile">
                                            <span class="form-file-text">Choose file...</span>
                                            <span class="form-file-button">Browse</span>
                                        </label>
                                    </div>
                                    <div id="image-preview" v-if="imageData.length > 0">
                                        <div class="image-container" v-for="(img, idx) in imageData" :key="idx">
                                            <img class="preview" :src="'data:image/png;base64,' + img">
                                            <div class="middle">
                                                <button class="btn btn-danger" @click="deleteImage" type="button">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End of Form -->
                                </div>
                            </div>
                        </div>
                        <div class="col-3 ml-auto mr-4">
                            <button class="btn btn-primary col-12 mb-4" type="button" @click="createProduct">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RepositoryFactory from '../../api/repositoryFactory'
const BrandsRepository = RepositoryFactory.get('brands')
const ProductsRepository = RepositoryFactory.get('products')

export default {
    data() {
        return{
            imageData: [],
            imageName: [],
            isLoading: false,
            brands: [],
            name: '',
            brand: 0,
            default_price: 0,
            sale_price: 0,
            warranty: 0,
            description: '',
        }
    },
    mounted() {
        this.fetch()
    },
    methods: {
        previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files.length > 0) {
                // create a new FileReader to read this image and convert to base64 format
                for(var i = 0; i < input.files.length; i++){
                    var reader = new FileReader();
                    // Define a callback function to run, when FileReader finishes its job
                    this.imageName.push(input.files[i].name)
                    reader.onload = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imageData.push(e.target.result.slice(e.target.result.indexOf(",") + 1, e.target.result.length));
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsDataURL(input.files[i]);
                }
            }
        },
        deleteImage(e){
            var imagePreview = [...document.getElementById("image-preview").children];
            var index = imagePreview.indexOf(e.target.parentElement.parentElement);
            this.imageData.splice(index, 1);
            console.log(this.imageData)
            ProductsRepository

        },
        async fetch() {
            const { data } = await BrandsRepository.get();
            this.brands = data.brands;
            this.isLoading = true;
            console.log(this.brands)
        },
        createProduct() {
            var img_base64 = this.imageData[0].slice(this.imageData[0].indexOf(",") + 1, this.imageData[0].length)
            // console.log(ok)
            var product_images = []
            for(var i = 1; i < this.imageData.length; i++){
                product_images.push({
                    image_name: this.imageName[i],
                    image_base64: this.imageData[i]
                })
            }
            
            console.log(product_images)
            
            const payload = {
                product_name: this.name,
                product_thumbnail: {
                    image_name: this.imageName[0],
                    image_base64: img_base64    
                },
                product_images: product_images,
                brand_id: this.brand,
                product_description: this.description,
                product_default_price: this.default_price,
                product_sale_price: this.sale_price,
                time_warranty: this.warranty

            }
            // console.log(payload)
            ProductsRepository.create(payload, this.$store.state.admin.access_token).then(response => {
                console.log(response.data)
            })
        }
    },
}
</script>

<style scoped>
    #image-preview{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .image-container{
        position: relative;
        width: 100px;
    }
    .preview{
        width: 100px;
        height: 100px;
        padding: 10px;
        transition: .5s ease;
        backface-visibility: hidden;
    }
    .middle{
        width: 70px;
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
    }
    .image-container:hover .preview{
        opacity: 0.3;
    }
    .image-container:hover .middle{
        opacity: 1;
    }
</style>