<template>
  <v-container>
    <v-card>
      <v-data-table-server
        v-model:items-per-page="recordStore.records.itemsPerPage"
        v-model:page="recordStore.records.page"
        :headers="headers"
        :items-length="recordStore.records.itemsLength"
        :items="recordStore.records.items"
        :loading="loading"
        :search="search"
        item-value="id"
        :items-per-page-options="itemsPerPageOptions"
        @update:options="loadItems"
        class="elevation-4 pb-4"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title> Records</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              @click="() => emit('new-operation')"
              variant="elevated"
              color="secondary-darken-1"
              >New Operation
            </v-btn>
          </v-toolbar>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-sm-body-1"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="secondary-darken-1"
                  variant="elevated"
                  @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="secondary-darken-1"
                  variant="outlined"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.operation_id="{ item }">
          {{
            operationStore.operations.find((operation) => {
              return operation.id === item.columns.operation_id;
            })?.type || 'Unknown'
          }}
        </template>
        <template v-slot:item.amount="{ item }">
          ${{ formatNumber(item.columns.amount) }}
        </template>
        <template v-slot:item.user_balance="{ item }">
          ${{ formatNumber(item.columns.user_balance) }}
        </template>
        <template v-slot:item.date="{ item }">
          {{ formatDateTime(item.columns.date) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon size="small" @click="confirmDeletion(item.value)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import { useOperationStore } from '@/stores/operation';
import { formatDateTime, formatNumber } from '@/intl/formatter';

const recordStore = useRecordStore();
const operationStore = useOperationStore();
const search = ref('');
const dialogDelete = ref(false);
const deleteId = ref(0);

const emit = defineEmits(['new-operation']);

const headers = [
  { title: 'ID', key: 'id', sortable: false },
  { title: 'Operation', key: 'operation_id', sortable: false },
  { title: 'Amount', key: 'amount', sortable: false },
  { title: 'Balance', key: 'user_balance', sortable: false },
  { title: 'Result', key: 'operation_response', sortable: false },
  { title: 'Date', key: 'date', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];

const itemsPerPageOptions = [
  { title: '5', value: 5 },
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '20', value: 20 },
];

const loading = ref(true);

const loadItems = async () => {
  if (!loading.value) loading.value = true;
  await recordStore.getRecords();
  loading.value = false;
};

const confirmDeletion = async (itemId: number) => {
  deleteId.value = itemId;
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  dialogDelete.value = false;
  await recordStore.deleteRecord(deleteId.value.toString());
  await loadItems();
};
</script>
