<template>
    <div>
        <div
            ref="modal"
            class="modal fade"
            :class="{
                show: globalModalStatus.show,
                'd-block': globalModalStatus.active
            }"
            tabindex="-1"
            role="dialog"
        >
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal!</h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            @click="toggleModal"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            <slot></slot>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="globalModalStatus.active"
            class="modal-backdrop fade show"
        ></div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'GlobalModal',
    props: ['modalToggled'],
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['globalModalStatus'])
    },
    methods: {
        ...mapActions(['toggleGlobalModalActive', 'toggleGlobalModalShow']),
        toggleModal() {
            const body = document.querySelector('body');
            // this.active = !this.active;
            this.toggleGlobalModalActive();
            this.globalModalStatus.active
                ? body.classList.add('modal-open')
                : body.classList.remove('modal-open');
            setTimeout(() => this.toggleGlobalModalShow(), 10);
        }
    },
    created() {},
    watch: {
        modalToggled() {
            this.toggleModal();
        }
    }
};
</script>

<style scoped></style>
