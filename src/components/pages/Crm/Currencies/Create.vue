<template>
    <v-form v-model="valid">
        <v-container fluid>
            <v-row>
                <v-col xs="4" md="4" sm="4">
                    <v-text-field
                            v-model="item.name"
                            :rules="nameRules"
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
    import {mapActions} from "vuex";

    export default {
        name: "Create",
        data: () => ({
            valid: false,
            item: {
                name: ''
            },
            nameRules: [
                v => !!v || 'Name is required',
            ],
        }),
        methods: {
            ...mapActions({
                create: 'currencies/createItem'
            }),
            submit() {
                this.create(this.item).then(() => {
                    this.$router.back()
                })
            },
        }
    }
</script>

<style scoped>

</style>