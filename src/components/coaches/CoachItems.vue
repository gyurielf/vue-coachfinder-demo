<template>
    <div class="row">
        <div class="col-12">
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">{{ firstName }} {{ lastName }}</h5>
                    <p class="card-text">{{ desc }}</p>
                    <a href="#" class="btn btn-primary">Contact</a>
                    <router-link
                        :to="{ name: 'mentor', params: { coachId: id } }"
                        class="btn btn-light ml-3"
                    >
                        View Details
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoachItems',
    props: ['id', 'firstName', 'lastName', 'type', 'desc', 'rate']
};
</script>

<style scoped></style>
