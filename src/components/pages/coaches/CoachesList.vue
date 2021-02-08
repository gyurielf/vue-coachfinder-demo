<template>
    <router-view> </router-view>
    <section>
        <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
        <div class="card">
            <div class="card-body">
                <div class="mt-1 mb-4">
                    <button
                        class="btn btn-primary float-right"
                        type="button"
                        @click="loadCoaches"
                    >
                        Submit
                        <span
                            v-if="isLoading"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                    </button>
                    <button class="btn btn-outline-primary">
                        Register as Coach
                    </button>
                </div>
                <content-loader
                    :width="400"
                    :height="150"
                    :speed="2"
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                    v-if="isLoading"
                >
                    <rect x="9" y="91" rx="5" ry="5" width="250" height="10" />
                    <rect x="8" y="48" rx="5" ry="5" width="150" height="10" />
                    <rect
                        x="175"
                        y="48"
                        rx="5"
                        ry="5"
                        width="100"
                        height="10"
                    />
                    <rect x="8" y="69" rx="5" ry="5" width="220" height="10" />
                    <rect x="8" y="1" rx="5" ry="5" width="139" height="32" />
                    <rect x="166" y="10" rx="5" ry="5" width="72" height="21" />
                </content-loader>
                <div v-else-if="hasCoaches">
                    <coach-items
                        v-for="coach in filteredCoaches"
                        :key="coach"
                        :id="coach.id"
                        :firstName="coach.firstName"
                        :lastName="coach.lastName"
                        :desc="coach.desc"
                        :type="coach.type"
                        :rate="coach.rate"
                    ></coach-items>
                </div>
                <h3 v-else>No coaches found.</h3>
            </div>
        </div>
    </section>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';
import CoachItems from '@/components/coaches/CoachItems';
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex';
import CoachFilter from '@/components/coaches/CoachFilter';
export default {
    name: 'CoachesList',
    components: { CoachFilter, CoachItems, ContentLoader },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                graphics: true
            },
            isLoading: false
        };
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coachesModule/coachList'];
            return coaches.filter(coach => {
                if (
                    this.activeFilters.frontend && // if the activeFilters.frontend is true
                    coach.type.includes('frontend') // if the coach.type array inculdes the frontend word
                ) {
                    return true;
                } else if (
                    this.activeFilters.backend &&
                    coach.type.includes('backend')
                ) {
                    return true;
                } else if (
                    this.activeFilters.graphics &&
                    coach.type.includes('graphics')
                ) {
                    return true;
                }
                console.log(coaches);
                return false;
            });
        },
        hasCoaches() {
            return this.$store.getters['coachesModule/hasCoaches'];
        }
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
            console.log(updatedFilters);
        },
        // refreshCoachesList() {
        //     this.filteredCoaches;
        // },
        ...mapActions('coachesModule', {
            getCoaches: 'loadCoaches'
        }),
        // IMPORTANT Actions in components give us a promise, which we can use to interact some actions.
        // For example here, we set the isLoading to true, and after that the await (resolving loadCoaches) if its done, we set isLoading to false.
        async loadCoaches() {
            this.isLoading = true;
            await this.getCoaches();
            this.isLoading = false;
        }
    },
    created() {
        // setTimeout(() => {
        //     console.log(this.filteredCoaches);
        // }, 2000);
        this.loadCoaches();
    }
};
</script>

<style scoped></style>
