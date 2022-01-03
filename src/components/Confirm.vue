<template>
    <v-card-text>
        {{ options.message }}
    </v-card-text>
</template>

<script>
export default {
    name: "Confirm",
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
