<template>
    <router-view> </router-view>
    <section>
        <coach-items
            v-for="coach in coaches"
            :key="coach"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :desc="coach.desc"
            :type="coach.type"
            :rate="coach.rate"
        ></coach-items>
    </section>
</template>

<script>
import CoachItems from '@/components/coaches/CoachItems';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'CoachesList',
    components: { CoachItems },
    computed: {
        ...mapGetters('coachesModule', {
            coaches: 'coachList'
        })
    },
    methods: {
        ...mapActions('coachesModule', {
            letsGetCoaches: 'getCoaches'
        })
    },
    created() {
        // Fetching coaches array from firebase
        this.letsGetCoaches();
    }
};
</script>

<style scoped></style>
