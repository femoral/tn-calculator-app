<template>
  <Records @new-operation="newOperation" />
  <OperationForm ref="operationForRef" />
</template>

<script lang="ts" setup>
import Records from '@/components/Records.vue';
import OperationForm from '@/components/OperationForm.vue';
import { ref } from 'vue';

const operationForRef = ref<InstanceType<typeof OperationForm> | null>();

const newOperation = () => {
  operationForRef.value?.displayDialog();
};
</script>
