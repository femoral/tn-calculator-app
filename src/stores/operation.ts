import { acceptHMRUpdate, defineStore } from 'pinia';
import { Operation, OperationExecution } from '@/api/model/operation';
import { ref, watchEffect } from 'vue';
import operationApi from '@/api/operation.api';
import { useUserStore } from '@/stores/user';
import recordApi from '@/api/record.api';
import { useRecordStore } from '@/stores/record';

export const useOperationStore = defineStore('operation', () => {
  const operations = ref<Operation[]>([]);
  const userStore = useUserStore();
  const recordStore = useRecordStore();

  watchEffect(async () => {
    if (userStore.isLoggedIn) {
      operations.value = await operationApi.get();
    }
  });

  const submitOperation = async (operation: OperationExecution) => {
    const record = await recordApi.post(userStore.user.id, operation);
    userStore.user.balance = record.user_balance;
    await recordStore.getRecords();
  };

  return {
    operations,
    submitOperation,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOperationStore, import.meta.hot));
}
