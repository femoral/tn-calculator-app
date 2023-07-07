<template>
  <v-container>
    <v-card>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="records.data"
        :loading="loading"
        item-value="id"
        @update:options="loadItems"
        class="elevation-4 pb-4"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title> Records</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn variant="elevated" color="secondary-darken-1"
              >New Operation
            </v-btn>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import recordApi from '@/api/record.api';
import { ApiResponse } from '@/api/api.model';
import { Record } from '@/api/model/record';

const records = ref<ApiResponse<Record[]>>({
  data: [],
  metadata: {
    page_size: 5,
    total_count: 0,
    total_pages: 1,
  },
});

const itemsPerPage = 5;

const headers: any[] = [
  { title: 'ID', align: 'start', key: 'id', sortable: false },
  { title: 'Operation Id', align: 'end', key: 'operation_id', sortable: false },
  { title: 'Amount', align: 'end', key: 'amount', sortable: false },
  { title: 'Balance', align: 'end', key: 'user_balance', sortable: false },
  {
    title: 'Result',
    align: 'end',
    key: 'operation_response',
    sortable: false,
  },
  { title: 'Date', align: 'end', key: 'date', sortable: false },
];

const loading = ref(true);

const loadItems = async () => {
  if (!loading.value) loading.value = true;
  records.value = await recordApi.get();
  loading.value = false;
};
</script>
