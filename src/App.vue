<template>
    <the-header></the-header>
    <div class="container">
        <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
                <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TheHeader from '@/components/nav/TheHeader';
import { mapActions } from 'vuex';
export default {
    name: 'App',
    components: { TheHeader },
    computed: {
        didAutoLogout() {
            return this.$store.getters['authModule/didAutoLogout'];
        }
    },
    methods: {
        ...mapActions('authModule', {
            autoLogin: 'tryLogin'
        })
    },
    created() {
        this.autoLogin();
    },
    watch: {
        didAutoLogout(curValue, oldValue) {
            if (curValue && curValue !== oldValue) {
                this.$router.replace('/');
            }
        }
    }
};
</script>

<style scoped>
.route-enter-active {
    -webkit-animation: fade-in 0.7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-in 0.7s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.route-leave-active {
    -webkit-animation: fade-out 0.3s ease-out both;
    animation: fade-out 0.3s ease-out both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-8 21:42:50
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-out
 * ----------------------------------------
 */
@-webkit-keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
@keyframes fade-out {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

/* ----------------------------------------------
 * Generated by Animista on 2021-2-8 21:41:41
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in
 * ----------------------------------------
 */
@-webkit-keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
