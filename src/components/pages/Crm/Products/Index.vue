<template>
    <v-container fluid>
        <v-row>
            <v-col xs="12" md="12" sm="12">
                <v-card>
                    <v-toolbar dense>
                        <v-toolbar-title>{{ this.$route.name }}</v-toolbar-title>

                        <v-spacer></v-spacer>


                        <v-btn-toggle group>
                            <v-btn icon :to="{name: `All Products`}">
                                <v-icon>mdi-format-list-bulleted</v-icon>
                            </v-btn>
                            <v-btn icon :to="{name: `Create product`}">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-btn-toggle>



                    </v-toolbar>
                    <v-card-text>
                        <router-view></router-view>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Products",
    }
</script>

<style scoped>

</style>