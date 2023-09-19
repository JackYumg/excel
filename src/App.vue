<script setup lang="ts">
import { onMounted } from 'vue';
import { useMessageTool } from './messages/index';
onMounted(() => {
  useMessageTool();
});
</script>

<template>
  <a-config-provider>
    <router-view></router-view>
  </a-config-provider>
</template>