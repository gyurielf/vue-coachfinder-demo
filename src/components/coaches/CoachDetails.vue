<template>
    <router-view></router-view>
    <div class="row">
        <div v-if="selectedCoach" class="col-12">
            <div class="card mb-3 bg-light shadow">
                <div class="card-body">
                    <h3 class="card-title">
                        {{ fullName }}
                    </h3>
                    <p class="card-danger">
                        {{ hourlyRate }}
                    </p>
                    <badge-items
                        v-for="type in selectedCoach.type"
                        :key="type"
                        :badgeType="type"
                    ></badge-items>
                    <p class="card-text">{{ description }}</p>
                    <!--                    <router-link
                        class="btn btn-primary"
                        :to="{ name: 'contact-coach', params: coachId }"
                    >
                        Contact
                    </router-link>-->
                    <!-- It works -->
                    <router-link
                        class="btn btn-primary"
                        :to="`/coaches/${coachId}/contact`"
                    >
                        Contact
                    </router-link>
                    <button class="btn btn-light" @click="getCoachData">
                        test
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';
// import BadgeItems from '@/components/coaches/BadgeItems';

const BadgeItems = defineAsyncComponent(() =>
    import('@/components/coaches/BadgeItems')
);

export default {
    name: 'CoachDetails',
    components: { BadgeItems },
    props: ['coachId'],
    data() {
        return {
            isLoading: true,
            selectedCoach: null
        };
    },
    computed: {
        ...mapGetters('coachesModule', {
            selectedCoachData: 'selectedCoachData'
        }),
        fullName() {
            return (
                this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName
            );
        },
        hourlyRate() {
            return `$${this.selectedCoach.rate}/hour`;
        },
        description() {
            return this.selectedCoach.desc;
        }
    },
    methods: {
        getCoachData() {
            this.selectedCoach = this.selectedCoachData(this.coachId);
        }
    },
    created() {
        this.getCoachData();
    },
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
    }
    // beforeRouteEnter(to, from, next) {
    //     getPost(to.params.coachId, (err, post) => {
    //         next(vm => vm.localCoachData(err, post));
    //     });
    // },
    // // eslint-disable-next-line no-unused-vars
    // async beforeRouteUpdate(to, from) {
    //     this.localCoachData = null;
    //     try {
    //         this.localCoachData = await getPost(to.params.coachId);
    //     } catch (error) {
    //         this.error = error.toString();
    //     }
    // }
};
</script>

<style scoped></style>
