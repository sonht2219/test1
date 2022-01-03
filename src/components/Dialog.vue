<template>
    <div class="taone">
        <layout-dialog v-for="dialog in dialogArr"
                       :options="dialog"
                       :key="dialog.id"
                       :registeredViews="registeredViews"
                        @close="destroyDialog"
        ></layout-dialog>
    </div>
</template>

<script>
import LayoutDialog from "@/components/LayoutDialog";

export default {
    name: "Dialog",
    components: {LayoutDialog},
    data() {
        return {
            registeredViews: {},
            dialogArr: []
        }
    },
    methods: {
        commit(dialog) {
            this.dialogArr.push(dialog);
        },
        destroyDialog(id) {
            const idx = this.dialogArr.findIndex(dialog => dialog.id === id);
            this.$delete(this.dialogArr, idx);
            console.log(this.dialogArr);
        }
    }
}
</script>

<style scoped>

</style>
