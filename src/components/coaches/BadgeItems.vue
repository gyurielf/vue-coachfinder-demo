<template>
    <h4 class="d-inline-flex mr-2">
        <span class="badge" :class="badgeClass">{{ badgeType }}</span>
    </h4>
</template>

<script>
export default {
    name: 'BadgeItems',
    props: ['badgeType'],
    computed: {
        badgeClass() {
            if (this.badgeType === 'backend') {
                return 'badge-danger';
            } else if (this.badgeType === 'frontend') {
                return 'badge-primary';
            } else if (this.badgeType === 'graphics') {
                return 'badge-warning';
            } else {
                return 'badge-secondary';
            }
        }
    }
};
</script>

<style scoped></style>
