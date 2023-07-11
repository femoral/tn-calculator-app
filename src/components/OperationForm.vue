<template>
  <v-dialog v-model="display" width="auto" min-width="80%">
    <v-card>
      <v-card-title> New Operation </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <v-select
                :items="operationStore.operations"
                item-title="type"
                label="Operation"
                v-model="selected"
                required
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="operands[0]"
                label="Operand"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model.number="operands[1]"
                label="Operand"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" class="text-right">
              Cost: ${{ selectedOperation?.cost || 0 }}
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="display = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="submitOperation">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useOperationStore } from '@/stores/operation';

const operationStore = useOperationStore();

const display = ref(false);
const operands = ref<[number, number]>([0, 0]);
const selected = ref<string | undefined>();

const selectedOperation = computed(() =>
  operationStore.operations.find(
    (operation) => operation.type === selected.value
  )
);

const displayDialog = () => {
  display.value = true;
};

const submitOperation = () => {
  if (selectedOperation.value) {
    operationStore.submitOperation({
      operation_type: selectedOperation.value.type,
      operands: operands.value.map((operand) => operand.toString()),
    });

    display.value = false;
  }
};

defineExpose({ displayDialog });
</script>

<style scoped></style>
