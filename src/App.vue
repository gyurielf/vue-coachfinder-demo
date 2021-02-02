<template>
    <the-header></the-header>
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TheHeader from '@/components/nav/TheHeader';
export default {
    name: 'App',
    components: { TheHeader }
};
</script>

<style scoped></style>
