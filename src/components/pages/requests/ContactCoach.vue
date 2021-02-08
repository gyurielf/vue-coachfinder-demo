<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-5">
                <div class="card-header bg-secondary text-center h4 text-white">
                    Contact - {{ localCoachData.firstName }} - {{ coachId }}
                </div>
                <div class="card-body">
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="requestEmail">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="requestEmail"
                                placeholder="name@example.com"
                                v-model="requestFormData.email.val"
                            />
                        </div>
                        <div class="form-group">
                            <label for="requestSubject">Subject</label>
                            <input
                                type="text"
                                class="form-control"
                                id="requestSubject"
                                placeholder="subject"
                                v-model="requestFormData.subject.val"
                            />
                        </div>
                        <div class="form-group">
                            <label for="requestMsg">
                                Text area
                            </label>
                            <textarea
                                class="form-control"
                                id="requestMsg"
                                rows="3"
                                v-model="requestFormData.message.val"
                            ></textarea>
                        </div>
                    </form>
                    <!-- Submit coach form -->
                    <div class="row">
                        <div class="col-4">
                            <button
                                class="btn btn-primary btn-block"
                                type="button"
                                @click="submitRequest"
                            >
                                Submit
                                <span
                                    v-if="isLoading"
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ContactCoach',
    props: ['coachId'],
    data() {
        return {
            requestFormData: {
                email: {
                    val: null,
                    isValid: true
                },
                subject: {
                    val: null,
                    isValid: true
                },
                message: {
                    val: null,
                    isValid: true
                }
            },
            formIsValid: false,
            localCoachData: null,
            isLoading: false
        };
    },
    computed: {
        ...mapGetters('coachesModule', {
            coachData: 'selectedCoachData'
        })
    },
    methods: {
        ...mapActions('requestsModule', {
            sendRequest: 'addRequest'
        }),
        getCoachData() {
            this.localCoachData = this.coachData(this.coachId);
        },
        validateForm() {
            // We set the formIsValid to true by default.
            this.formIsValid = true;
            // If the form is invalid, we set the formIsValid to false.
            if (this.requestFormData.email.val === null) {
                this.requestFormData.email.isValid = false;
                this.formIsValid = false;
            }
            if (this.requestFormData.subject.val === null) {
                this.requestFormData.subject = false;
                this.formIsValid = false;
            }
            if (this.requestFormData.message.val === null) {
                this.requestFormData.message.isValid = false;
                this.formIsValid = false;
            }
        },
        submitRequest() {
            this.validateForm();
            if (!this.formIsValid) {
                return console.log('NEM JO VALAMI!');
            }
            this.isLoading = true;
            const request = {
                email: this.requestFormData.email.val,
                subject: this.requestFormData.subject.val,
                message: this.requestFormData.message.val,
                coachId: this.coachId
            };
            this.sendRequest(request);
            setTimeout(() => {
                this.isLoading = false;
                // This is what I'm use.
                // this.$router.push({ name: 'coaches' });
                // This is the instructor way of solving the problem.
                this.$router.replace({ name: 'coaches' });
            }, 500);
        }
    },
    created() {
        this.getCoachData();
    },
    watch: {
        coachId() {
            this.getCoachData();
        }
    }
};
</script>

<style scoped></style>
