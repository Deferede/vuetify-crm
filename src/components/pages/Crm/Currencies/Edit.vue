<template>
    <v-form v-model="valid">
        <v-container fluid>
            <v-row>
                <v-col xs="4" md="4" sm="4">
                    <v-text-field
                            v-model="item.name"
                            :rules="nameRules"
                            :counter="5"
                            label="Currency name"
                            required
                    ></v-text-field>
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
        name: "Edit",
        props: ['id'],
        data: () => ({
            valid: false,
            item: {name: ''},
            nameRules: [
                v => !!v || 'Name is required',
            ],
        }),
        computed: {
            ...mapGetters({
                currencies: "currencies/items"
            }),
            selected() {
                return this.currencies.find(i => i.id === Number(this.id))
            }
        },
        methods: {
            ...mapActions({
                update: 'currencies/updateItem',
                loadCurrencies: 'currencies/loadItems'
            }),
            submit() {
                this.update({id: this.id, payload: this.item}).then(() => {
                    this.$router.back()
                })
            },
        },
        async mounted() {
            await this.loadCurrencies()
            this.item = {...this.selected}

        }
    }
</script>

<style scoped>

</style>