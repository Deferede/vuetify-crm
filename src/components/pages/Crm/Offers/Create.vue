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
                    <v-autocomplete label="Main product" v-model="item.main_product_id" :rules="requiredRule" :items="products" item-value="id" item-text="name"></v-autocomplete>
                    <v-autocomplete v-model="item.products" label="Products" chips clearable :items="products" item-value="id" item-text="name" multiple></v-autocomplete>
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

    export default {
        name: "Create",
        data: () => ({
            valid: false,
            item: {
                name: '',
                main_product_id: null,
                products: [],
            },
            requiredRule: [
                v => !!v || 'Field required',
            ],
        }),
        computed: {
            ...mapGetters({
                products: 'products/items'
            })
        },
        methods: {
            ...mapActions({
                loadProducts: 'products/loadItems',
                create: 'offers/createItem'
            }),
            submit() {
                this.create(this.item).then(() => {
                    this.$router.back()
                })
            },
        },
        mounted() {
            this.loadProducts()
        }
    }
</script>

<style scoped>

</style>