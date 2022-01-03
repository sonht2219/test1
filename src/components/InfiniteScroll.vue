<template>
    <div style="margin-bottom: 200px">
        <div >
            <div :key="i" v-for="(test, i) of dataLoad" style="padding-top: 10px; padding-bottom: 10px;">
                <div style="display: flex">
                    <item :item="test" @change="handleChange($event, i)"/>
                    <template>
                        <el-button v-if="test.hasOwnProperty('editable') && test.editable === false" style="margin-left: 10px" @click="editItem(test)">Sửa</el-button>
                        <el-button v-if="test.hasOwnProperty('editable') && test.editable === true" style="margin-left: 10px" @click="cancelEdit(test)">Hủy</el-button>
                        <el-button style="margin-left: 10px" @click="deleteItem(test)">Xóa</el-button>
                    </template>
                </div>
                <div v-if="!test.id.startsWith('new-') && i === dataLoad.filter(item => !item.id.startsWith('new-')).length - 1">
                    <el-button @click="loadMore">Xem thêm</el-button>
                </div>
            </div>
        </div>

        <el-button @click="createItem">Thêm mới</el-button>
    </div>

</template>

<script>
// import Select2 from "@/components/Select2";
// import { Loading } from 'element-ui';
import Item from "@/components/Item";

const init = [];

function generateAll() {
    for (let i = 1; i <= 11; i++) {
        init.push({
            id: i.toString(),
            name: 'test' + i,
            editable: false
        })
    }
}

generateAll();

import {cloneDeep} from 'lodash'

export default {
    name: "InfiniteScroll",
    components: {Item},
    data: () => ({
        busy: false,
        options: [{id: 1, text: "Hello"}, {id: 2, text: "World"}],
        options2: [{id: 3, text: "Hello"}, {id: 4, text: "World"}],
        value: 1,
        value2: 3,
        tests: [0],
        dataUpdate: cloneDeep(init),
        dataInit: cloneDeep(init),
        dataOrigin: cloneDeep(init),
        cachedData: {},
        dataPaginate: {},
        dataLoad: [],
        page: 0,
        size: 3,
        keyNew: 0
    }),
    mounted() {
        this.paginate(this.dataInit);
        this.init();
    },
    methods: {
        syncInit(data, action = 'edit') {
            if (action === 'edit')
                this.dataInit[this.dataInit.findIndex(item => item.id === data.id)] = cloneDeep(data);
            else if (action === 'delete')
                this.dataInit.splice(this.dataInit.findIndex(item => item.id === data.id), 1);
            else
                this.dataInit.push(cloneDeep(data));
        },
        init() {
            this.dataLoad = this.paginateTo(this.page);
        },
        paginate(data) {
            const totalPage = Math.floor(data.length / this.size);

            for (let i = 0; i <= totalPage; i++) {
                const from = i * this.size;
                const to = (from + this.size) < data.length ? (from + this.size) : data.length;
                const pageData = data.slice(from, to);
                if (pageData.length)
                    this.dataPaginate[i.toString()] = cloneDeep(pageData);
            }
        },
        paginateTo(page) {
            const offset = page * this.size;
            const to = (offset + this.size) < this.dataOrigin.length ? (offset + this.size) : this.dataOrigin.length;
            return this.dataOrigin.slice(offset, to);
        },
        cancelEdit(data) {
            console.log(data);
            Object.assign(this.dataInit[this.dataInit.findIndex(item => item.id === data.id)], this.cachedData[data.id]);
            delete this.cachedData[data.id];
        },
        editItem(data) {
            this.cachedData[data.id] = cloneDeep(data);
            this.dataLoad[this.dataLoad.findIndex(item => item.id === data.id)].editable = true;
        },
        deleteItem(data) {
            this.dataLoad.splice(this.dataLoad.findIndex(item => data.id === item.id), 1);
            this.syncInit(data, 'delete');
            // this.syncData(data, i, 'delete');
        },
        handleChange(data, i) {
            console.log(data, i);
            this.syncInit(data);
        },
        syncData(data, i, action = 'update') {
            switch (action) {
                case 'create':
                    this.syncCreate(data);
                    break;
                case "update":
                    this.syncUpdate(data, i);
                    break;
                case 'delete':
                    this.syncDelete(data, i);
                    break;
            }
        },
        syncCreate(data) {
            this.dataUpdate.push(data);
        },
        syncUpdate(data, i) {
            if (data.isNew) {
                const index = this.dataUpdate.findIndex(item => item.indexInit && (item.indexInit === i));
                this.dataUpdate[index] = {...data, indexInit: i};
            } else {
                this.dataUpdate[i] = data;
            }
        },
        syncDelete(data, i) {
            console.log(data, i);
            if (data.isNew) {
                const index = this.dataUpdate.findIndex(item => item.indexInit && (item.indexInit === i));
                this.dataUpdate.splice(index, 1);
            } else {
                this.dataUpdate.splice(i, 1);
            }
        },
        createItem() {
            const item = {
                id: 'new-' + (Math.random() + 1).toString(36).substring(7),
                name: '',
            };
            this.dataLoad.push(item);
            this.syncInit(item, 'create');
            // const dataUpdate = {...item, indexInit: this.dataInit.length - 1};
            // this.syncData(dataUpdate, 0, 'create');
        },
        loadMore() {
            this.page ++;
            const newItems = this.dataLoad.filter(item => item.id.startsWith('new-'));
            this.dataLoad = [...this.dataLoad.filter(item => !item.id.startsWith('new-')), ...this.paginateTo(this.page), ...newItems];
            // this.busy = true;
            // const loading = Loading.service({
            //     lock: true,
            //     text: 'Loading',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(0, 0, 0, 0.7)'
            // });
            //
            // setTimeout(() => {
            //     const size = this.dataInit.length;
            //     const to = size + 300;
            //     for (let i = size; i <= to; i++) {
            //         this.dataInit.push({
            //             id: i.toString(),
            //             name: 'test' + i,
            //             editable: false
            //         });
            //     }
            //     this.busy = false;
            //     loading.close();
            // }, 100);
        }
    }
}
</script>

<style scoped>

</style>
