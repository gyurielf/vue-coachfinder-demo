<template>
    <div class="row">
        <div class="col"></div>
        <div class="col-4">
            <div class="card mb-5">
                <div class="card-header bg-secondary text-center h4 text-white">
                    Sign-in
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitForm">
                        <div
                            class="alert alert-danger alert-dismissible fade show"
                            role="alert"
                            v-if="error"
                        >
                            <strong>Error!</strong> {{ error }}
                            <button
                                type="button"
                                class="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                @click="handleError"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="form-group">
                            <label for="loginEmail">Email address</label>
                            <input
                                type="email"
                                class="form-control"
                                id="loginEmail"
                                placeholder="name@example.com"
                                :class="validationClass('email')"
                                v-model.trim="loginFormData.email.val"
                            />
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback"></div>
                        </div>
                        <div class="form-group">
                            <label for="loginPasswd">Password</label>
                            <input
                                type="password"
                                class="form-control"
                                id="loginPasswd"
                                placeholder="Your password"
                                :class="validationClass('passwd')"
                                v-model="loginFormData.passwd.val"
                                name="password"
                                autocomplete="on"
                            />
                            <div class="valid-feedback"></div>
                            <div class="invalid-feedback"></div>
                        </div>
                        <button
                            class="btn btn-primary btn-block"
                            type="button"
                            @click="submitForm"
                        >
                            {{ switchModeButtonCaption }}
                            <span
                                v-if="isLoading"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        </button>
                        <button
                            class="btn btn-primary btn-block"
                            type="button"
                            @click="switchAuthMode"
                        >
                            {{ switchModeButtonCaption }}
                            <span
                                v-if="isLoading"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        </button>
                    </form>
                    <!-- Submit coach form -->
                    <!--                    <div class="row">
                        <div class="col mt-3">
                            <button
                                class="btn btn-primary btn-block"
                                type="button"
                                @click="submitLogin"
                            >
                                Sign in
                                <span
                                    v-if="isLoading"
                                    class="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            </button>
                        </div>
                    </div>-->
                </div>
            </div>
        </div>
        <div class="col"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'UserAuth',
    data() {
        return {
            loginFormData: {
                email: {
                    val: null,
                    isValid: true
                },
                passwd: {
                    val: null,
                    isValid: true
                }
            },
            isLoading: false,
            formIsValid: true,
            mode: 'signup',
            error: null
        };
    },
    computed: {
        // I dont use, but it's calculate the real time validation class.
        validationClass() {
            return input => {
                if (!this.loginFormData[input].isValid) {
                    return 'is-invalid';
                }
            };
        },
        switchModeButtonCaption() {
            if (this.mode === 'login') {
                return 'Sign In';
            } else {
                return 'Sign Up';
            }
        }
    },
    methods: {
        ...mapActions('authModule', {
            addUser: 'userSignUp',
            loginUser: 'userLogin'
        }),
        validateForm() {
            // We set the formIsValid to true by default.
            this.formIsValid = true;
            // If the form is invalid, we set the formIsValid to false.
            if (
                this.loginFormData.email.val === null ||
                !this.loginFormData.email.val.includes('@') ||
                this.loginFormData.email.val === ''
            ) {
                this.loginFormData.email.isValid = false;
                this.formIsValid = false;
            }
            if (
                this.loginFormData.passwd.val === null ||
                this.loginFormData.passwd.val.length < 6 ||
                this.loginFormData.passwd.val === ''
            ) {
                this.loginFormData.passwd.isValid = false;
                this.formIsValid = false;
            }
        },
        async submitForm() {
            this.validateForm();
            if (!this.formIsValid) {
                return;
            }
            this.isLoading = true;
            try {
                // send http req
                if (this.mode === 'login') {
                    // SIGN IN
                    await this.loginUser({
                        email: this.loginFormData.email.val,
                        password: this.loginFormData.passwd.val
                    });
                    // ...
                } else {
                    // -- SIGNUP --
                    await this.addUser({
                        email: this.loginFormData.email.val,
                        password: this.loginFormData.passwd.val
                    });
                }
                // Redirect the user to the requested URL
                const redirectUrl =
                    '/' + (this.$route.query.redirect || 'coaches');
                this.$router.replace(redirectUrl);
            } catch (e) {
                console.log(e);
                this.error = e.message || 'FAILED';
            }
            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        },
        handleError() {
            this.error = null;
        }
    }
};
</script>

<style scoped></style>
