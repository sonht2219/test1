<template>
    <v-card-text>
        <span style="color: red">{{options.message}}</span>
    </v-card-text>
</template>

<script>
export default {
    name: "Alert",
    props: {
        options: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
