import { reactive, watch } from 'vue';
import { Record } from '@/api/model/record';
import recordApi from '@/api/record.api';
import { useUserStore } from '@/stores/user';
import { acceptHMRUpdate, defineStore } from 'pinia';

type RecordState = {
  items: Record[];
  itemsPerPage: number;
  itemsLength: number;
  page: number;
};

export const useRecordStore = defineStore('record', () => {
  const userStore = useUserStore();
  const records = reactive<RecordState>({
    items: [],
    itemsPerPage: 5,
    itemsLength: 0,
    page: 1,
  });

  const recordFilter = reactive<any>({});

  watch(
    recordFilter,
    async () => {
      await getRecords();
    },
    { deep: true }
  );

  const getRecords = async () => {
    const response = await recordApi.get(userStore.user.id, {
      id: recordFilter.id?.toString(),
      page_size: records.itemsPerPage.toString(),
      page: records.page.toString(),
      operation_id: recordFilter.operation_id?.toString(),
      amount: recordFilter.amount?.toString(),
      user_balance: recordFilter.user_balance?.toString(),
      operation_response: recordFilter.operation_response,
      date: recordFilter.date
        ? new Date(recordFilter.date).toISOString().substring(0, 10)
        : undefined,
    });
    records.items = response.data;
    records.itemsLength = response.metadata.total_count;
  };

  const deleteRecord = async (recordId: string) => {
    await recordApi.del(userStore.user.id, recordId);
    if (records.items.length === 1 && records.page > 1) {
      records.page--;
    }
    await getRecords();
  };

  const clearFilters = () => {
    recordFilter.id = undefined;
    recordFilter.operation_id = undefined;
    recordFilter.amount = undefined;
    recordFilter.user_balance = undefined;
    recordFilter.operation_response = undefined;
    recordFilter.date = undefined;
  };

  return {
    records,
    getRecords,
    deleteRecord,
    recordFilter,
    clearFilters,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecordStore, import.meta.hot));
}
