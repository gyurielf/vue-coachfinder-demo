<template>
    <div class="row">
        <div class="col-12">
            <div class="card mt-2">
                <div class="card-header"><h4>Coach Registration</h4></div>
                <div class="card-body">
                    <form @submit.prevent>
                        <!-- Name of the coach input -->
                        <div class="form-group">
                            <label for="coachFirstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="coachFirstName"
                                placeholder="John"
                                v-model.trim="coach.firstName.val"
                                :class="validationClass('firstName')"
                                @blur="clearValidity('firstName')"
                            />
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">
                                Please provide a valid first name.
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="coachLastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                id="coachLastName"
                                placeholder="Doe"
                                v-model.trim="coach.lastName.val"
                                :class="validationClass('lastName')"
                                @blur="clearValidity('lastName')"
                            />
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">
                                Please provide a valid last name.
                            </div>
                        </div>
                        <!-- Type of coach skills input -->
                        <div class="form-group">
                            <label for="skillCheckBoxes">
                                Skill types
                            </label>
                            <div id="skillCheckBoxes">
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="frontendCheckBox"
                                        value="frontend"
                                        v-model="coach.type.val"
                                        :class="validationClass('type')"
                                        @blur="clearValidity('type')"
                                    />
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback"></div>
                                    <label
                                        class="form-check-label"
                                        for="frontendCheckBox"
                                        >Frontend</label
                                    >
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="backendCheckBox"
                                        value="backend"
                                        v-model="coach.type.val"
                                        :class="validationClass('type')"
                                        @blur="clearValidity('type')"
                                    />
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback"></div>
                                    <label
                                        class="form-check-label"
                                        for="backendCheckBox"
                                        >Backend</label
                                    >
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="graphicsCheckBox"
                                        value="graphics"
                                        v-model="coach.type.val"
                                        :class="validationClass('type')"
                                        @blur="clearValidity('type')"
                                    />
                                    <div class="valid-feedback"></div>
                                    <div class="invalid-feedback"></div>
                                    <label
                                        class="form-check-label"
                                        for="graphicsCheckBox"
                                        >Graphics</label
                                    >
                                </div>
                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        id="managementCheckBox"
                                        value="management"
                                        disabled
                                    />
                                    <label
                                        class="form-check-label"
                                        for="managementCheckBox"
                                        >Management</label
                                    >
                                </div>
                            </div>
                        </div>
                        <!-- Rate of coach input -->
                        <div class="form-group">
                            <label for="coachRateSelect">
                                Your rate - {{ coachRate }}
                            </label>
                            <input
                                type="range"
                                class="form-control-range"
                                min="0"
                                max="30"
                                step="0.5"
                                id="coachRateSelect"
                                v-model.number="coach.rate.val"
                                :class="validationClass('rate')"
                                @blur="clearValidity('rate')"
                            />
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">
                                Please provide your rate.
                            </div>
                        </div>
                        <!-- Description of coach input -->
                        <div class="form-group">
                            <label for="coachDescription">
                                Describe yourself
                            </label>
                            <textarea
                                class="form-control"
                                id="coachDescription"
                                rows="3"
                                v-model="coach.desc.val"
                                :class="validationClass('desc')"
                                @blur="clearValidity('desc')"
                            ></textarea>
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback">
                                Please provide a valid description.
                            </div>
                        </div>
                    </form>
                    <!-- Submit coach form -->
                    <div class="row">
                        <div class="col-4">
                            <button
                                class="btn btn-primary btn-block"
                                type="button"
                                @click="registratingCoach"
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
import { mapActions } from 'vuex';

export default {
    name: 'CoachRegistration',
    data() {
        return {
            coach: {
                firstName: {
                    val: null,
                    isValid: true
                },
                lastName: {
                    val: null,
                    isValid: true
                },
                type: {
                    val: [],
                    isValid: true
                },
                desc: {
                    val: null,
                    isValid: true
                },
                rate: {
                    val: 0,
                    isValid: true
                }
            },
            isLoading: false,
            formIsValid: true
        };
    },
    computed: {
        coachRate() {
            return '$' + this.coach.rate.val;
        },
        // I dont use, but it's calculate the real time validation class.
        validationClass() {
            return input => {
                if (!this.coach[input].isValid) {
                    return 'is-invalid';
                }
            };
        }
    },
    methods: {
        ...mapActions('coachesModule', {
            registrateCoach: 'registerCoach'
        }),
        clearValidity(input) {
            this.coach[input].isValid = true;
        },
        validateForm() {
            // We set the formIsValid to true by default.
            this.formIsValid = true;
            // If the form is invalid, we set the formIsValid to false.
            if (this.coach.firstName.val === null) {
                this.coach.firstName.isValid = false;
                this.formIsValid = false;
            }
            if (this.coach.lastName.val === null) {
                this.coach.lastName.isValid = false;
                this.formIsValid = false;
            }
            if (this.coach.type.val.length === 0) {
                this.coach.type.isValid = false;
                this.formIsValid = false;
            }
            if (this.coach.desc.val === null) {
                this.coach.desc.isValid = false;
                this.formIsValid = false;
            }
            if (this.coach.rate.val <= 0) {
                this.coach.rate.isValid = false;
                this.formIsValid = false;
            }
        },
        registratingCoach() {
            this.validateForm();

            if (!this.formIsValid) {
                return console.log('szasz, nemjo az adat');
            }

            this.registrateCoach(this.coach);
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
                // This is what I'm use.
                // this.$router.push({ name: 'coaches' });
                // This is the instructor way of solving the problem.
                this.$router.replace({ name: 'coaches' });
            }, 500);

            // My solution for validation
            /*if (
                this.coach.firstName &&
                this.coach.lastName &&
                this.coach.desc &&
                this.coach.type.length !== 0 &&
                this.coach.rate > 0
            ) {
                this.registrateCoach(this.coach);
                this.isLoading = true;
                setTimeout(() => {
                    this.isLoading = false;
                    // This is what I'm use.
                    // this.$router.push({ name: 'coaches' });
                    // This is the instructor way of solving the problem.
                    this.$router.replace({ name: 'coaches' });
                }, 500);
            } else {
                console.log('szasz, nemjo az adat');
            }*/
        }
    }
};
</script>

<style scoped></style>
