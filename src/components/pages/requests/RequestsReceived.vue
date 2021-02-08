<template>
    <div class="row">
        <div class="col-12">
            <div class="mt-3" v-if="getRequests.length > 0">
                <request-item
                    v-for="request in getRequests"
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
    </div>
</template>

<script>
import RequestItem from '@/components/requests/RequestItem';
import { mapGetters } from 'vuex';
export default {
    name: 'RequestsReceived',

    components: { RequestItem },
    computed: {
        ...mapGetters('requestsModule', {
            getRequests: 'getRequests'
        })
    }
};
</script>

<style scoped></style>
