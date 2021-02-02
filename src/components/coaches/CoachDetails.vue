<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-3 bg-light">
                <div class="card-body">
                    <h5 class="card-title">Coach Details</h5>
                    <div v-if="localCoachData">
                        <h3>
                            {{ localCoachData.firstName }}
                            {{ localCoachData.lastName }}
                        </h3>
                        <badge-items
                            v-for="type in localCoachData.type"
                            :key="type"
                            :badgeType="type"
                        ></badge-items>
                    </div>
                    <p class="card-text">{{ localCoachData.desc }}</p>
                    <p class="card-danger"></p>

                    <router-link
                        class="btn btn-primary"
                        :to="{ name: 'contactPage' }"
                        >Contact</router-link
                    >
                    <button class="btn btn-light" @click="getCoachData">
                        test
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BadgeItems from '@/components/coaches/BadgeItems';

export default {
    name: 'CoachDetails',
    components: { BadgeItems },
    props: ['coachId'],
    data() {
        return {
            isLoading: true,
            localCoachData: {}
        };
    },
    computed: {
        ...mapGetters('coachesModule', {
            coachData: 'listSelectedCoachData'
        })
    },
    methods: {
        getCoachData() {
            this.localCoachData = this.coachData(this.coachId);
        }
    },
    created() {
        // DEBUG
        // console.log(this.localCoachData);
        // console.log(this.$store.state);

        // Other try
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         console.log('created');
        //         this.getCoachData();
        //         resolve();
        //     });
        // });
        setTimeout(() => {
            this.getCoachData();
        }, 500);
    },
    watch: {
        // If the coachId changed, getting new coach data
        coachId() {
            this.getCoachData();
        }
    }
};
</script>

<style scoped></style>
