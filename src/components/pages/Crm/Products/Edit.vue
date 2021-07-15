<template>
    <v-form v-model="valid">
        <v-container fluid>
            <v-row>
                <v-col xs="4" md="4" sm="4">
                    <v-text-field
                            v-model="item.name"
                            :rules="requiredRule"
                            label="Name"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="item.price"
                            type="number"
                            :rules="requiredRule"
                            label="Price"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="item.purchase_price"
                            type="number"
                            :rules="requiredRule"
                            label="Purchase price"
                            required
                    ></v-text-field>
                    <custom-autocomplete label="Country" v-model="item.country_id" :items="countries"></custom-autocomplete>
                    <v-checkbox label="Active" v-model="item.active"></v-checkbox>
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
        name: "Edit",
        components: {CustomAutocomplete},
        props: ['id'],
        data: () => ({
            valid: false,
            item: {
                name: '',
                price: '',
                purchase_price: '',
                country_id: null,
                active: true
            },
            requiredRule: [
                v => !!v || 'Field required',
            ],
        }),
        computed: {
            ...mapGetters({
                items: 'products/items',
                countries: 'countries/items'
            }),
            selected() {
                return this.items.find(i => i.id === Number(this.id))
            }
        },
        methods: {
            ...mapActions({
                update: 'products/updateItem',
                loadItems: 'products/loadItems',
                loadCountries: 'countries/loadItems'
            }),
            submit() {
                this.update({id: this.id, payload: this.item}).then(() => {
                    this.$router.back()
                })
            },
        },
        async mounted() {
            await this.loadCountries()
            await this.loadItems()
            this.item = {...this.selected}

        }
    }
</script>

<style scoped>

</style>