<template>
    <div>
        <span v-if="'editable' in item && item.editable === false">{{ item.name }}</span>
        <el-input v-else v-model="item.name"/>
    </div>
</template>

<script>
export default {
    name: "Item",
    props: ['item', 'indexItem'],
    watch: {
        item: {
            handler: function (val) {
                this.$emit('change', val);
            },
            deep: true
        }
    }
}
</script>

<style scoped>

</style>
