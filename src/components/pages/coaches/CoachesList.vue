<template>
    <div>
        <router-view> </router-view>
        <section>
            <coach-filter @change-filter="setFilters"></coach-filter>
        </section>
        <section>
            <div class="card">
                <div class="card-body">
                    <div class="row mt-1 mb-4">
                        <div class="col">
                            <button
                                class="btn btn-primary float-right"
                                type="button"
                                @click="loadCoaches(true)"
                            >
                                Refresh
                                <span
                                    v-if="isLoading"
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            </button>
                            <router-link
                                v-if="!isLoading && isLoggedIn"
                                class="btn btn-outline-primary"
                                :to="{ name: 'register' }"
                            >
                                Register as Coach
                            </router-link>
                            <router-link
                                v-else
                                class="btn btn-outline-primary"
                                :to="{
                                    name: 'sign-in',
                                    query: { redirect: 'register' }
                                }"
                            >
                                Log in to Register as Coach
                            </router-link>
                        </div>
                    </div>
                    <transition name="fade" mode="out-in">
                        <content-loader
                            :width="400"
                            :height="150"
                            :speed="2"
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                            v-if="isLoading"
                        >
                            <rect
                                x="9"
                                y="91"
                                rx="5"
                                ry="5"
                                width="250"
                                height="10"
                            />
                            <rect
                                x="8"
                                y="48"
                                rx="5"
                                ry="5"
                                width="150"
                                height="10"
                            />
                            <rect
                                x="175"
                                y="48"
                                rx="5"
                                ry="5"
                                width="100"
                                height="10"
                            />
                            <rect
                                x="8"
                                y="69"
                                rx="5"
                                ry="5"
                                width="220"
                                height="10"
                            />
                            <rect
                                x="8"
                                y="1"
                                rx="5"
                                ry="5"
                                width="139"
                                height="32"
                            />
                            <rect
                                x="166"
                                y="10"
                                rx="5"
                                ry="5"
                                width="72"
                                height="21"
                            />
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
                    </transition>
                </div>
            </div>
            <!-- Modal -->
            <!--        <button class="btn btn-primary" @click="testMeth">btn</button>-->
            <global-modal :modal-toggled="toggle">
                {{ error }}
            </global-modal>
        </section>
    </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';
import CoachItems from '@/components/coaches/CoachItems';
// eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex';
import CoachFilter from '@/components/coaches/CoachFilter';
import GlobalModal from '@/components/ui/GlobalModal';
export default {
    name: 'CoachesList',
    components: { GlobalModal, CoachFilter, CoachItems, ContentLoader },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                graphics: true
            },
            isLoading: false,
            error: null,
            toggle: false
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
        },
        ...mapGetters('authModule', {
            isLoggedIn: 'isAuthenticated'
        })
    },
    methods: {
        testMeth() {
            this.toggle = !this.toggle;
        },
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
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try {
                await this.getCoaches({ forceRefresh: refresh });
            } catch (e) {
                this.error = e.message || 'Something went wrong!';
            }
            this.isLoading = false;
        }
    },
    created() {
        // setTimeout(() => {
        //     console.log(this.filteredCoaches);
        // }, 2000);
        this.loadCoaches();
    },
    watch: {
        error() {
            if (this.error != null) {
                this.testMeth();
            }
        }
    }
};
</script>

<style scoped>
.fade-enter-active {
    -webkit-animation: fade-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-in 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

.fade-leave-active {
    -webkit-animation: fade-out 0.4s ease-out both;
    animation: fade-out 0.4s ease-out both;
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
