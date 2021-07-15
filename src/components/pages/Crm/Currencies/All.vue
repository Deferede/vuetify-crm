<template>
    <v-data-table
        :headers="headers"
        :items="currencies"
    >
        <template #top>
            <v-dialog v-model="dialogs.delete" max-width="500px">
                <v-card>
                    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogs.delete = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn icon  :to="{name: `Edit currency`, params: {id: item.id}}">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn icon @click="deleteItem(item.id)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>

        </template>
    </v-data-table>

</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "All",
        data: () => ({
            headers: [
                {
                    text: 'Id',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                },
                { text: 'Code', value: 'name' },
                { text: 'Actions', value: 'actions', sortable: false, align: 'end' },
            ],
            dialogs: {
                delete: false,
                deletableId: null
            }
        }),

        methods: {
            ...mapActions({
                loadItems: "currencies/loadItems",
                destroyItem: "currencies/deleteItem"
            }),
            deleteItem(id) {
                this.dialogs.deletableId = id
                this.dialogs.delete = true
            },
            deleteConfirm() {
                this.destroyItem({id: this.dialogs.deletableId}).then(() => {
                    this.dialogs.delete = false
                })
            }
        },

        computed: {
            ...mapGetters({
                currencies: "currencies/items"
            })
        },

        mounted() {
            this.loadItems()
        }
    }
</script>

<style scoped>

</style>