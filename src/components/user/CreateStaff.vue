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
                                        <label for="name">Tên nhân viên</label>
                                        <input id="name" type="text" class="form-control" v-model="staff.name">
                                    </div>
                                    <!-- End of Form -->
                                    <div class="mb-4">
                                        <label class="my-1 mr-2" for="brand">Chức vụ</label>
                                        <select class="form-select" id="brand" aria-label="Default select example" v-model="staff.role">
                                            <option value="0" selected disabled>Open this select menu</option>
                                            <option v-for="role in roles" :key="role.role_id" :value="role.role_id">{{role.role_name}}</option>
                                        </select>
                                    </div>

                                    <div class="mb-4">
                                        <label class="my-1 mr-2" for="country">Địa chỉ</label>
                                        <select class="form-select" id="country" aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>

                                    <div class="mb-4">
                                        <label for="defaultprice">Số điện thoại</label>
                                        <input id="defaultprice" type="text" class="form-control" v-model="staff.phone">
                                    </div>

                                    <div class="mb-4">
                                        <label for="saleprice">Email</label>
                                        <input id="saleprice" type="texf" class="form-control" v-model="staff.email">
                                    </div>

                                </div>
                                <div class="col-lg-4 col-sm-6">

                                    <div class="mb-4">
                                        <label for="warranty">Ngày bắt đầu hợp đồng</label>
                                        <input id="warranty" type="date" class="form-control" v-model="staff.start">
                                    </div>

                                    <div class="mb-4">
                                        <label for="warranty">Ngày hết hạn hợp đồng</label>
                                        <input id="warranty" type="date" class="form-control" v-model="staff.end">
                                    </div>

                                    <!-- Form -->
                                    <!-- End of Form -->
                                </div>
                                <div class="col-lg-4 col-sm-6">
                                    <!-- Form -->
                                    <label for="">Avatar</label>
                                    <div class="form-file mb-3">
                                        <input type="file" class="form-file-input" id="customFile" @change="previewImage">
                                        <label class="form-file-label" for="customFile">
                                            <span class="form-file-text">Choose file...</span>
                                            <span class="form-file-button">Browse</span>
                                        </label>
                                    </div>
                                    <div id="image-preview" v-if="staff.img">
                                        <img class="preview" :src="staff.img">
                                    </div>
                                    <!-- End of Form -->
                                </div>
                            </div>
                        </div>
                        <div class="col-3 ml-auto mr-4">
                            <button class="btn btn-primary col-12 mb-4" type="button" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RepositoryFactory from '../../api/repositoryFactory'
const AdminRepository = RepositoryFactory.get('admin')

export default {
    data() {
        return{
            isLoading: false,
            roles: [],
            staff:{
                img:"",
                name: '',
                role: 0,
                start: null,
                end: null,
                email: "",
                phone: "",
            }
        }
    },
    mounted() {
        this.fetch()
    },
    beforeRouteLeave (to, from, next) {
        // ...
        to
        from
        this.$store.state.staff = this.staff;
        console.log(this.staff)
        next()
    },
    methods: {
        previewImage: function(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files.length > 0) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.staff.img = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },
        // deleteImage(e){
        //     var imagePreview = [...document.getElementById("image-preview").children];
        //     var index = imagePreview.indexOf(e.target.parentElement.parentElement);
        //     this.imageData.splice(index, 1);
        //     console.log(this.imageData)

        // },
        async fetch() {
            const { data } = await AdminRepository.getAllRole(this.$store.state.admin.access_token);
            this.roles = data.roles;
            this.isLoading = true;
            if(this.$store.state.staff){
                this.staff = this.$store.state.staff;
            }
        },
        // createProduct() {
        //     const payload = {
        //         product_name: this.name,
        //         brand_id: this.brand,
        //         product_image: this.imageData,
        //         product_description: this.description,
        //         product_default_price: this.default_price,
        //         product_sale_price: this.sale_price,
        //         product_warranty: this.warranty,
        //         product_last_update_who: "trung"
        //     }
        //     ProductsRepository.createProduct(payload).then(response => {
        //         console.log(response.data)
        //     })
        // }
    },
}
</script>

<style scoped>
    .preview{
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