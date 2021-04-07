<template>
    <div class="container-fluid bg-soft">
        <div class="row">
            <div class="col-12">
                <Sidebar/>
                <main class="content">
                    <Header/>
                        <router-view></router-view>
                    <Footer/>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
// import Login from './components/login'
import Header from './shared/header'
import Footer from './shared/footer'
import Sidebar from './shared/sidebar'

export default {
    name: 'App',
    components: {
        // Login
        Header,
        Footer,
        Sidebar,
    }
}
</script>