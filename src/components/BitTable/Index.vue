<template>
    <div class="bit-table" :style="{ width: `${state.width}px` }" ref="currentTableRef">
        <div class="thead" :style="{ width: `${state.contentWidth}px` }">
            <div class="th" :style="{ height: `${defaultColumnHeight}px` }">
                <td class="td sider x"></td>
                <div class="td sider" v-for="col in columns"
                    :style="{ width: `${defaultColumnWidth}px`, height: `${defaultColumnHeight}px` }">{{ col }}</div>
            </div>
        </div>
        <div class="tbody" :style="{ width: `${state.contentWidth}px` }">
            <div class="tr" v-for="(row, index) in state.columns">
                <div class="sider-index">
                    {{ index + 1 }}
                </div>
                <div class="td" v-for="col in row"
                    :style="{ width: `${defaultColumnWidth}px`, height: `${defaultColumnHeight}px` }">
                    {{ col.value }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { BitTableColumn } from './BitTable';
import { getColumnName } from './bit-table';
import { fromEvent } from 'rxjs';

const defaultColumnWidth = ref(100);
const defaultColumnHeight = ref(30);
const currentTableRef = ref<HTMLElement>();
const props = defineProps({
    data: {
        type: Array,
        default: []
    },
});

const state = reactive({
    columns: [] as BitTableColumn[][],
    width: document.body.clientWidth,
    contentWidth: 0
});

onMounted(() => {
    initTableColumns();
    initEvent();
});

watch(() => props.data, () => {
    props.data.forEach((item, i: number) => {
        (item as any[]).forEach((e: any, j: number) => {
            state.columns[i][j].value = e;
        });
    });
});

const columns = ref<string[]>([]);

const initTableColumns = () => {
    const tableColumns: BitTableColumn[][] = [];
    const height = Number((document.body.clientHeight / defaultColumnHeight.value).toFixed(0) + 2);
    const width = Number((document.body.clientWidth / defaultColumnWidth.value).toFixed(0));
    columns.value = getColumnName(width + 2);
    for (let i = 0; i < height; i++) {
        if (!tableColumns[i]) {
            tableColumns[i] = [];
        }
        for (let j = 0; j < width; j++) {
            tableColumns[i][j] = {
                value: ''
            };
        }
    }

    state.columns = tableColumns;
    state.contentWidth = Math.max(defaultColumnWidth.value * columns.value.length + columns.value.length + 33, document.body.clientWidth);

    props.data.forEach((item, i: number) => {
        (item as any[]).forEach((e: any, j: number) => {
            state.columns[i][j].value = e;
        });
    });
}

const initEvent = () => {
    fromEvent(currentTableRef.value as HTMLElement, 'scroll').subscribe((e) => {
        console.log(e);
    });
}

//#region ui事件
const scroll = (e) => {
    console.log(e);
}
//#endregion

</script>
<style lang="less" scoped>
@c1: gainsboro;
@c2: rgb(192, 192, 192);
@c3: rgb(232, 232, 232);

.bit-table {
    height: 100%;
    width: 100%;
    border-top: 1px solid c1;
    overflow: auto;

    .thead {

        border-bottom: 1px solid @c2;
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 1;

        .th {
            width: 100%;

            .td {
                display: inline-block;
                border-right: 1px solid @c2;
                background-color: @c3;
                text-align: center;
                margin: 0 auto;
            }
        }
    }

    .tbody {
        .tr {
            display: flex;

            .td {
                display: inline-block;
                text-align: center;
                border-right: 1px solid @c1;
                border-bottom: 1px solid @c1;
            }
        }
    }

    .sider {
        background-color: @c2;
        border-right: 1px solid @c3;
    }

    .x {
        height: 28px;
        float: left;
        width: 30px;
        z-index: 999;
        position: sticky;
        left: 0;
    }

    .sider-index {
        background-color: @c3;
        width: 32px;
        border-right: 1px solid @c2;
        border-bottom: 1px solid @c2;
        text-align: center;
        position: sticky;
        left: 0;
    }
}
</style>