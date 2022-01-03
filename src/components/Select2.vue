<template>
    <select class="select2-template"></select>
</template>

<script>
import $ from "jquery";
require('select2');
import {debounce} from 'lodash';
export default {
    name: "Select2",
    props: ["options", "value"],
    methods: {
        test: debounce((s, data) => {
            if (!s) return data;
            console.log(s);
            return [];
        }, 500),
    },
    mounted: function () {
        var vm = this;
        $('.select2-template')
            .select2({
                data: this.options,
            })
            .val(this.value)
            .trigger("change")
            .on("change", function () {
                vm.$emit("input", this.value);
            });
    },
    watch: {
        value: function (value) {
            // update value
            $('.select2-template')
                .val(value)
                .trigger("change");
        },
        options: function (options) {
            // update options
            $('.select2-template')
                .empty()
                .select2({data: options});
        }
    },
    destroyed: function () {
        $('.select2-template')
            .off()
            .select2("destroy");
    }
}
</script>


<style src="@/assets/css/select2.css"></style>

<style>
select {
    min-width: 300px;
}
</style>
