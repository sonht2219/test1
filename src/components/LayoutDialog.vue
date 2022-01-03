<template>
    <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        v-model="isActive"
    >
        <v-card>
            <v-toolbar
                color="primary"
                dark
            >
                {{ options.title }}
            </v-toolbar>

            <component :is="detailView" :options="options"/>

            <v-card-actions class="justify-end" v-if="options.hasActions">
                <v-btn
                    v-if="options.hasOk"
                    text
                    @click="onOk"
                    :loading="loading"
                >OK
                </v-btn>
                <v-btn
                    v-if="options.hasClose"
                    text
                    @click="onCancel"
                >Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Confirm from "@/components/Confirm";
export default {
    name: "LayoutDialog",
    props: {
        options: {
            type: Object,
            default: () => {}
        },
        registeredViews: {
            type: Object,
            default: () => {}
        }
    },
    data: () => ({
        isActive: true,
        loading: false
    }),
    methods: {
        openModal() {
            this.isActive = true;
        },
        onOk() {
            this.switchLoadingState(true);
            this.options.promiseResolver({
                loading: this.switchLoadingState,
                close: this.close
            });
        },
        onCancel() {
            this.options.promiseRejecter('cancel');
            this.close();
        },
        switchLoadingState(loading = null) {
            if (loading === null) {
                loading = !this.loading;
            }
            this.loading = loading;
        },
        close() {
            this.isActive = false;
        }
    },
    computed: {
        detailView() {
            const customView = this.options.view ? this.registeredViews[this.options.view] : null;
            return customView || Confirm;
        }
    },
    watch: {
        isActive(val) {
            if (!val) {
                this.$emit('close', this.options.id);
            }
        }
    }
}
</script>

<style scoped>

</style>
