<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-3 bg-light">
                <div class="card-body">
                    <h5 class="card-title">
                        <!--                        Coach Details - {{ localCoachData.id }}-->
                    </h5>
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
import getPost from '@/utility/getPost';
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
            // this.localCoachData = this.coachData(this.coachId);
            return this.coachData(this.coachId);
        }
    },
    created() {},
    /*mounted() {
        this.$nextTick(function() {
            this.getCoachData();
        });
    },*/
    watch: {
        // If the coachId changed, getting new coach data
        coachId() {
            this.getCoachData();
        }
    },
    beforeRouteEnter(to, from, next) {
        getPost(to.params.coachId, (err, post) => {
            next(vm => vm.localCoachData(err, post));
        });
    },
    // eslint-disable-next-line no-unused-vars
    async beforeRouteUpdate(to, from) {
        this.localCoachData = null;
        try {
            this.localCoachData = await getPost(to.params.coachId);
        } catch (error) {
            this.error = error.toString();
        }
    }
};
</script>

<style scoped></style>
