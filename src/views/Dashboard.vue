<template>
    <BitTable :data="state.data"></BitTable>
</template>
<script setup lang="ts">
import { globalSubject } from '../messages';
import { onMounted, reactive } from 'vue';
import BitTable from './../components/BitTable/Index.vue';
const state = reactive({
    data: [],
    view: ''
});

onMounted(() => {
    globalSubject.subscribe((e) => {
        state.data = e.messageData.data;
    });
});
</script>