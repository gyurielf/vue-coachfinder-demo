<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-3 shadow-sm">
                <div class="card-header d-inline">
                    <div>
                        From:
                        <a :href="'mailto:' + requestEmail">
                            {{ requestEmail }}
                        </a>
                        <span> - To: {{ 'hi' }}</span>
                        <span class="float-right font-italic text-muted">
                            #{{ requestId }}
                        </span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-title  font-weight-bold">
                        {{ requestSubject }}
                    </div>
                    <div class="card-text">
                        {{ requestMsg }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'RequestItem',
    props: [
        'requestId',
        'coach',
        'requestMsg',
        'requestEmail',
        'requestSubject'
    ],
    data() {
        return {
            selectedCoach: null
        };
    },
    computed: {
        ...mapGetters('coachesModule', {
            selectedCoachData: 'selectedCoachData'
        }),
        coachName() {
            return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
        }
    },
    methods: {
        // Should review and set the
        async getCoachData() {
            this.selectedCoach = await this.selectedCoachData(this.coach);
        }
    },
    created() {
        this.getCoachData();
    }
};
</script>

<style scoped></style>
