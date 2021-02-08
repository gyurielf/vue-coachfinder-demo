<template>
    <div class="card">
        <div class="card-body">
            <h3 class="card-title"></h3>
            <ul class="list-unstyled">
                <li class="list-inline-item mr-3">
                    <input
                        type="checkbox"
                        id="frontend"
                        checked
                        v-model="filters.frontend"
                        @change="setFilter2"
                    />
                    <label for="frontend" class="ml-1">
                        Frontend
                    </label>
                </li>
                <li class="list-inline-item mr-3">
                    <input
                        type="checkbox"
                        id="backend"
                        checked
                        v-model="filters.backend"
                        @change="setFilter2"
                    />
                    <label for="backend" class="ml-1">
                        Backend
                    </label>
                </li>
                <li class="list-inline-item mr-3">
                    <input
                        type="checkbox"
                        id="graphics"
                        checked
                        v-model="filters.graphics"
                        @change="setFilter2"
                    />
                    <label for="graphics" class="ml-1">
                        Graphics
                    </label>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoachFilter',
    emits: ['change-filter'],
    data() {
        return {
            filters: {
                frontend: true,
                backend: true,
                graphics: true
            }
        };
    },
    methods: {
        // This is the instructor solution.
        // setFilter(event) {
        //     const inputId = event.target.id;
        //     const isActive = event.target.checked;
        //     const updatedFilters = {
        //         ...this.filters,
        //         [inputId]: isActive
        //     };
        //     // console.log(updatedFilters);
        //     this.filters = updatedFilters;
        //     this.$emit('change-filter', updatedFilters);
        // },
        // This is my solution. [IT WORKS] (using v-model to change the state of filters to tru or false)
        // eslint-disable-next-line no-unused-vars
        setFilter2(event) {
            const updatedFilters = this.filters;
            this.$emit('change-filter', updatedFilters);
        }
    }
};
</script>

<style scoped></style>
