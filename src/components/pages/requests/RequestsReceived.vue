<template>
    <div class="row">
        <div class="col-12">
            <div class="mt-3" v-if="requestsList.length > 0">
                <request-item
                    v-for="request in requestsList"
                    :key="request"
                    :requestId="request.id"
                    :requestMsg="request.message"
                    :requestEmail="request.email"
                    :coach="request.coachId"
                    :requestSubject="request.subject"
                ></request-item>
            </div>
            <div v-else>
                <h3>There is no requests</h3>
            </div>
        </div>
        <!-- Modal -->
        <!--        <button class="btn btn-primary" @click="testMeth">btn</button>-->
        <global-modal :modal-toggled="toggle">
            {{ error }}
        </global-modal>
    </div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem';
import GlobalModal from '@/components/ui/GlobalModal';
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'RequestsReceived',
    components: { RequestItem, GlobalModal },
    data() {
        return {
            error: null,
            toggle: false
        };
    },
    computed: {
        ...mapGetters('requestsModule', {
            requestsList: 'requestsList'
        })
    },
    methods: {
        ...mapActions('requestsModule', {
            getRequests: 'loadRequests'
        }),
        testMeth() {
            this.toggle = !this.toggle;
        },
        async loadRequests(refresh = false) {
            // this.isLoading = true;
            try {
                await this.getRequests({ forceRefresh: refresh });
            } catch (e) {
                this.error = e.message || 'Something went wrong!';
            }
            // this.isLoading = false;
        }
    },
    created() {
        this.loadRequests();
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

<style scoped></style>
