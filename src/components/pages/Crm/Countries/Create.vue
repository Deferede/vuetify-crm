<template>
    <v-form v-model="valid">
        <v-container fluid>
            <v-row>
                <v-col xs="4" md="4" sm="4">
                    <v-text-field
                            v-model="item.name"
                            :rules="requiredRule"
                            label="Country name"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="item.code"
                            :rules="requiredRule"
                            label="Country code"
                            required
                    ></v-text-field>
                    <custom-autocomplete label="Currency" v-model="item.currency_id" :items="currencies"></custom-autocomplete>
                    <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="submit"
                    >
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import CustomAutocomplete from "../../../partials/inputs/CustomAutocomplete";

    export default {
        name: "Create",
        components: {CustomAutocomplete},
        data: () => ({
            valid: false,
            item: {
                name: '',
                code: '',
                currency_id: null,
            },
            requiredRule: [
                v => !!v || 'Field required',
            ],
        }),
        computed: {
            ...mapGetters({
                currencies: 'currencies/items'
            })
        },
        methods: {
            ...mapActions({
                loadCurrencies: 'currencies/loadItems',
                create: 'countries/createItem'
            }),
            submit() {
                this.create(this.item).then(() => {
                    this.$router.back()
                })
            },
        },
        mounted() {
            this.loadCurrencies()
        }
    }
</script>

<style scoped>

</style>