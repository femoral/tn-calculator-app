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
        item-value="id"
        :items-per-page-options="itemsPerPageOptions"
        @update:options="loadItems"
        class="elevation-4 pb-4"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title class="color-comment"> Records</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              @click="() => emit('new-operation')"
              variant="tonal"
              color="primary"
              >New Operation
            </v-btn>
          </v-toolbar>
          <v-divider />
          <v-dialog v-model="dialogDelete" width="400px">
            <v-card class="pa-2">
              <v-card-title class="text-sm-body-1 text-wrap"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions class="justify-end">
                <v-btn
                  color="secondary"
                  variant="elevated"
                  elevation="0"
                  @click="dialogDelete = false"
                  >Cancel</v-btn
                >
                <v-btn
                  color="secondary"
                  variant="outlined"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
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
          <div class="text-center">
            <v-icon
              size="small"
              color="secondary"
              @click="confirmDeletion(item.value)"
            >
              mdi-delete
            </v-icon>
          </div>
        </template>
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field
                class="ml-2"
                v-model.number="recordStore.recordFilter.id"
                hide-details
                variant="outlined"
                label="ID"
                density="compact"
              ></v-text-field>
            </td>
            <td>
              <v-select
                :items="operationStore.operations"
                item-title="type"
                item-value="id"
                label="Operation"
                hide-details
                class="ml-2"
                v-model="recordStore.recordFilter.operation_id"
                density="compact"
                variant="outlined"
                required
              ></v-select>
            </td>
            <td>
              <v-text-field
                class="ml-2"
                v-model="recordStore.recordFilter.amount"
                hide-details
                variant="outlined"
                label="Amount"
                density="compact"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                class="ml-2"
                v-model="recordStore.recordFilter.user_balance"
                hide-details
                variant="outlined"
                label="Balance"
                density="compact"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                class="ml-2"
                v-model="recordStore.recordFilter.operation_response"
                hide-details
                variant="outlined"
                label="Result"
                density="compact"
              ></v-text-field>
            </td>
            <td>
              <v-menu
                location="top"
                :close-on-content-click="false"
                :open-on-click="false"
                v-model="datePickerOpen"
              >
                <template v-slot:activator="{ props }">
                  <v-text-field
                    v-bind="props"
                    readonly
                    class="ml-2"
                    hide-details
                    variant="outlined"
                    label="Date"
                    density="compact"
                    @focus="datePickerOpen = true"
                    :model-value="
                      recordStore.recordFilter.date
                        ? formatDate(recordStore.recordFilter.date)
                        : undefined
                    "
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  :multiple="false"
                  v-model="recordStore.recordFilter.date"
                  @click:cancel="datePickerOpen = false"
                  @click:save="datePickerOpen = false"
                ></v-date-picker>
              </v-menu>
            </td>
            <td>
              <div class="d-flex justify-center">
                <v-btn
                  variant="tonal"
                  prepend-icon="mdi-filter"
                  class="ml-2"
                  color="secondary"
                  @click="recordStore.clearFilters"
                >
                  Clear
                </v-btn>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRecordStore } from '@/stores/record';
import { useOperationStore } from '@/stores/operation';
import { formatDate, formatDateTime, formatNumber } from '@/intl/formatter';

const recordStore = useRecordStore();
const operationStore = useOperationStore();
const dialogDelete = ref(false);
const deleteId = ref(0);
const datePickerOpen = ref(false);
const loading = ref(true);

const emit = defineEmits(['new-operation']);

const headers: any = [
  { title: 'ID', key: 'id', sortable: false },
  { title: 'Operation', key: 'operation_id', sortable: false },
  { title: 'Amount', key: 'amount', sortable: false, align: 'end' },
  { title: 'Balance', key: 'user_balance', sortable: false, align: 'end' },
  {
    title: 'Result',
    key: 'operation_response',
    sortable: false,
    align: 'end',
    width: '100px',
  },
  { title: 'Date', key: 'date', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];

const itemsPerPageOptions = [
  { title: '5', value: 5 },
  { title: '10', value: 10 },
  { title: '15', value: 15 },
  { title: '20', value: 20 },
];

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

<style scoped>
.v-data-table-footer {
  padding-top: 100px !important;
}

.v-toolbar {
  background: none;
}
</style>
