<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header bg-secondary text-center h4 text-white">
                    Contact - {{ coachId }}
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlInput1"
                                >Email address</label
                            >
                            <input
                                type="email"
                                class="form-control"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlInput2"
                                >Subject</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="exampleFormControlInput2"
                                placeholder="subject"
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">
                                Text area
                            </label>
                            <textarea
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                    </form>
                    <button class="btn btn-primary px-4" @click="getCoachData">
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Contact',
    props: ['coachId'],
    data() {
        return {
            localCoachData: null,
            isLoading: false
        };
    },
    computed: {
        ...mapGetters('coachesModule', {
            coachData: 'listSelectedCoachData'
        })
    },
    methods: {
        ...mapActions('coachesModule', {
            letsGetCoaches: 'getCoaches'
        }),
        getCoachData() {
            this.localCoachData = this.coachData(this.coachId);
            this.isLoading = true;
        }
        // dataLoadCheck() {
        //     if (this.localCoachData) {
        //         this.isLoading = false;
        //     } else {
        //         this.getCoachData();
        //     }
        // }
    },
    created() {
        this.letsGetCoaches();
        this.getCoachData();
        // this.dataLoadCheck();
    }
};
</script>

<style scoped></style>
