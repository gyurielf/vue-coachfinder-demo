<template>
    <header>
        <div
            class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm"
        >
            <div class="container">
                <div class="d-inline-flex mt-2">
                    <h5 class="d-inline-flex m-0 align-middle">Coach Finder</h5>
                </div>
                <nav class="my-2 my-md-0 mr-md-3 float-right">
                    <router-link
                        class="p-2 mx-1 btn btn-light"
                        :to="{ name: 'coaches' }"
                    >
                        Coach List
                    </router-link>
                    <router-link
                        v-if="isLoggedIn"
                        class="p-2 mx-1 btn btn-light"
                        :to="{ name: 'requests' }"
                    >
                        Requests
                    </router-link>
                    <router-link
                        class="mx-1 btn btn-primary"
                        :to="{ name: 'register' }"
                        v-if="!isLoggedIn"
                    >
                        Register
                    </router-link>
                    <router-link
                        class="ml-1 btn btn-outline-primary"
                        :to="{ name: 'sign-in' }"
                        v-if="!isLoggedIn"
                    >
                        Sign-in
                    </router-link>
                    <button
                        v-if="isLoggedIn"
                        class="btn btn-light"
                        @click="loggingOut"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TheHeader',
    computed: {
        ...mapGetters('authModule', {
            isLoggedIn: 'isAuthenticated'
        })
    },
    methods: {
        ...mapActions('authModule', {
            logout: 'userLogout'
        }),
        loggingOut() {
            this.logout();
            this.$router.replace('/');
        }
    }
};
</script>

<style scoped></style>
