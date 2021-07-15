<template>
    <v-autocomplete :label="label" v-model="model" :multiple="multiple" :chips="multiple"  :items="items" :item-value="itemValue" :item-text="itemText"></v-autocomplete>
</template>

<script>
    export default {
        name: "CustomAutocomplete",
        props: {
            label: {
                type: String,
                required: true
            },
            itemValue: {
                type: String,
                default: "id"
            },
            itemText: {
                type: String,
                default: "name"
            },
            multiple: {
                type: Boolean,
                default: false
            },
            value: {
                required: true
            },
            items: {
                type: Array,
            },
        },
        computed: {
            model: {
                get() {
                    return Number(this.value)
                },
                set(val) {
                    this.$emit('input', val)
                }
            }
        }
    }
</script>

<style scoped>

</style>