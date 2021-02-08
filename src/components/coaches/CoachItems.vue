<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-3 shadow-sm">
                <div class="card-body">
                    <h4 class="card-title">{{ fullName }}</h4>
                    <badge-items
                        v-for="area in type"
                        :key="area"
                        :badgeType="area"
                    >
                    </badge-items>
                    <div class="mt-3 mb-1">
                        <router-link
                            class="btn btn-primary"
                            :to="`/coaches/${id}/contact`"
                        >
                            Contact
                        </router-link>
                        <router-link
                            :to="{
                                name: 'coach-details',
                                params: { coachId: id }
                            }"
                            class="btn btn-light ml-3"
                        >
                            View Details
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BadgeItems from '@/components/coaches/BadgeItems';
export default {
    name: 'CoachItems',
    props: ['id', 'firstName', 'lastName', 'type', 'desc', 'rate'],
    components: { BadgeItems },
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        }
    }
};
</script>

<style scoped></style>
