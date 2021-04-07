<template>
    <div class="bg-soft">
        <main>
            <section class="vh-lg-100 d-flex align-items-center">
                <div class="container">
                    <div class="row justify-content-center form-bg-image" data-background-lg="../assets/img/illustrations/signin.svg">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <div class="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div class="text-center text-md-center mb-4 mt-md-0">
                                    <h1 class="mb-0 h3">Sign in to our platform</h1>
                                </div>
                                <form action="#" class="mt-4">
                                    <!-- Form -->
                                    <div class="form-group mb-4">
                                        <label for="email">Your Username</label>
                                        <div class="input-group">
                                            <span class="input-group-text" id="basic-addon1"><span class="fas fa-envelope"></span></span>
                                            <input type="text" class="form-control" placeholder="Username" id="email" v-model="account.admin_name" autofocus required>
                                        </div>  
                                    </div>
                                    <!-- End of Form -->
                                    <div class="form-group">
                                        <!-- Form -->
                                        <div class="form-group mb-4">
                                            <label for="password">Your Password</label>
                                            <div class="input-group">
                                                <span class="input-group-text" id="basic-addon2"><span class="fas fa-unlock-alt"></span></span>
                                                <input type="password" placeholder="Password" class="form-control" id="password"  v-model="account.admin_password" required>
                                            </div>  
                                        </div>
                                        <!-- End of Form -->
                                        <div class="d-flex justify-content-between align-items-center mb-4">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" id="defaultCheck5">
                                                <label class="form-check-label" for="defaultCheck5">
                                                    Remember me
                                                </label>
                                            </div>
                                            <div><a href="#" class="small text-right">Lost password?</a></div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn btn-block btn-primary" @click="Login">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import RepositoryFactory from '../api/repositoryFactory'
const AdminRepository = RepositoryFactory.get('admin')

export default {
    data() {
        return {
            account:{
                admin_name: "",
                admin_password: "",
            }
        }
    },
    methods: {
        Login() {
            AdminRepository.login(this.account).then(response => {
                const { data } = response;
                if(data.user.length == 0){
                    console.log(" not ok")
                } else {
                    this.$store.state.admin.login = true;
                    this.$store.state.admin.access_token = data.access_token;
                    this.$router.push('/dashboard');
                }
            })
        }
    },
}
</script>