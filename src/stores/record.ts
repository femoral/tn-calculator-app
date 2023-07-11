import { reactive } from 'vue';
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
  const getRecords = async () => {
    const response = await recordApi.get(userStore.user.id, {
      page_size: records.itemsPerPage.toString(),
      page: records.page.toString(),
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

  return {
    records,
    getRecords,
    deleteRecord,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRecordStore, import.meta.hot));
}
