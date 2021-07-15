<template>
    <v-chip :color="color" v-text="text"></v-chip>
</template>

<script>
    export default {
        name: "ActiveChip",
        props: {
            small: {
                default: false
            },
            active: {
                default: false
            }
        },
        computed: {
            color() {
                return Number(this.active) ? "success" : "danger"
            },
            text() {
                return Number(this.active)  ? "Yes" : "No"
            }
        }
    }
</script>

<style scoped>

</style>